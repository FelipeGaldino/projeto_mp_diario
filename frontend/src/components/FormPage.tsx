import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface FormPageProps {
  searchName: string;
  onSubmit: (email: string, phone: string) => void;
  onBack: () => void;
}

export default function FormPage({ searchName, onSubmit, onBack }: FormPageProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [lgpdAccepted, setLgpdAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && phone && termsAccepted && lgpdAccepted) {
      onSubmit(email, phone);
    }
  };

  return (
    <div className="bg-white relative min-h-screen flex items-center justify-center p-8">
      <button
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-[#014CAA] hover:text-[#013580] transition-colors"
      >
        <ArrowLeft size={24} />
        <span>Voltar</span>
      </button>

      <div className="bg-[#f5f5f5] rounded-[47px] w-full max-w-[894px] p-16">
        <h1 className="text-center mb-12 text-[#014CAA]">
          Formulário para confirmar dados
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
              className="bg-white h-[117px] rounded-[20px] w-full px-8 outline-none focus:ring-2 focus:ring-[#014CAA]"
            />
          </div>

          <div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Telefone"
              required
              className="bg-white h-[117px] rounded-[20px] w-full px-8 outline-none focus:ring-2 focus:ring-[#014CAA]"
            />
          </div>

          <div className="space-y-4 pt-8">
            <label className="flex items-center gap-4 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
                className="w-[43px] h-[43px] rounded cursor-pointer accent-[#014CAA]"
              />
              <span className="text-gray-900">
                Li e aceito os Termos de uso
              </span>
            </label>

            <label className="flex items-center gap-4 cursor-pointer">
              <input
                type="checkbox"
                checked={lgpdAccepted}
                onChange={(e) => setLgpdAccepted(e.target.checked)}
                required
                className="w-[43px] h-[43px] rounded cursor-pointer accent-[#014CAA]"
              />
              <span className="text-gray-900">
                Estou ciente sobre o tratamento de dados pessoais (LGPD)
              </span>
            </label>
          </div>

          <div className="flex justify-center pt-8">
            <button
              type="submit"
              disabled={!email || !phone || !termsAccepted || !lgpdAccepted}
              className="bg-[#014CAA] hover:bg-[#013580] disabled:bg-gray-400 disabled:cursor-not-allowed text-white h-[109px] px-16 rounded-[20px] transition-colors"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
