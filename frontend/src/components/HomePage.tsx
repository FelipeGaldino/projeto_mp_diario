import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  FileText,
  Users,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Building2,
  Gavel,
  User,
} from "lucide-react";

import Logo from "../../src/public/logo.png";
import BgHeader from "../../src/public/bg-header.jpg";

interface HomePageProps {
  onSearch: (name: string) => void;
}

const faqItems = [
  {
    question: "O que é o Diário Oficial de Mato Grosso?",
    answer:
      "O Diário Oficial é a publicação oficial do governo onde são divulgados atos administrativos, nomeações, licitações e outros documentos de interesse público.",
  },
  {
    question: "Como funciona a busca?",
    answer:
      "Digite seu nome completo no campo de busca e clique no botão. O sistema irá procurar todas as menções do seu nome nos diários oficiais publicados.",
  },
  {
    question: "Quais informações eu preciso fornecer?",
    answer:
      "Para confirmar sua identidade e receber os resultados, você precisará fornecer seu e-mail e telefone, além de aceitar os termos de uso e a política de privacidade.",
  },
  {
    question: "Os resultados são em tempo real?",
    answer:
      "Sim, buscamos nas edições mais recentes do Diário Oficial, incluindo publicações dos últimos dias.",
  },
  {
    question: "Como posso acessar as publicações completas?",
    answer:
      "Nos resultados, você verá um resumo de cada menção com link direto para o documento completo no Diário Oficial.",
  },
];

export default function HomePage({ onSearch }: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const popularServices = [
    { name: "Nomeações", icon: User },
    { name: "Portarias", icon: FileText },
    { name: "Editais", icon: BookOpen },
    { name: "Licitações", icon: Gavel },
  ];

  const featuredServices = [
    {
      title: "Buscar no Diário Oficial",
      description: "Consulte menções ao seu nome nas publicações oficiais",
      icon: FileText,
      color: "bg-blue-600",
    },
    {
      title: "Consultar Publicações",
      description: "Acesse edições recentes do Diário Oficial",
      icon: BookOpen,
      color: "bg-green-600",
    },
    {
      title: "Assistente IA",
      description: "Tire dúvidas sobre documentos oficiais",
      icon: Users,
      color: "bg-purple-600",
    },
  ];

  const stats = [
    { number: "770+", label: "Publicações Diárias", icon: FileText },

    { number: "24/7", label: "Disponibilidade", icon: Clock },
    { number: "100%", label: "Gratuito", icon: CheckCircle },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Main Header */}
      <div
        className="text-white bg-cover bg-center relative"
        style={{ backgroundImage: `url(${BgHeader})` }}
      >
        <div className="absolute inset-0 bg-[#093089] bg-opacity-90 mix-blend-multiply"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-4 md:py-8">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <a href="/">
              <div className="flex items-center space-x-2 md:space-x-4">
                <img src={Logo} alt="Logo" className="aspect-video w-44" />
              </div>
            </a>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Search Section */}
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 px-4">
              Busque seu nome nos diários oficiais.
            </h2>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4">
              <div className="bg-white rounded-full p-1 md:p-2 flex items-center shadow-lg">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Digite seu nome completo para buscar nos diários oficiais"
                  className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-500 px-3 md:px-6 py-2 md:py-4 text-sm md:text-lg"
                />
                <button
                  type="submit"
                  className="bg-[#093089] hover:bg-[#0a3a9a] transition-colors text-white p-2 md:p-4 rounded-full ml-1 md:ml-2"
                >
                  <Search size={20} className="md:w-6 md:h-6" />
                </button>
              </div>
            </form>

            <div className="mt-4 md:mt-6">
              <p className="text-blue-100 mb-3 text-sm md:text-base">
                Populares:
              </p>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-4">
                {popularServices.map((service, index) => (
                  <button
                    key={index}
                    className="bg-white/10 hover:bg-white/20 text-white px-3 md:px-4 py-1 md:py-2 rounded-full transition-colors flex items-center space-x-1 md:space-x-2 text-xs md:text-sm"
                  >
                    <service.icon size={14} className="md:w-4 md:h-4" />
                    <span className="hidden sm:inline">{service.name}</span>
                    <span className="sm:hidden">
                      {service.name.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Services */}
      <div className="py-8 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              SERVIÇOS EM DESTAQUE
            </h2>
            <div className="w-24 h-1 bg-[#093089] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div
                  className={`${service.color} w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center mb-3 md:mb-4`}
                >
                  <service.icon className="text-white" size={24} />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                  {service.description}
                </p>
                <button className="text-[#093089] font-medium flex items-center space-x-2 hover:text-[#0a3a9a] text-sm md:text-base">
                  <span>Acessar</span>
                  <ArrowRight size={14} className="md:w-4 md:h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-8 md:py-16 bg-[#093089] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              FATOS E INDICADORES
            </h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 justify-items-center mx-auto lg:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <stat.icon size={24} className="md:w-8 md:h-8" />
                </div>
                <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <div className="w-24 h-1 bg-[#093089] mx-auto"></div>
          </div>

          <div className="space-y-3 md:space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 md:p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-base md:text-lg font-medium text-gray-900 pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`text-gray-500 transition-transform flex-shrink-0 ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </button>

                {expandedFaq === index && (
                  <div className="px-4 md:px-6 pb-4 md:pb-6">
                    <div className="border-t pt-3 md:pt-4">
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#093089] text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <img src={Logo} alt="Logo" className="aspect-video w-40" />
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm md:text-base">
                Contato
              </h4>
              <div className="space-y-2 text-blue-100 text-sm md:text-base">
                <div className="flex items-center space-x-2">
                  <Phone size={14} className="md:w-4 md:h-4" />
                  <span>(65) 3613-6000</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={14} className="md:w-4 md:h-4" />
                  <span>contato@mt.gov.br</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={14} className="md:w-4 md:h-4" />
                  <span>Cuiabá - MT</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#0a3a9a] mt-6 md:mt-8 pt-6 md:pt-8 text-center text-blue-100 text-sm md:text-base">
            <p>
              © 2025 - Diário Oficial de Mato Grosso - Todos os direitos
              reservados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
