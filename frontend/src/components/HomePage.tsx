import { useState } from "react";
import {
  Search,
  ChevronDown,
  FileText,
  Users,
  Shield,
  Globe,
  Menu,
  X,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Scale,
  Building2,
  Gavel,
} from "lucide-react";

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
    { name: "Trânsito e Veículos", icon: Users },
    { name: "Educação", icon: BookOpen },
    { name: "Segurança", icon: Shield },
    { name: "Justiça", icon: Scale },
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
    {
      title: "Transparência",
      description: "Acesso à informação e dados abertos",
      icon: Globe,
      color: "bg-orange-600",
    },
  ];

  const stats = [
    { number: "770+", label: "Publicações Diárias", icon: FileText },
    { number: "355+", label: "Órgãos Ativos", icon: Building2 },
    { number: "24/7", label: "Disponibilidade", icon: Clock },
    { number: "100%", label: "Gratuito", icon: CheckCircle },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <span>TRANSPARÊNCIA</span>
            <span>LEGISLAÇÃO</span>
            <span>SECRETARIAS</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-3">
              <Facebook size={16} />
              <Twitter size={16} />
              <Youtube size={16} />
              <Instagram size={16} />
            </div>
            <button className="bg-white text-[#1e3a8a] px-4 py-1 rounded text-sm font-medium">
              ENTRAR
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="bg-white text-blue-700 p-3 rounded-lg">
                <FileText size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">MT.gov.br</h1>
                <p className="text-blue-100">Diário Oficial</p>
              </div>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Search Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">
              Qual serviço você procura?
            </h2>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="bg-white rounded-full p-2 flex items-center shadow-lg">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Digite seu nome completo para buscar no Diário Oficial"
                  className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-500 px-6 py-4 text-lg"
                />
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-800 transition-colors text-white p-4 rounded-full ml-2"
                >
                  <Search size={24} />
                </button>
              </div>
            </form>

            <div className="mt-6">
              <p className="text-blue-100 mb-3">Populares:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {popularServices.map((service, index) => (
                  <button
                    key={index}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors flex items-center space-x-2"
                  >
                    <service.icon size={16} />
                    <span>{service.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="hidden md:flex space-x-8 py-4">
            <a
              href="#"
              className="text-blue-700 font-medium hover:text-blue-800"
            >
              Serviços
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-700">
              Notícias
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-700">
              Indicadores
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-700">
              Aplicativos
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-700">
              Categorias
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-700">
              Central do Cidadão
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-700">
              Agendamentos
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-700">
              Validar Documento
            </a>
          </nav>
        </div>
      </div>

      {/* Featured Services */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              SERVIÇOS EM DESTAQUE
            </h2>
            <div className="w-24 h-1 bg-blue-700 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div
                  className={`${service.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}
                >
                  <service.icon className="text-white" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="text-blue-700 font-medium flex items-center space-x-2 hover:text-blue-800">
                  <span>Acessar</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">FATOS E INDICADORES</h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={32} />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <div className="w-24 h-1 bg-blue-700 mx-auto"></div>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-900">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`text-gray-500 transition-transform ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                    size={24}
                  />
                </button>

                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <div className="border-t pt-4">
                      <p className="text-gray-700 leading-relaxed">
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
      <div className="bg-[#1e3a8a] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-white text-[#1e40af] p-2 rounded">
                  <FileText size={24} />
                </div>
                <h3 className="text-xl font-bold">MT.gov.br</h3>
              </div>
              <p className="text-blue-100">
                Sistema de busca do Diário Oficial de Mato Grosso
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">REDES SOCIAIS</h4>
              <div className="flex space-x-4">
                <Facebook size={20} />
                <Twitter size={20} />
                <Youtube size={20} />
                <Instagram size={20} />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Transparência</h4>
              <ul className="space-y-2 text-blue-100">
                <li>Portal de Transparência</li>
                <li>Dados Abertos</li>
                <li>Acesso à Informação</li>
                <li>Política de Privacidade</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-blue-100">
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span>(65) 3613-6000</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span>contato@mt.gov.br</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span>Cuiabá - MT</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-100">
            <p>© 2025 - Desenvolvido por MTI - Todos os direitos reservados</p>
          </div>
        </div>
      </div>
    </div>
  );
}
