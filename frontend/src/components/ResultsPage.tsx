import React from "react";
import {
  ArrowLeft,
  ExternalLink,
  Download,
  MessageCircle,
  FileText,
  Calendar,
  Building2,
  User,
  Filter,
  Search,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Share2,
  BookOpen,
  Scale,
  Shield,
  Gavel,
} from "lucide-react";

import Logo from "../../src/public/logo.png";

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
    date: "12/10/2025",
    organ: "Secretaria de Estado de Educação",
    type: "Nomeação",
    excerpt:
      "PORTARIA Nº 123/2025 - Nomear o servidor para exercer o cargo de Professor...",
    edition: "28.456",
  },
  {
    id: 2,
    date: "05/10/2025",
    organ: "Secretaria de Estado de Saúde",
    type: "Publicação",
    excerpt:
      "EDITAL Nº 045/2025 - Convocação para apresentação de documentos...",
    edition: "28.449",
  },
  {
    id: 3,
    date: "28/09/2025",
    organ: "Secretaria de Estado de Administração",
    type: "Designação",
    excerpt:
      "ATO ADMINISTRATIVO - Designar para compor comissão avaliadora do processo...",
    edition: "28.442",
  },
  {
    id: 4,
    date: "15/09/2025",
    organ: "Tribunal de Justiça de Mato Grosso",
    type: "Intimação",
    excerpt: "EDITAL DE INTIMAÇÃO - Processo nº 1234567-89.2025.8.11.0001...",
    edition: "28.435",
  },
  {
    id: 5,
    date: "03/09/2025",
    organ: "Secretaria de Estado de Educação",
    type: "Resultado",
    excerpt: "RESULTADO FINAL - Processo Seletivo Simplificado nº 002/2025...",
    edition: "28.423",
  },
  {
    id: 6,
    date: "20/08/2025",
    organ: "Assembleia Legislativa de MT",
    type: "Publicação",
    excerpt: "LEI Nº 12.345 - Altera dispositivos da Lei Estadual...",
    edition: "28.409",
  },
  {
    id: 7,
    date: "10/08/2025",
    organ: "Secretaria de Estado de Fazenda",
    type: "Notificação",
    excerpt: "NOTIFICAÇÃO FISCAL - Débito inscrito na dívida ativa estadual...",
    edition: "28.399",
  },
  {
    id: 8,
    date: "01/08/2025",
    organ: "Secretaria de Estado de Infraestrutura",
    type: "Licitação",
    excerpt: "AVISO DE LICITAÇÃO - Pregão Eletrônico nº 078/2025...",
    edition: "28.390",
  },
  {
    id: 9,
    date: "22/07/2025",
    organ: "Secretaria de Estado de Segurança Pública",
    type: "Portaria",
    excerpt: "PORTARIA Nº 456/2025 - Promover o servidor ao posto de...",
    edition: "28.380",
  },
  {
    id: 10,
    date: "15/07/2025",
    organ: "Defensoria Pública de MT",
    type: "Edital",
    excerpt: "EDITAL DE CONVOCAÇÃO - Processo Seletivo Estagiários 2025...",
    edition: "28.373",
  },
];

