import { useState } from "react";
import HomePage from "./components/HomePage";
import FormPage from "./components/FormPage";
import ResultsPage from "./components/ResultsPage";
import ChatPage from "./components/ChatPage";

interface Document {
  id: number;
  date: string;
  organ: string;
  type: string;
  excerpt: string;
  edition: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "form" | "results" | "chat"
  >("home");
  const [searchName, setSearchName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );

  const handleSearch = (name: string) => {
    setSearchName(name);
    // Definir valores padrão para email e telefone
    setUserEmail("usuario@exemplo.com");
    setUserPhone("(65) 99999-9999");
    setCurrentPage("results");
  };

  const handleFormSubmit = (email: string, phone: string) => {
    setUserEmail(email);
    setUserPhone(phone);
    setCurrentPage("results");
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
    setSearchName("");
    setUserEmail("");
    setUserPhone("");
  };

  const handleOpenChat = (document: Document) => {
    setSelectedDocument(document);
    setCurrentPage("chat");
  };

  const handleBackToResults = () => {
    setCurrentPage("results");
    setSelectedDocument(null);
  };

  return (
    <div className="size-full">
      {currentPage === "home" && <HomePage onSearch={handleSearch} />}
      {currentPage === "form" && (
        <FormPage
          searchName={searchName}
          onSubmit={handleFormSubmit}
          onBack={handleBackToHome}
        />
      )}
      {currentPage === "results" && (
        <ResultsPage
          searchName={searchName}
          userEmail={userEmail}
          onBack={handleBackToHome}
          onOpenChat={handleOpenChat}
        />
      )}
      {currentPage === "chat" && selectedDocument && (
        <ChatPage
          document={selectedDocument}
          searchName={searchName}
          onBack={handleBackToResults}
        />
      )}
    </div>
  );
}
