import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LandingPage.css'; // Custom CSS for styling

function LandingPage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  // Admin email list (should match the one in AdminPage)
  const adminEmails = ['admin@example.com', 'admin@gmail.com']; // Add your admin emails here
  const isAdmin = currentUser && adminEmails.includes(currentUser.email);

  const handleLogout = async () => {
    try {
      await logout();
      // Stay on landing page after logout
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <header className="hero-section">
        {/* Auth Navigation - positioned at top */}
        <div className="auth-nav">
          {currentUser ? (
            <div className="user-info">
              <span className="welcome-text">Welcome, {currentUser.email.split('@')[0]}!</span>
              {isAdmin && (
                <Link to="/admin" className="btn admin-btn">
                  Admin Panel
                </Link>
              )}
              <button onClick={handleLogout} className="btn logout">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn login-nav">
              Login
            </Link>
          )}
        </div>

        <div className="hero-content">
          <img src="/logo.png" alt="Logo" className="logo" />
          <h1 className="tagline">Try Before You Buy — Virtually</h1>
          <p className="description">
            Experience the future of fashion. Virtually try on clothes before purchasing from our exclusive and trendsetting collection.
          </p>
          <div className="cta-buttons">
            <Link to="/collection" className="btn browse">Browse Collection</Link>
            {currentUser ? (
              <button 
                className="btn try-on"
                onClick={() => navigate('/collection')}
              >
                Start Try-On Experience
              </button>
            ) : (
              <Link to="/login" className="btn login">Login to Try-On</Link>
            )}
          </div>
          
          {/* Status message for non-logged users */}
          {!currentUser && (
            <p className="login-prompt">
              🔒 Login to unlock the full virtual try-on experience
            </p>
          )}
        </div>
      </header>

      {/* About Section */}
      <section className="about-section">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>👗 Step 1: Browse</h3>
            <p>Explore our curated collection of fashionable outfits and luxury dresses.</p>
          </div>
          <div className="step">
            <h3>📷 Step 2: Try-On</h3>
            <p>
              {currentUser 
                ? "Use your camera or upload a photo to try clothes virtually using AR." 
                : "Login and use your camera or upload a photo to try clothes virtually using AR."
              }
            </p>
          </div>
          <div className="step">
            <h3>🛒 Step 3: Shop</h3>
            <p>Found the perfect fit? Add to cart and get it delivered to your doorstep.</p>
          </div>
        </div>
      </section>

      {/* Features Section - Show different content based on auth status */}
      <section className="features-section">
        {currentUser ? (
          <div className="logged-in-features">
            <h2>Your Personalized Experience</h2>
            <div className="feature-grid">
              <div className="feature-card">
                <h3>🎯 AI-Powered Recommendations</h3>
                <p>Get personalized style suggestions based on your preferences</p>
              </div>
              <div className="feature-card">
                <h3>💾 Save Your Looks</h3>
                <p>Create a wishlist of your favorite virtual try-on sessions</p>
              </div>
              <div className="feature-card">
                <h3>📊 Fit Analytics</h3>
                <p>Get detailed fit analysis and size recommendations</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="guest-features">
            <h2>Why Login?</h2>
            <div className="benefit-list">
              <div className="benefit">
                <span className="benefit-icon">✨</span>
                <div>
                  <h4>Unlimited Try-Ons</h4>
                  <p>Access our full virtual try-on technology</p>
                </div>
              </div>
              <div className="benefit">
                <span className="benefit-icon">💝</span>
                <div>
                  <h4>Personal Wishlist</h4>  
                  <p>Save your favorite items for later</p>
                </div>
              </div>
              <div className="benefit">
                <span className="benefit-icon">🎨</span>
                <div>
                  <h4>Style Profile</h4>
                  <p>Get personalized recommendations</p>
                </div>
              </div>
            </div>
            <div className="cta-center">
              <Link to="/login" className="btn signup-cta">
                Join Now - It's Free!
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 TryOnWear | Designed with ❤️</p>
        <div className="social-links">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="mailto:support@tryonwear.com">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;