# -*- coding: utf-8 -*-
"""
Script para extrair dados de PDFs e salvar em formato JSON
Extrai texto de cada pagina individualmente e organiza os dados
"""

import PyPDF2
import json
import os
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Optional
import logging

# Configura��o de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('extract_data.log', encoding='utf-8'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


class PDFExtractor:
    """Classe para extrair dados de PDFs e salvar em JSON"""

    def __init__(self, output_dir: str = "json_data"):
        """
        Inicializa o extrator de PDFs

        Args:
            output_dir: Diret�rio onde os arquivos JSON ser�o salvos
        """
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        logger.info(f"Diret�rio de sa�da: {self.output_dir}")

    def extrair_texto_pagina(self, page) -> str:
        """
        Extrai o texto de uma p�gina do PDF

        Args:
            page: Objeto de p�gina do PyPDF2

        Returns:
            str: Texto extra�do da p�gina
        """
        try:
            texto = page.extract_text()
            return texto.strip() if texto else ""
        except Exception as e:
            logger.error(f"Erro ao extrair texto da p�gina: {e}")
            return ""

    def extrair_metadados_pdf(self, pdf_reader) -> Dict:
        """
        Extrai metadados do PDF

        Args:
            pdf_reader: Objeto PdfReader

        Returns:
            Dict: Dicion�rio com metadados
        """
        metadados = {}

        try:
            if pdf_reader.metadata:
                metadados = {
                    'titulo': pdf_reader.metadata.get('/Title', ''),
                    'autor': pdf_reader.metadata.get('/Author', ''),
                    'assunto': pdf_reader.metadata.get('/Subject', ''),
                    'criador': pdf_reader.metadata.get('/Creator', ''),
                    'produtor': pdf_reader.metadata.get('/Producer', ''),
                    'data_criacao': str(pdf_reader.metadata.get('/CreationDate', '')),
                    'data_modificacao': str(pdf_reader.metadata.get('/ModDate', ''))
                }
        except Exception as e:
            logger.warning(f"Erro ao extrair metadados: {e}")

        return metadados

    def processar_pdf(self, caminho_pdf: Path) -> Optional[Dict]:
        """
        Processa um arquivo PDF e extrai todo o conte�do por p�gina

        Args:
            caminho_pdf: Caminho para o arquivo PDF

        Returns:
            Dict: Dicion�rio com dados extra�dos ou None em caso de erro
        """
        logger.info(f"Processando: {caminho_pdf.name}")

        try:
            with open(caminho_pdf, 'rb') as arquivo:
                pdf_reader = PyPDF2.PdfReader(arquivo)

                # Informa��es b�sicas do documento
                num_paginas = len(pdf_reader.pages)
                logger.info(f"  - N�mero de p�ginas: {num_paginas}")

                # Extrai metadados
                metadados = self.extrair_metadados_pdf(pdf_reader)

                # Extrai texto de cada p�gina
                paginas = []
                for num_pagina in range(num_paginas):
                    try:
                        pagina = pdf_reader.pages[num_pagina]
                        texto = self.extrair_texto_pagina(pagina)

                        paginas.append({
                            'numero_pagina': num_pagina + 1,
                            'texto': texto,
                            'numero_caracteres': len(texto),
                            'numero_palavras': len(texto.split()) if texto else 0
                        })

                        logger.debug(f"  - P�gina {num_pagina + 1}: {len(texto)} caracteres")

                    except Exception as e:
                        logger.error(f"Erro ao processar p�gina {num_pagina + 1}: {e}")
                        paginas.append({
                            'numero_pagina': num_pagina + 1,
                            'texto': '',
                            'erro': str(e),
                            'numero_caracteres': 0,
                            'numero_palavras': 0
                        })

                # Monta estrutura de dados
                dados = {
                    'arquivo': {
                        'nome': caminho_pdf.name,
                        'caminho_original': str(caminho_pdf),
                        'pasta_origem': caminho_pdf.parent.name,
                        'tamanho_bytes': caminho_pdf.stat().st_size
                    },
                    'metadados': metadados,
                    'informacoes': {
                        'numero_total_paginas': num_paginas,
                        'data_extracao': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                        'total_caracteres': sum(p['numero_caracteres'] for p in paginas),
                        'total_palavras': sum(p['numero_palavras'] for p in paginas)
                    },
                    'paginas': paginas
                }

                logger.info(f"   Extra��o conclu�da: {num_paginas} p�ginas")
                return dados

        except FileNotFoundError:
            logger.error(f"Arquivo n�o encontrado: {caminho_pdf}")
            return None
        except Exception as e:
            logger.error(f"Erro ao processar PDF {caminho_pdf.name}: {e}")
            return None

    def salvar_json(self, dados: Dict, nome_arquivo: str) -> bool:
        """
        Salva os dados extra�dos em arquivo JSON

        Args:
            dados: Dicion�rio com dados a serem salvos
            nome_arquivo: Nome do arquivo (sem extens�o)

        Returns:
            bool: True se salvou com sucesso, False caso contr�rio
        """
        try:
            # Cria o nome do arquivo JSON baseado no nome do PDF
            arquivo_json = self.output_dir / f"{nome_arquivo}.json"

            with open(arquivo_json, 'w', encoding='utf-8') as f:
                json.dump(dados, f, ensure_ascii=False, indent=2)

            logger.info(f"   JSON salvo: {arquivo_json}")
            return True

        except Exception as e:
            logger.error(f"Erro ao salvar JSON: {e}")
            return False

    def processar_pasta(self, pasta: str) -> List[Dict]:
        """
        Processa todos os PDFs de uma pasta

        Args:
            pasta: Nome da pasta a processar

        Returns:
            List[Dict]: Lista com dados de todos os PDFs processados
        """
        pasta_path = Path(pasta)

        if not pasta_path.exists():
            logger.warning(f"Pasta n�o encontrada: {pasta}")
            return []

        logger.info(f"\n{'='*60}")
        logger.info(f"Processando pasta: {pasta}")
        logger.info(f"{'='*60}")

        # Encontra todos os PDFs na pasta
        pdfs = list(pasta_path.glob("*.pdf"))

        if not pdfs:
            logger.warning(f"Nenhum PDF encontrado em {pasta}")
            return []

        logger.info(f"Encontrados {len(pdfs)} arquivos PDF")

        # Cria subpasta para esta pasta de origem
        subpasta_output = self.output_dir / pasta_path.name
        subpasta_output.mkdir(exist_ok=True)

        resultados = []

        for i, pdf_path in enumerate(pdfs, 1):
            logger.info(f"\n[{i}/{len(pdfs)}] {pdf_path.name}")

            # Processa o PDF
            dados = self.processar_pdf(pdf_path)

            if dados:
                # Salva JSON (sem extens�o .pdf no nome)
                nome_arquivo = pdf_path.stem
                arquivo_json = subpasta_output / f"{nome_arquivo}.json"

                with open(arquivo_json, 'w', encoding='utf-8') as f:
                    json.dump(dados, f, ensure_ascii=False, indent=2)

                logger.info(f"   Salvo em: {arquivo_json}")
                resultados.append(dados)
            else:
                logger.error(f"   Falha ao processar {pdf_path.name}")

        logger.info(f"\n{'='*60}")
        logger.info(f"Pasta {pasta}: {len(resultados)}/{len(pdfs)} PDFs processados com sucesso")
        logger.info(f"{'='*60}")

        return resultados

    def processar_todas_pastas(self, pastas: List[str]) -> Dict[str, List[Dict]]:
        """
        Processa PDFs de m�ltiplas pastas

        Args:
            pastas: Lista com nomes das pastas a processar

        Returns:
            Dict: Dicion�rio com resultados por pasta
        """
        logger.info(f"\n{'#'*60}")
        logger.info(f"# INICIANDO EXTRA��O DE DADOS DE PDFs")
        logger.info(f"# Pastas: {', '.join(pastas)}")
        logger.info(f"# Diret�rio de sa�da: {self.output_dir}")
        logger.info(f"{'#'*60}\n")

        resultados = {}
        total_processados = 0
        total_sucesso = 0

        for pasta in pastas:
            dados = self.processar_pasta(pasta)
            resultados[pasta] = dados
            total_processados += len(list(Path(pasta).glob("*.pdf"))) if Path(pasta).exists() else 0
            total_sucesso += len(dados)

        # Salva resumo geral
        self._salvar_resumo(resultados, total_processados, total_sucesso)

        return resultados

    def _salvar_resumo(self, resultados: Dict, total_processados: int, total_sucesso: int):
        """Salva um arquivo de resumo da extra��o"""
        resumo = {
            'data_extracao': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'total_arquivos_processados': total_processados,
            'total_arquivos_sucesso': total_sucesso,
            'total_arquivos_erro': total_processados - total_sucesso,
            'pastas': {}
        }

        for pasta, dados in resultados.items():
            total_paginas = sum(d['informacoes']['numero_total_paginas'] for d in dados)
            total_caracteres = sum(d['informacoes']['total_caracteres'] for d in dados)

            resumo['pastas'][pasta] = {
                'total_arquivos': len(dados),
                'total_paginas': total_paginas,
                'total_caracteres': total_caracteres,
                'arquivos': [d['arquivo']['nome'] for d in dados]
            }

        # Salva resumo
        arquivo_resumo = self.output_dir / "resumo_extracao.json"
        with open(arquivo_resumo, 'w', encoding='utf-8') as f:
            json.dump(resumo, f, ensure_ascii=False, indent=2)

        logger.info(f"\n{'#'*60}")
        logger.info(f"# RESUMO DA EXTRA��O")
        logger.info(f"{'#'*60}")
        logger.info(f"Total de arquivos processados: {total_processados}")
        logger.info(f"Total de arquivos com sucesso: {total_sucesso}")
        logger.info(f"Total de arquivos com erro: {total_processados - total_sucesso}")
        logger.info(f"Resumo salvo em: {arquivo_resumo}")
        logger.info(f"{'#'*60}\n")


def main():
    """Fun��o principal"""

    # Define as pastas a processar
    pastas_processar = ['dje', 'doe', 'iomat']

    # Cria o extrator
    extrator = PDFExtractor(output_dir='json_data')

    # Processa todas as pastas
    resultados = extrator.processar_todas_pastas(pastas_processar)

    # Exibe estat�sticas finais
    print("\n" + "="*60)
    print("ESTAT�STICAS FINAIS")
    print("="*60)

    for pasta, dados in resultados.items():
        if dados:
            total_paginas = sum(d['informacoes']['numero_total_paginas'] for d in dados)
            total_palavras = sum(d['informacoes']['total_palavras'] for d in dados)

            print(f"\n{pasta}:")
            print(f"  - Arquivos processados: {len(dados)}")
            print(f"  - Total de p�ginas: {total_paginas}")
            print(f"  - Total de palavras: {total_palavras:,}")
        else:
            print(f"\n{pasta}: Nenhum arquivo processado")

    print("\n" + "="*60)
    print(" EXTRA��O CONCLU�DA!")
    print(f" Arquivos JSON salvos em: json_data/")
    print("="*60)


if __name__ == "__main__":
    main()
