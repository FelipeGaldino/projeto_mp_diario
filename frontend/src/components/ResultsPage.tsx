import { ArrowLeft, ExternalLink, Download, MessageCircle } from 'lucide-react';

interface Document {
  id: number;
  date: string;
  organ: string;
  type: string;
  excerpt: string;
  edition: string;
}

interface ResultsPageProps {
  searchName: string;
  userEmail: string;
  onBack: () => void;
  onOpenChat: (document: Document) => void;
}

// Mock data for demonstration
const mockResults = [
  {
    id: 1,
    date: '12/10/2025',
    organ: 'Secretaria de Estado de Educação',
    type: 'Nomeação',
    excerpt: 'PORTARIA Nº 123/2025 - Nomear o servidor para exercer o cargo de Professor...',
    edition: '28.456'
  },
  {
    id: 2,
    date: '05/10/2025',
    organ: 'Secretaria de Estado de Saúde',
    type: 'Publicação',
    excerpt: 'EDITAL Nº 045/2025 - Convocação para apresentação de documentos...',
    edition: '28.449'
  },
  {
    id: 3,
    date: '28/09/2025',
    organ: 'Secretaria de Estado de Administração',
    type: 'Designação',
    excerpt: 'ATO ADMINISTRATIVO - Designar para compor comissão avaliadora do processo...',
    edition: '28.442'
  },
  {
    id: 4,
    date: '15/09/2025',
    organ: 'Tribunal de Justiça de Mato Grosso',
    type: 'Intimação',
    excerpt: 'EDITAL DE INTIMAÇÃO - Processo nº 1234567-89.2025.8.11.0001...',
    edition: '28.435'
  },
  {
    id: 5,
    date: '03/09/2025',
    organ: 'Secretaria de Estado de Educação',
    type: 'Resultado',
    excerpt: 'RESULTADO FINAL - Processo Seletivo Simplificado nº 002/2025...',
    edition: '28.423'
  },
  {
    id: 6,
    date: '20/08/2025',
    organ: 'Assembleia Legislativa de MT',
    type: 'Publicação',
    excerpt: 'LEI Nº 12.345 - Altera dispositivos da Lei Estadual...',
    edition: '28.409'
  },
  {
    id: 7,
    date: '10/08/2025',
    organ: 'Secretaria de Estado de Fazenda',
    type: 'Notificação',
    excerpt: 'NOTIFICAÇÃO FISCAL - Débito inscrito na dívida ativa estadual...',
    edition: '28.399'
  },
  {
    id: 8,
    date: '01/08/2025',
    organ: 'Secretaria de Estado de Infraestrutura',
    type: 'Licitação',
    excerpt: 'AVISO DE LICITAÇÃO - Pregão Eletrônico nº 078/2025...',
    edition: '28.390'
  },
  {
    id: 9,
    date: '22/07/2025',
    organ: 'Secretaria de Estado de Segurança Pública',
    type: 'Portaria',
    excerpt: 'PORTARIA Nº 456/2025 - Promover o servidor ao posto de...',
    edition: '28.380'
  },
  {
    id: 10,
    date: '15/07/2025',
    organ: 'Defensoria Pública de MT',
    type: 'Edital',
    excerpt: 'EDITAL DE CONVOCAÇÃO - Processo Seletivo Estagiários 2025...',
    edition: '28.373'
  }
];

export default function ResultsPage({ searchName, userEmail, onBack, onOpenChat }: ResultsPageProps) {
  return (
    <div className="bg-white relative min-h-screen">
      {/* Navbar */}
      <div className="bg-[#014CAA] h-[93px] w-full flex items-center px-[89px]">
        <button
          onClick={onBack}
          className="flex items-center gap-3 text-white hover:text-gray-200 transition-colors"
        >
          <ArrowLeft size={24} />
          <span>Diário Oficial MT</span>
        </button>
      </div>

      {/* User Info */}
      <div className="px-[137px] py-8">
        <p className="text-gray-900 mb-2">
          Resultados para: <strong>{searchName}</strong>
        </p>
        <p className="text-gray-600">
          E-mail de contato: {userEmail}
        </p>
      </div>

      {/* Results Count */}
      <div className="px-[137px] pb-8">
        <p className="text-[#014CAA]">
          {mockResults.length} Menções encontradas
        </p>
      </div>

      {/* Results List */}
      <div className="px-[137px] pb-16 space-y-6">
        {mockResults.map((result) => (
          <div
            key={result.id}
            className="bg-[#f5f5f5] rounded-lg p-8 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <span className="bg-[#014CAA] text-white px-4 py-1 rounded-full">
                    {result.type}
                  </span>
                  <span className="text-gray-600">
                    Edição nº {result.edition} - {result.date}
                  </span>
                </div>
                <h3 className="text-[#014CAA] mb-1">{result.organ}</h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onOpenChat(result)}
                  className="p-2 hover:bg-[#014CAA] hover:text-white rounded-lg transition-colors text-[#014CAA]"
                  title="Conversar com IA sobre este documento"
                >
                  <MessageCircle size={20} />
                </button>
                <button
                  className="p-2 hover:bg-[#014CAA] hover:text-white rounded-lg transition-colors text-[#014CAA]"
                  title="Abrir publicação"
                >
                  <ExternalLink size={20} />
                </button>
                <button
                  className="p-2 hover:bg-[#014CAA] hover:text-white rounded-lg transition-colors text-[#014CAA]"
                  title="Baixar PDF"
                >
                  <Download size={20} />
                </button>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              {result.excerpt}
            </p>
          </div>
        ))}
      </div>

      {/* Info Footer */}
      <div className="bg-[#e6f0ff] py-8 px-[137px] mt-12">
        <p className="text-gray-700">
          <strong>Importante:</strong> Os resultados são baseados em buscas automáticas. 
          Verifique cada publicação completa para confirmar se a menção se refere à sua pessoa.
        </p>
      </div>
    </div>
  );
}
