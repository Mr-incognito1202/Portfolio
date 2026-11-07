import { useState, useRef, useEffect } from "react";
import { Camera, User, Check, Shield } from "lucide-react";

export default function ProfileAvatar({ variant = "hero", className = "" }) {
  const [avatarUrl, setAvatarUrl] = useState(() => {
    try {
      return localStorage.getItem("redsec_profile_avatar") || `${import.meta.env.BASE_URL}profile.jpg`;
    } catch {
      return `${import.meta.env.BASE_URL}profile.jpg`;
    }
  });

  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (JPG, PNG, WebP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (dataUrl) {
        setAvatarUrl(dataUrl);
        setImageError(false);
        try {
          localStorage.setItem("redsec_profile_avatar", dataUrl);
        } catch (err) {
          console.warn("Storage quota exceeded", err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Synchronize across components if multiple avatars are rendered
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "redsec_profile_avatar" && e.newValue) {
        setAvatarUrl(e.newValue);
        setImageError(false);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (variant === "hero") {
    return (
      <div className={`hero-avatar-wrapper ${className}`}>
        <div
          className="hero-avatar-frame"
          onClick={() => fileInputRef.current?.click()}
          title="Click to upload/change profile picture"
          role="button"
          tabIndex={0}
        >
          {!imageError ? (
            <img
              src={avatarUrl}
              alt="HarshaVardhan Reddy"
              className="hero-avatar-img"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="hero-avatar-placeholder">
              <span className="hero-avatar-initials">HR</span>
            </div>
          )}

          {/* Cyber scanner overlay on hover */}
          <div className="avatar-hover-overlay">
            <Camera size={18} />
            <span>Upload</span>
          </div>

          <span className="hero-avatar-status" title="Status: Online / Lab Active" />
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>
    );
  }

  // Variant: "card" (For About Me or Identity Badge)
  return (
    <div className={`about-identity-card ${className}`}>
      <div
        className="identity-photo-frame"
        onClick={() => fileInputRef.current?.click()}
        title="Click to upload/change photo"
      >
        <div className="corner-bracket top-left" />
        <div className="corner-bracket top-right" />
        <div className="corner-bracket bottom-left" />
        <div className="corner-bracket bottom-right" />

        {!imageError ? (
          <img
            src={avatarUrl}
            alt="HarshaVardhan Reddy"
            className="identity-photo"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="identity-photo-fallback">
            <User size={48} className="fallback-user-icon" />
            <span>HarshaVardhan Reddy</span>
          </div>
        )}

        <div className="photo-scan-line" />

        <div className="photo-upload-hint">
          <Camera size={16} />
          <span>Change Photo</span>
        </div>
      </div>

      <div className="identity-details">
        <div className="identity-header">
          <span className="identity-clearance">SECURITY RESEARCHER</span>
          <span className="identity-id">ID: REDSEC-2024</span>
        </div>
        <h4>HarshaVardhan Reddy Thotla</h4>
        <p>Cybersecurity Student · Experience in Web & API Security </p>
        <div className="identity-badge-row">
          <span className="badge-item">
            <Shield size={12} /> AppSec
          </span>
          <span className="badge-item">PortSwigger Labs</span>
          <span className="badge-item status-live">
            <span className="pulse-dot" /> ACTIVE
          </span>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />
    </div>
  );
}
