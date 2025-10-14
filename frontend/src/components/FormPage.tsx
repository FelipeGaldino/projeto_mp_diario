import { useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Shield,
  CheckCircle,
  FileText,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

interface FormPageProps {
  searchName: string;
  onSubmit: (email: string, phone: string) => void;
  onBack: () => void;
}

export default function FormPage({
  searchName,
  onSubmit,
  onBack,
}: FormPageProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [lgpdAccepted, setLgpdAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && phone && termsAccepted && lgpdAccepted) {
      onSubmit(email, phone);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-3 hover:text-blue-200 transition-colors"
            >
              <ArrowLeft size={24} />
              <span className="text-lg">Voltar</span>
            </button>

            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <FileText size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold">MT.gov.br</h1>
                <p className="text-blue-100 text-sm">Diário Oficial</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] text-white p-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <User size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Confirmação de Dados</h2>
                <p className="text-blue-100">
                  Para prosseguir com a busca, precisamos confirmar seus dados
                </p>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm">
                <strong>Busca solicitada para:</strong> {searchName}
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <Mail size={20} />
                  <span>E-mail</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu e-mail"
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-lg focus:ring-2 focus:ring-[#1e40af] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <Phone size={20} />
                  <span>Telefone</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Digite seu telefone"
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-lg focus:ring-2 focus:ring-[#1e40af] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-4 pt-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Shield size={20} className="text-[#1e40af]" />
                    <span>Termos e Políticas</span>
                  </h3>

                  <div className="space-y-4">
                    <label className="flex items-start space-x-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          required
                          className="w-5 h-5 text-[#1e40af] bg-gray-100 border-gray-300 rounded focus:ring-[#1e40af] focus:ring-2"
                        />
                        {termsAccepted && (
                          <CheckCircle className="absolute -top-1 -right-1 w-6 h-6 text-[#1e40af]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-900 font-medium">
                          Li e aceito os Termos de Uso
                        </span>
                        <p className="text-gray-600 text-sm mt-1">
                          Concordo com as condições de uso do sistema de busca
                          do Diário Oficial.
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start space-x-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={lgpdAccepted}
                          onChange={(e) => setLgpdAccepted(e.target.checked)}
                          required
                          className="w-5 h-5 text-[#1e40af] bg-gray-100 border-gray-300 rounded focus:ring-[#1e40af] focus:ring-2"
                        />
                        {lgpdAccepted && (
                          <CheckCircle className="absolute -top-1 -right-1 w-6 h-6 text-[#1e40af]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-900 font-medium">
                          Estou ciente sobre o tratamento de dados pessoais
                          (LGPD)
                        </span>
                        <p className="text-gray-600 text-sm mt-1">
                          Autorizo o tratamento dos meus dados pessoais conforme
                          a Lei Geral de Proteção de Dados.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={!email || !phone || !termsAccepted || !lgpdAccepted}
                  className="w-full bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#1d4ed8] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 flex items-center justify-center space-x-2"
                >
                  <CheckCircle size={20} />
                  <span>Confirmar e Prosseguir</span>
                </button>
              </div>
            </form>
          </div>

          {/* Security Notice */}
          <div className="bg-gray-50 px-8 py-6 border-t">
            <div className="flex items-start space-x-3">
              <Lock size={20} className="text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">
                  <strong>Segurança:</strong> Seus dados são protegidos com
                  criptografia e utilizados exclusivamente para fornecer os
                  resultados da busca no Diário Oficial. Não compartilhamos suas
                  informações com terceiros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
