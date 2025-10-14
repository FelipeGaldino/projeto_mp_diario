import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Send,
  Bot,
  User,
  FileText,
  Calendar,
  Building2,
  MessageCircle,
  Sparkles,
  Clock,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
} from "lucide-react";

interface Document {
  id: number;
  date: string;
  organ: string;
  type: string;
  excerpt: string;
  edition: string;
}

interface ChatPageProps {
  document: Document;
  searchName: string;
  onBack: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

// Mock responses baseadas em palavras-chave
const getAIResponse = (userMessage: string, document: Document): string => {
  const lowerMessage = userMessage.toLowerCase();

  if (
    lowerMessage.includes("o que") ||
    lowerMessage.includes("fala") ||
    lowerMessage.includes("sobre")
  ) {
    return `Este documento é ${document.type.toLowerCase()} publicado pela ${
      document.organ
    } no dia ${
      document.date
    }. O documento menciona você no seguinte contexto: "${
      document.excerpt
    }". Trata-se de um ato oficial que pode ter implicações importantes para você.`;
  }

  if (lowerMessage.includes("quando") || lowerMessage.includes("data")) {
    return `O documento foi publicado no Diário Oficial em ${document.date}, edição nº ${document.edition}.`;
  }

  if (
    lowerMessage.includes("onde") ||
    lowerMessage.includes("órgão") ||
    lowerMessage.includes("orgao")
  ) {
    return `A publicação é do órgão: ${document.organ}.`;
  }

  if (
    lowerMessage.includes("importante") ||
    lowerMessage.includes("preciso") ||
    lowerMessage.includes("fazer")
  ) {
    return `Recomendo que você leia o documento completo e, se necessário, consulte o órgão responsável (${document.organ}) para obter mais informações ou orientações sobre os próximos passos. Se houver prazos mencionados, é importante cumpri-los.`;
  }

  if (lowerMessage.includes("prazo") || lowerMessage.includes("tempo")) {
    return `Para verificar se há prazos específicos, você deve consultar o documento completo. Geralmente, publicações oficiais contêm informações sobre prazos para recursos, apresentação de documentos ou outras ações necessárias.`;
  }

  if (lowerMessage.includes("nomeação") || lowerMessage.includes("cargo")) {
    return `Este documento trata de ${document.type.toLowerCase()}. Para mais detalhes sobre o cargo, atribuições e data de posse, consulte o documento completo no Diário Oficial.`;
  }

  if (lowerMessage.includes("obrigado") || lowerMessage.includes("valeu")) {
    return `Por nada! Estou aqui para ajudar. Se tiver mais dúvidas sobre este ou outros documentos, pode me perguntar!`;
  }

  // Resposta genérica
  return `Entendo sua pergunta. Com base no documento "${document.type}" publicado em ${document.date}, posso dizer que: ${document.excerpt} Para informações mais específicas, recomendo consultar o documento completo ou entrar em contato com ${document.organ}.`;
};

export default function ChatPage({
  document,
  searchName,
  onBack,
}: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Olá! Sou a IA assistente do Diário Oficial. Estou aqui para ajudar você a entender o documento "${document.type}" publicado em ${document.date}. Pode me fazer perguntas sobre este documento!`,
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Adicionar mensagem do usuário
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simular delay da IA e adicionar resposta
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: getAIResponse(inputMessage, document),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const suggestedQuestions = [
    "O que esse documento fala sobre mim?",
    "Quando foi publicado?",
    "O que eu preciso fazer?",
    "Existe algum prazo?",
    "Qual órgão publicou?",
    "Como posso acessar o documento completo?",
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
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
              <div className="bg-white/20 p-1 md:p-2 rounded-lg">
                <MessageCircle size={20} className="md:w-6 md:h-6" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold">IA Assistant</h1>
                <p className="text-blue-100 text-xs md:text-sm">
                  Diário Oficial
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Info */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="bg-[#093089] text-white p-2 md:p-3 rounded-lg">
                  <FileText size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3 mb-2">
                    <span className="bg-[#093089] text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                      {document.type}
                    </span>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar size={14} className="md:w-4 md:h-4" />
                      <span className="text-xs md:text-sm">
                        {document.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Building2
                      size={14}
                      className="text-[#093089] md:w-4 md:h-4"
                    />
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                      {document.organ}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-xs md:text-sm">
                    Edição nº {document.edition} • Busca para: {searchName}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">IA Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-4 md:py-8 space-y-4 md:space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-2 md:space-x-3 max-w-[85%] md:max-w-[80%] ${
                  message.sender === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <div
                  className={`flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
                    message.sender === "user"
                      ? "bg-[#093089] text-white"
                      : "bg-gradient-to-r from-[#093089] to-[#093089] text-white"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User size={14} className="md:w-4 md:h-4" />
                  ) : (
                    <Bot size={14} className="md:w-4 md:h-4" />
                  )}
                </div>

                <div
                  className={`rounded-2xl px-3 md:px-4 py-2 md:py-3 ${
                    message.sender === "user"
                      ? "bg-[#093089] text-white"
                      : "bg-white text-gray-900 shadow-sm border"
                  }`}
                >
                  <p className="leading-relaxed text-sm md:text-base">
                    {message.text}
                  </p>
                  <div
                    className={`flex items-center justify-between mt-2 ${
                      message.sender === "user"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    <span className="text-xs">
                      {message.timestamp.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {message.sender === "ai" && (
                      <div className="flex items-center space-x-1">
                        <button
                          className="hover:text-[#1e40af] transition-colors"
                          title="Curtir"
                        >
                          <ThumbsUp size={12} />
                        </button>
                        <button
                          className="hover:text-red-500 transition-colors"
                          title="Não curtir"
                        >
                          <ThumbsDown size={12} />
                        </button>
                        <button
                          className="hover:text-[#1e40af] transition-colors"
                          title="Copiar"
                        >
                          <Copy size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#093089] to-[#093089] text-white flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-gray-500 text-sm">
                      IA está digitando...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="bg-white border-t">
          <div className="max-w-4xl mx-auto px-4 py-3 md:py-4">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles size={14} className="text-[#093089] md:w-4 md:h-4" />
              <span className="text-gray-700 font-medium text-sm md:text-base">
                Perguntas sugeridas:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(question)}
                  className="bg-blue-50 hover:bg-blue-100 text-[#093089] px-3 md:px-4 py-1 md:py-2 rounded-full transition-colors text-xs md:text-sm border border-blue-200"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 py-4 md:py-6">
          <form onSubmit={handleSendMessage} className="flex gap-3 md:gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Digite sua pergunta sobre o documento..."
                className="w-full bg-gray-50 border border-gray-200 rounded-full px-4 md:px-6 py-3 md:py-4 text-sm md:text-lg outline-none focus:ring-2 focus:ring-[#093089] focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="bg-gradient-to-r from-[#093089] to-[#093089] hover:from-[#0a3a9a] hover:to-[#0a3a9a] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all transform hover:scale-105 disabled:scale-100"
            >
              {isTyping ? (
                <RefreshCw size={18} className="animate-spin md:w-5 md:h-5" />
              ) : (
                <Send size={18} className="md:w-5 md:h-5" />
              )}
            </button>
          </form>

          <div className="flex items-center justify-center mt-3 md:mt-4">
            <div className="flex items-center space-x-2 text-gray-500 text-xs md:text-sm">
              <Clock size={12} className="md:w-[14px] md:h-[14px]" />
              <span>IA Assistant • Respostas em tempo real</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
