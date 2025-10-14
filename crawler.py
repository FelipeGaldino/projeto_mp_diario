"""
Crawler para Diário Oficial do MP-MT
Versão aprimorada com Selenium e melhor estruturação de dados
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException, WebDriverException
from bs4 import BeautifulSoup
import json
import time
import pandas as pd
from datetime import datetime
import re
import logging
from typing import List, Dict, Optional
from dataclasses import dataclass, asdict
from pathlib import Path


# Configuração de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('crawler.log', encoding='utf-8'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


@dataclass
class EdicaoInfo:
    """Estrutura de dados para informações básicas de uma edição"""
    titulo: str
    url: str
    data_coleta: str
    numero_edicao: Optional[str] = None
    data_publicacao: Optional[str] = None
    ano: Optional[str] = None
    tipo_documento: Optional[str] = None


@dataclass
class ConteudoEdicao:
    """Estrutura de dados completa de uma edição do diário oficial"""
    url: str
    titulo: str
    numero_edicao: str
    data_publicacao: str
    ano: str
    tipo_documento: str
    orgao: str = "Ministério Público do Estado de Mato Grosso"

    # Conteúdo estruturado
    sumario: List[str]
    portarias: List[Dict[str, str]]
    despachos: List[Dict[str, str]]
    editais: List[Dict[str, str]]
    resolucoes: List[Dict[str, str]]
    avisos: List[Dict[str, str]]
    outros_atos: List[Dict[str, str]]

    # Metadados
    numero_paginas: int
    tamanho_arquivo: Optional[str] = None
    link_download_pdf: Optional[str] = None
    texto_completo: str = ""

    # Controle
    data_extracao: str = ""
    sucesso_extracao: bool = True
    erros: List[str] = None

    def __post_init__(self):
        if self.erros is None:
            self.erros = []
        if not self.data_extracao:
            self.data_extracao = datetime.now().strftime('%Y-%m-%d %H:%M:%S')


class CrawlerDiarioMPMT:
    def __init__(self, headless=True, timeout=30):
        """
        Inicializa o crawler com Selenium

        Args:
            headless: Se True, executa sem abrir o navegador
            timeout: Tempo máximo de espera para carregamento (segundos)
        """
        logger.info("Inicializando crawler...")

        chrome_options = Options()
        if headless:
            chrome_options.add_argument('--headless=new')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--disable-blink-features=AutomationControlled')
        chrome_options.add_argument('--window-size=1920,1080')
        chrome_options.add_argument('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

        # Configurações adicionais para performance
        chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
        chrome_options.add_experimental_option('useAutomationExtension', False)
        chrome_options.page_load_strategy = 'normal'

        try:
            self.driver = webdriver.Chrome(options=chrome_options)
            self.driver.set_page_load_timeout(timeout)
            logger.info("Driver Chrome iniciado com sucesso")
        except WebDriverException as e:
            logger.error(f"Erro ao iniciar Chrome: {e}")
            raise

        self.base_url = "https://www.mpmt.mp.br"
        self.wait = WebDriverWait(self.driver, timeout)
        self.timeout = timeout
        
    def acessar_pagina_principal(self) -> bool:
        """
        Acessa a página principal do diário oficial

        Returns:
            bool: True se sucesso, False caso contrário
        """
        url = f"{self.base_url}/diario-oficial/"
        logger.info(f"Acessando: {url}")

        try:
            self.driver.get(url)

            # Aguarda o body carregar
            self.wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))

            # Aguarda JavaScript renderizar (timeout menor)
            time.sleep(3)

            logger.info("Página carregada com sucesso")
            return True

        except TimeoutException:
            logger.error("Timeout ao carregar página principal")
            return False
        except WebDriverException as e:
            logger.error(f"Erro ao acessar página: {e}")
            return False
        
    def _extrair_metadados_do_titulo(self, titulo: str) -> Dict[str, Optional[str]]:
        """
        Extrai metadados do título da edição

        Args:
            titulo: Título da edição

        Returns:
            Dict com numero_edicao, data_publicacao, ano, tipo_documento
        """
        metadados = {
            'numero_edicao': None,
            'data_publicacao': None,
            'ano': None,
            'tipo_documento': None
        }

        # Extrai número da edição
        match_numero = re.search(r'(?:N[°º]|Edição|Ed\.?)\s*(\d+)', titulo, re.I)
        if match_numero:
            metadados['numero_edicao'] = match_numero.group(1)

        # Extrai data (formatos: dd/mm/yyyy, dd-mm-yyyy, dd.mm.yyyy)
        match_data = re.search(r'(\d{2})[/\-.](\d{2})[/\-.](\d{4})', titulo)
        if match_data:
            metadados['data_publicacao'] = f"{match_data.group(1)}/{match_data.group(2)}/{match_data.group(3)}"
            metadados['ano'] = match_data.group(3)

        # Extrai ano se não encontrou na data
        if not metadados['ano']:
            match_ano = re.search(r'\b(20\d{2})\b', titulo)
            if match_ano:
                metadados['ano'] = match_ano.group(1)

        # Identifica tipo de documento
        tipos = ['Diário Oficial', 'DOE', 'Edição Especial', 'Suplemento', 'Extra']
        for tipo in tipos:
            if tipo.lower() in titulo.lower():
                metadados['tipo_documento'] = tipo
                break

        if not metadados['tipo_documento']:
            metadados['tipo_documento'] = 'Diário Oficial'

        return metadados

    def extrair_links_edicoes(self) -> List[EdicaoInfo]:
        """
        Extrai todos os links das edições disponíveis

        Returns:
            Lista de objetos EdicaoInfo
        """
        logger.info("Extraindo links das edições...")

        html = self.driver.page_source
        soup = BeautifulSoup(html, 'html.parser')

        edicoes = []
        links_encontrados = set()

        # Estratégia 1: Links com palavras-chave no href
        seletores_css = [
            'a[href*="doe"]',
            'a[href*="diario"]',
            'a[href*="edicao"]',
            'a[href*="publicacao"]',
            'a[href*="/wp-content/uploads"]',  # Links para PDFs
            'a.edicao',
            'a.publicacao',
            '.lista-diarios a',
            '.diario-item a',
            'article a',
        ]

        for seletor in seletores_css:
            elementos = soup.select(seletor)
            for elemento in elementos:
                self._processar_elemento_edicao(elemento, links_encontrados, edicoes)

        # Estratégia 2: Busca por padrões no texto
        links_com_padrao = soup.find_all('a', string=re.compile(r'(diário|edição|doe|\d{4})', re.I))
        for link in links_com_padrao:
            self._processar_elemento_edicao(link, links_encontrados, edicoes)

        logger.info(f"Encontradas {len(edicoes)} edições")

        # Se não encontrou nada, salva HTML para debug
        if len(edicoes) == 0:
            logger.warning("Nenhuma edição encontrada, tentando métodos alternativos")
            edicoes = self._extrair_links_alternativos()

            if len(edicoes) == 0:
                self._salvar_html_debug()

        return edicoes

    def _processar_elemento_edicao(self, elemento, links_encontrados: set, edicoes: List[EdicaoInfo]) -> None:
        """
        Processa um elemento HTML para extrair informações da edição

        Args:
            elemento: Elemento BeautifulSoup
            links_encontrados: Set de URLs já processadas
            edicoes: Lista para adicionar novas edições
        """
        try:
            href = elemento.get('href')
            if not href:
                return

            texto = elemento.get_text(strip=True)
            if not texto or len(texto) < 3:
                return

            # Monta URL completa
            if href.startswith('http'):
                url_completa = href
            elif href.startswith('/'):
                url_completa = f"{self.base_url}{href}"
            else:
                url_completa = f"{self.base_url}/{href}"

            # Evita duplicatas
            if url_completa in links_encontrados:
                return

            # Filtra URLs irrelevantes
            urls_excluir = ['javascript:', 'mailto:', '#', 'facebook.com', 'twitter.com', 'instagram.com']
            if any(excl in url_completa.lower() for excl in urls_excluir):
                return

            links_encontrados.add(url_completa)

            # Extrai metadados do título
            metadados = self._extrair_metadados_do_titulo(texto)

            edicao = EdicaoInfo(
                titulo=texto,
                url=url_completa,
                data_coleta=datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                numero_edicao=metadados['numero_edicao'],
                data_publicacao=metadados['data_publicacao'],
                ano=metadados['ano'],
                tipo_documento=metadados['tipo_documento']
            )

            edicoes.append(edicao)
            logger.debug(f"Edição encontrada: {texto[:50]}")

        except Exception as e:
            logger.error(f"Erro ao processar elemento: {e}")
    
    def _extrair_links_alternativos(self):
        """Método alternativo para extrair links"""
        edicoes = []
        
        try:
            # Tenta encontrar elementos por diferentes seletores
            elementos = self.driver.find_elements(By.CSS_SELECTOR, 
                "a[href*='doe'], a[href*='diario'], .edicao, .publicacao")
            
            for elem in elementos:
                try:
                    texto = elem.text.strip()
                    url = elem.get_attribute('href')
                    
                    if url and texto:
                        edicoes.append({
                            'titulo': texto,
                            'url': url,
                            'data_coleta': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                        })
                except:
                    continue
                    
            # Remove duplicatas
            edicoes = [dict(t) for t in {tuple(d.items()) for d in edicoes}]
            
        except Exception as e:
            print(f"Erro ao extrair links alternativos: {e}")
        
        return edicoes
    
    def extrair_conteudo_edicao(self, url):
        """Extrai o conteúdo completo de uma edição"""
        print(f"\nAcessando: {url}")
        
        try:
            self.driver.get(url)
            time.sleep(3)  # Aguarda carregamento
            
            html = self.driver.page_source
            soup = BeautifulSoup(html, 'html.parser')
            
            conteudo = {
                'url': url,
                'titulo': '',
                'data_publicacao': '',
                'numero_edicao': '',
                'texto_completo': '',
                'secoes': []
            }
            
            # Extrai título
            for tag in ['h1', 'h2', '.titulo', '.title']:
                titulo = soup.select_one(tag)
                if titulo:
                    conteudo['titulo'] = titulo.get_text(strip=True)
                    break
            
            # Extrai data
            data_patterns = [
                soup.find(text=re.compile(r'\d{2}/\d{2}/\d{4}')),
                soup.find(class_=re.compile(r'data|date', re.I))
            ]
            
            for pattern in data_patterns:
                if pattern:
                    texto = pattern if isinstance(pattern, str) else pattern.get_text()
                    match = re.search(r'\d{2}/\d{2}/\d{4}', texto)
                    if match:
                        conteudo['data_publicacao'] = match.group()
                        break
            
            # Extrai número da edição
            numero_match = re.search(r'(?:N[°º]|Edição)\s*(\d+)', html, re.I)
            if numero_match:
                conteudo['numero_edicao'] = numero_match.group(1)
            
            # Remove scripts e estilos
            for elemento in soup(['script', 'style', 'nav', 'header', 'footer']):
                elemento.decompose()
            
            # Extrai texto dos elementos principais
            elementos_texto = soup.find_all(['p', 'div', 'article', 'section'])
            
            textos = []
            for elem in elementos_texto:
                texto = elem.get_text(strip=True)
                if len(texto) > 30:  # Ignora textos muito curtos
                    textos.append(texto)
                    conteudo['secoes'].append({
                        'tipo': elem.name,
                        'texto': texto
                    })
            
            conteudo['texto_completo'] = '\n\n'.join(textos)
            
            return conteudo
            
        except Exception as e:
            print(f"Erro ao extrair conteúdo: {e}")
            return None
    
    def extrair_todas_edicoes(self, max_edicoes=10):
        """Extrai informações de múltiplas edições"""
        self.acessar_pagina_principal()
        edicoes = self.extrair_links_edicoes()
        
        if not edicoes:
            print("\n⚠️  Nenhuma edição encontrada!")
            print("Salvando HTML da página para debug...")
            with open('debug_pagina.html', 'w', encoding='utf-8') as f:
                f.write(self.driver.page_source)
            print("HTML salvo em 'debug_pagina.html'")
            return []
        
        conteudos = []
        
        for i, edicao in enumerate(edicoes[:max_edicoes]):
            print(f"\nProcessando {i+1}/{min(len(edicoes), max_edicoes)}: {edicao['titulo'][:50]}...")
            
            conteudo = self.extrair_conteudo_edicao(edicao['url'])
            if conteudo:
                conteudos.append(conteudo)
                print("✓ Sucesso")
            else:
                print("✗ Falha")
            
            time.sleep(2)  # Pausa entre requisições
        
        return conteudos
    
    def buscar_termo(self, conteudos, termo):
        """Busca um termo nos conteúdos extraídos"""
        resultados = []
        
        for item in conteudos:
            if termo.lower() in item['texto_completo'].lower():
                # Encontra o contexto
                texto_lower = item['texto_completo'].lower()
                pos = texto_lower.find(termo.lower())
                inicio = max(0, pos - 150)
                fim = min(len(item['texto_completo']), pos + len(termo) + 150)
                contexto = item['texto_completo'][inicio:fim]
                
                resultados.append({
                    'titulo': item['titulo'],
                    'url': item['url'],
                    'data': item['data_publicacao'],
                    'contexto': f"...{contexto}..."
                })
        
        return resultados
    
    def salvar_json(self, conteudos, arquivo='diarios_mpmt.json'):
        """Salva em JSON"""
        with open(arquivo, 'w', encoding='utf-8') as f:
            json.dump(conteudos, f, ensure_ascii=False, indent=2)
        print(f"\n✓ Dados salvos em {arquivo}")
    
    def salvar_csv(self, conteudos, arquivo='diarios_mpmt.csv'):
        """Salva em CSV"""
        dados = []
        for item in conteudos:
            dados.append({
                'Título': item['titulo'],
                'Data': item['data_publicacao'],
                'Número': item['numero_edicao'],
                'URL': item['url'],
                'Texto': item['texto_completo'][:1000] + '...'
            })
        
        df = pd.DataFrame(dados)
        df.to_csv(arquivo, index=False, encoding='utf-8-sig')
        print(f"✓ Dados salvos em {arquivo}")
    
    def fechar(self):
        """Fecha o navegador"""
        self.driver.quit()


# =========================
# EXEMPLO DE USO
# =========================

if __name__ == "__main__":
    print("="*60)
    print("CRAWLER DIÁRIO OFICIAL MP-MT")
    print("="*60)
    
    crawler = None
    
    try:
        # Inicializa o crawler
        crawler = CrawlerDiarioMPMT(headless=True)
        
        # Extrai as edições
        conteudos = crawler.extrair_todas_edicoes(max_edicoes=5)
        
        if conteudos:
            print(f"\n{'='*60}")
            print(f"✓ {len(conteudos)} edições extraídas com sucesso!")
            print(f"{'='*60}")
            
            # Salva os dados
            crawler.salvar_json(conteudos)
            crawler.salvar_csv(conteudos)
            
            # Exemplo de busca
            print("\n" + "="*60)
            print("BUSCA POR TERMO")
            print("="*60)
            
            termo_busca = "portaria"
            resultados = crawler.buscar_termo(conteudos, termo_busca)
            
            print(f"\n{len(resultados)} resultado(s) para '{termo_busca}':\n")
            
            for i, res in enumerate(resultados[:3], 1):
                print(f"{i}. {res['titulo']}")
                print(f"   Data: {res['data']}")
                print(f"   URL: {res['url']}")
                print(f"   Contexto: {res['contexto'][:200]}...")
                print()
        else:
            print("\n⚠️  Nenhum conteúdo foi extraído.")
            print("Verifique o arquivo 'debug_pagina.html' para análise.")
            
    except Exception as e:
        print(f"\n❌ Erro: {e}")
        import traceback
        traceback.print_exc()
        
    finally:
        if crawler:
            crawler.fechar()
            print("\n✓ Navegador fechado")
            