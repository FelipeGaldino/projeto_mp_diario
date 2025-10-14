import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface HomePageProps {
  onSearch: (name: string) => void;
}

const faqItems = [
  {
    question: 'O que é o Diário Oficial de Mato Grosso?',
    answer: 'O Diário Oficial é a publicação oficial do governo onde são divulgados atos administrativos, nomeações, licitações e outros documentos de interesse público.'
  },
  {
    question: 'Como funciona a busca?',
    answer: 'Digite seu nome completo no campo de busca e clique no botão. O sistema irá procurar todas as menções do seu nome nos diários oficiais publicados.'
  },
  {
    question: 'Quais informações eu preciso fornecer?',
    answer: 'Para confirmar sua identidade e receber os resultados, você precisará fornecer seu e-mail e telefone, além de aceitar os termos de uso e a política de privacidade.'
  },
  {
    question: 'Os resultados são em tempo real?',
    answer: 'Sim, buscamos nas edições mais recentes do Diário Oficial, incluindo publicações dos últimos dias.'
  },
  {
    question: 'Como posso acessar as publicações completas?',
    answer: 'Nos resultados, você verá um resumo de cada menção com link direto para o documento completo no Diário Oficial.'
  }
];

export default function HomePage({ onSearch }: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="bg-white relative min-h-screen">
      {/* Navbar */}
      <div className="bg-[#014CAA] h-[93px] w-full flex items-center px-[131px]">
        <p className="text-white">Diário Oficial MT</p>
      </div>

      {/* Header */}
      <div className="bg-[#e6f0ff] h-[277px] w-full flex items-center px-[131px]">
        <div>
          <h1 className="text-[#014CAA] mb-4">Busca no Diário Oficial</h1>
          <p className="text-gray-700">Consulte menções ao seu nome nas publicações oficiais de Mato Grosso</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="px-[131px] py-16">
        <form onSubmit={handleSubmit} className="relative max-w-[1097px] mx-auto">
          <div className="bg-[#f5f5f5] h-[97px] rounded-[51px] flex items-center px-8 shadow-sm">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite seu nome completo"
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-500"
            />
            <button
              type="submit"
              className="bg-[#014CAA] hover:bg-[#013580] transition-colors size-[69px] rounded-full flex items-center justify-center ml-4"
            >
              <Search className="text-white" size={28} />
            </button>
          </div>
        </form>
      </div>

      {/* FAQ Section */}
      <div className="px-[131px] py-16">
        <h2 className="text-gray-900 mb-12">Perguntas Frequentes</h2>
        
        <div className="max-w-[829px] mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => toggleFaq(index)}
                className="bg-[#f5f5f5] h-[44px] rounded-[20px] w-full flex items-center justify-between px-8 hover:bg-[#e8e8e8] transition-colors"
              >
                <span className="text-gray-900">{item.question}</span>
                <ChevronDown
                  className={`text-gray-900 transition-transform ${
                    expandedFaq === index ? 'rotate-180' : ''
                  }`}
                  size={20}
                />
              </button>
              
              {expandedFaq === index && (
                <div className="mt-2 px-8 py-4 bg-white rounded-[20px] border border-gray-200">
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#e6f0ff] h-[414px] w-full flex items-center px-[131px] mt-20">
        <div>
          <h3 className="text-[#014CAA] mb-4">Diário Oficial de Mato Grosso</h3>
          <p className="text-gray-700 mb-2">Sistema de busca de publicações oficiais</p>
          <p className="text-gray-600">© 2025 - Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
}