export default function ResultsPage({
  searchName,
  userEmail,
  onBack,
  onOpenChat,
}: ResultsPageProps) {
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "nomeação":
        return User;
      case "publicação":
        return FileText;
      case "designação":
        return CheckCircle;
      case "intimação":
        return AlertCircle;
      case "resultado":
        return CheckCircle;
      case "notificação":
        return AlertCircle;
      case "licitação":
        return Gavel;
      case "portaria":
        return Scale;
      case "edital":
        return BookOpen;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "nomeação":
        return "bg-green-100 text-green-800 border-green-200";
      case "publicação":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "designação":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "intimação":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "resultado":
        return "bg-green-100 text-green-800 border-green-200";
      case "notificação":
        return "bg-red-100 text-red-800 border-red-200";
      case "licitação":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "portaria":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "edital":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#093089] to-[#093089] text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 md:gap-3 hover:text-blue-200 transition-colors"
            >
              <ArrowLeft size={20} className="md:w-6 md:h-6" />
              <span className="text-base md:text-lg">Voltar</span>
            </button>

            <div className="flex items-center space-x-2 md:space-x-3">
              <img src={Logo} alt="Logo" className="aspect-video w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* User Info & Stats */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Resultados da Busca
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-gray-600 text-sm md:text-base">
                <div className="flex items-center space-x-2">
                  <User size={14} className="md:w-4 md:h-4" />
                  <span>
                    <strong>Nome:</strong> {searchName}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle size={14} className="md:w-4 md:h-4" />
                  <span>
                    <strong>E-mail:</strong> {userEmail}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#093089] to-[#093089] text-white rounded-xl p-3 md:p-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">
                  {mockResults.length}
                </div>
                <div className="text-blue-100 text-sm md:text-base">
                  Menções Encontradas
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-gray-500 md:w-5 md:h-5" />
              <span className="text-gray-700 font-medium text-sm md:text-base">
                Filtros:
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "Todos",
                "Nomeação",
                "Publicação",
                "Designação",
                "Intimação",
                "Resultado",
              ].map((filter) => (
                <button
                  key={filter}
                  className="px-3 md:px-4 py-1 md:py-2 rounded-full border border-gray-200 hover:border-[#093089] hover:text-[#093089] transition-colors text-xs md:text-sm"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
        <div className="space-y-4 md:space-y-6">
          {mockResults.map((result) => {
            const TypeIcon = getTypeIcon(result.type);
            const typeColorClass = getTypeColor(result.type);

            return (
              <div
                key={result.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 overflow-hidden"
              >
                <div className="p-4 md:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3 mb-3">
                        <div
                          className={`${typeColorClass} px-2 md:px-3 py-1 rounded-full border flex items-center space-x-1 md:space-x-2`}
                        >
                          <TypeIcon size={14} className="md:w-4 md:h-4" />
                          <span className="font-medium text-xs md:text-sm">
                            {result.type}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500 text-sm">
                          <Calendar size={14} className="md:w-4 md:h-4" />
                          <span>{result.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500 text-sm">
                          <FileText size={14} className="md:w-4 md:h-4" />
                          <span>Edição {result.edition}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mb-3">
                        <Building2
                          size={18}
                          className="text-[#093089] md:w-5 md:h-5"
                        />
                        <h3 className="text-base md:text-lg font-semibold text-gray-900">
                          {result.organ}
                        </h3>
                      </div>

                      <p className="text-gray-700 leading-relaxed mb-4 text-sm md:text-base">
                        {result.excerpt}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => onOpenChat(result)}
                        className="flex items-center justify-center space-x-1 md:space-x-2 bg-[#093089] hover:bg-[#0a3a9a] text-white px-3 md:px-4 py-2 rounded-lg transition-colors text-sm"
                        title="Conversar com IA sobre este documento"
                      >
                        <MessageCircle
                          size={16}
                          className="md:w-[18px] md:h-[18px]"
                        />
                        <span className="hidden sm:inline">IA Assistant</span>
                        <span className="sm:hidden">IA</span>
                      </button>

                      <button
                        className="flex items-center justify-center space-x-1 md:space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 md:px-4 py-2 rounded-lg transition-colors text-sm"
                        title="Abrir publicação"
                      >
                        <ExternalLink
                          size={16}
                          className="md:w-[18px] md:h-[18px]"
                        />
                        <span>Abrir</span>
                      </button>

                      <button
                        className="flex items-center justify-center space-x-1 md:space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 md:px-4 py-2 rounded-lg transition-colors text-sm"
                        title="Baixar PDF"
                      >
                        <Download
                          size={16}
                          className="md:w-[18px] md:h-[18px]"
                        />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-3 border-t">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>Publicado em {result.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye size={14} />
                        <span>Visualizações: 1.234</span>
                      </div>
                    </div>
                    <button className="flex items-center space-x-1 hover:text-[#1e40af] transition-colors">
                      <Share2 size={14} />
                      <span>Compartilhar</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Footer */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-blue-50 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle size={24} className="text-[#1e40af] mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Informação Importante
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Os resultados são baseados em buscas automáticas nos Diários
                  Oficiais. Verifique cada publicação completa para confirmar se
                  a menção se refere à sua pessoa. Em caso de dúvidas, consulte
                  o órgão responsável pela publicação.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
