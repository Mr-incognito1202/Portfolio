import { useState, useEffect } from "react";
import { ShieldCheck, House, UserRound, Code2, FolderGit2, FlaskConical, ChartNoAxesCombined, Award, Mail, Github, Linkedin, Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  ["home", "Home", House],
  ["about", "About", UserRound],
  ["skills", "Skills", Code2],
  ["projects", "Projects", FolderGit2],
  ["labs", "Lab", FlaskConical],
  ["results", "Results", ChartNoAxesCombined],
  ["certifications", "Certifications", Award],
  ["contact", "Contact", Mail]
];

export default function Navbar({ active, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleNav(id) {
    onNavigate(id);
    setMobileOpen(false);
  }

  return (
    <header className={`top-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <button className="nav-brand" onClick={() => handleNav("home")}>
          <div className="brand-mark">
            <ShieldCheck size={20} />
          </div>
          <div className="brand-text">
            <strong>REDSEC<span>.</span></strong>
            <small>SECURITY PORTFOLIO</small>
          </div>
        </button>

        <nav className="desktop-nav">
          {links.map(([id, label, Icon]) => (
            <button
              key={id}
              className={`nav-item ${active === id ? "active" : ""}`}
              onClick={() => handleNav(id)}
            >
              <Icon size={14} />
              <span>{label}</span>
              {active === id && <span className="nav-active-pill" />}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="nav-status-badge">
            <span className="pulse-dot" />
            <span>OPEN TO LEARNING</span>
          </div>
          <a
            href="https://github.com/Mr-incognito1202"
            target="_blank"
            rel="noreferrer"
            className="nav-icon-link"
            aria-label="GitHub Profile"
          >
            <Github size={17} />
          </a>
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer / dropdown */}
      {mobileOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-menu" onClick={e => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="eyebrow">NAVIGATION</span>
              <button className="icon-btn" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={18} />
              </button>
            </div>
            <div className="mobile-menu-links">
              {links.map(([id, label, Icon]) => (
                <button
                  key={id}
                  className={`mobile-nav-item ${active === id ? "active" : ""}`}
                  onClick={() => handleNav(id)}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                  {active === id && <span className="pulse-dot" />}
                </button>
              ))}
            </div>
            <div className="mobile-menu-footer">
              <a
                href="https://github.com/Mr-incognito1202"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary mobile-social-btn"
              >
                <Github size={15} /> GitHub <ArrowUpRight size={13} />
              </a>
              <a
                href="mailto:harshavardhan1202005@gmail.com"
                className="btn btn-primary mobile-social-btn"
              >
                <Mail size={15} /> Contact Me
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
