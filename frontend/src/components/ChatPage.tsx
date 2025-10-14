import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send } from 'lucide-react';

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
  sender: 'user' | 'ai';
  timestamp: Date;
}

// Mock responses baseadas em palavras-chave
const getAIResponse = (userMessage: string, document: Document): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('o que') || lowerMessage.includes('fala') || lowerMessage.includes('sobre')) {
    return `Este documento é ${document.type.toLowerCase()} publicado pela ${document.organ} no dia ${document.date}. O documento menciona você no seguinte contexto: "${document.excerpt}". Trata-se de um ato oficial que pode ter implicações importantes para você.`;
  }
  
  if (lowerMessage.includes('quando') || lowerMessage.includes('data')) {
    return `O documento foi publicado no Diário Oficial em ${document.date}, edição nº ${document.edition}.`;
  }
  
  if (lowerMessage.includes('onde') || lowerMessage.includes('órgão') || lowerMessage.includes('orgao')) {
    return `A publicação é do órgão: ${document.organ}.`;
  }
  
  if (lowerMessage.includes('importante') || lowerMessage.includes('preciso') || lowerMessage.includes('fazer')) {
    return `Recomendo que você leia o documento completo e, se necessário, consulte o órgão responsável (${document.organ}) para obter mais informações ou orientações sobre os próximos passos. Se houver prazos mencionados, é importante cumpri-los.`;
  }
  
  if (lowerMessage.includes('prazo') || lowerMessage.includes('tempo')) {
    return `Para verificar se há prazos específicos, você deve consultar o documento completo. Geralmente, publicações oficiais contêm informações sobre prazos para recursos, apresentação de documentos ou outras ações necessárias.`;
  }
  
  if (lowerMessage.includes('nomeação') || lowerMessage.includes('cargo')) {
    return `Este documento trata de ${document.type.toLowerCase()}. Para mais detalhes sobre o cargo, atribuições e data de posse, consulte o documento completo no Diário Oficial.`;
  }
  
  if (lowerMessage.includes('obrigado') || lowerMessage.includes('valeu')) {
    return `Por nada! Estou aqui para ajudar. Se tiver mais dúvidas sobre este ou outros documentos, pode me perguntar!`;
  }
  
  // Resposta genérica
  return `Entendo sua pergunta. Com base no documento "${document.type}" publicado em ${document.date}, posso dizer que: ${document.excerpt} Para informações mais específicas, recomendo consultar o documento completo ou entrar em contato com ${document.organ}.`;
};

export default function ChatPage({ document, searchName, onBack }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Olá! Sou a IA assistente do Diário Oficial. Estou aqui para ajudar você a entender o documento "${document.type}" publicado em ${document.date}. Pode me fazer perguntas sobre este documento!`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simular delay da IA e adicionar resposta
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: getAIResponse(inputMessage, document),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="bg-white relative min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-[#014CAA] h-[93px] w-full flex items-center px-[89px] flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-3 text-white hover:text-gray-200 transition-colors"
        >
          <ArrowLeft size={24} />
          <span>Diário Chat</span>
        </button>
      </div>

      {/* Document Info */}
      <div className="bg-[#e6f0ff] px-[89px] py-6 flex-shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-[#014CAA] text-white px-4 py-1 rounded-full">
            {document.type}
          </span>
          <span className="text-gray-700">
            {document.organ} - {document.date}
          </span>
        </div>
        <p className="text-gray-600">
          Conversando sobre a edição nº {document.edition}
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-[89px] py-8 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-6 py-4 ${
                message.sender === 'user'
                  ? 'bg-[#014CAA] text-white'
                  : 'bg-[#f5f5f5] text-gray-900'
              }`}
            >
              <p className="leading-relaxed">{message.text}</p>
              <p
                className={`mt-2 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="px-[89px] pb-4">
          <p className="text-gray-600 mb-3">Perguntas sugeridas:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'O que esse documento fala sobre mim?',
              'Quando foi publicado?',
              'O que eu preciso fazer?',
              'Existe algum prazo?'
            ].map((question, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(question)}
                className="bg-[#e6f0ff] hover:bg-[#d0e0ff] text-[#014CAA] px-4 py-2 rounded-full transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-[89px] py-6 flex-shrink-0">
        <form onSubmit={handleSendMessage} className="flex gap-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Digite sua pergunta sobre o documento..."
            className="flex-1 bg-[#f5f5f5] rounded-full px-6 py-4 outline-none focus:ring-2 focus:ring-[#014CAA]"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="bg-[#014CAA] hover:bg-[#013580] disabled:bg-gray-400 disabled:cursor-not-allowed text-white w-[60px] h-[60px] rounded-full flex items-center justify-center transition-colors"
          >
            <Send size={24} />
          </button>
        </form>
      </div>
    </div>
  );
}
