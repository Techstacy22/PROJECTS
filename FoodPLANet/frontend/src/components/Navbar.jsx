import {useState, useEffect} from "react";
import { ChefHat, User, LogOut, Menu, X } from "lucide-react";
import './styles/Navbar.css';
import { useAuth } from "../contexts/AuthContext.jsx";




export function Navbar({ onNavigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    if (onNavigate) {
      onNavigate('home');
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'saved', label: 'Saved Recipes' },
    { id: 'diet-types', label: 'Dietary Preferences' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="navbar-logo"
        >
          <div className="logo-icon">
            <ChefHat size={20} />
          </div>
          <span className="logo-text">Food Planet</span>
        </button>

        {/* Desktop Navigation */}
        <div className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="nav-link"
            >
              {item.label}
            </button>
          ))}
        </div>

        Desktop Auth Buttons
        <div className="nav-auth">
          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <button 
                className="user-menu-trigger"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <User size={18} />
                {user?.name}
              </button>
              
              {showUserMenu && (
                <div className="user-menu">
                  <div className="user-menu-label">My Account</div>
                  <div className="user-menu-separator"></div>
                  <button className="user-menu-item" disabled>
                    <User size={16} />
                    <span>{user?.email}</span>
                  </button>
                  <div className="user-menu-separator"></div>
                  <button 
                    className="user-menu-item logout" 
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                className="btn btn-outline"
                onClick={() => onNavigate?.('login')}
              >
                Sign In
              </button>
              <button
                className="btn btn-primary"
                onClick={() => onNavigate?.('get-started')}
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-nav-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="mobile-nav-link"
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="mobile-auth-btns">
            {isAuthenticated ? (
              <>
                <div className="mobile-user-info">
                  <div className="mobile-user-name">{user?.name}</div>
                  <div className="mobile-user-email">{user?.email}</div>
                </div>
                <button
                  className="btn btn-outline w-full"
                  style={{ color: 'var(--red)' }}
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline w-full"
                  onClick={() => {
                    onNavigate?.('login');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </button>
                <button
                  className="btn btn-primary w-full"
                  onClick={() => {
                    onNavigate?.('get-started');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}


