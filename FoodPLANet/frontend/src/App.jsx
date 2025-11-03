import React from 'react'
import { useState } from 'react';
// import { AuthProvider } from './contexts/AuthContext.jsx';
import { Navbar } from './components/Navbar.jsx';
import { HomePage } from './components/HomePage.jsx';
import { SavedRecipesPage } from './components/SavedRecipesPage.jsx';
import { DietTypesPage } from './components/DietTypesPage.jsx';
import { LoginPage } from './components/LoginPage.jsx';
import { GetStartedPage } from './components/GetStartedPage.jsx';
import './styles/main.css';
import './styles/Navbar.css';
import './styles/auth.css';
import './styles/recipe.css';




function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'saved':
        return <SavedRecipesPage onNavigate={setCurrentPage} />;
      case 'diet-types':
        return <DietTypesPage />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'get-started':
        return <GetStartedPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <Navbar onNavigate={setCurrentPage} />
      {renderPage()}
    </div>
  );
}
export default App;




