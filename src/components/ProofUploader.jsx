import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Image as ImageIcon, Eye, CheckCircle2, X, Download, ShieldCheck, ExternalLink } from "lucide-react";

// Default credentials & verifiable project proofs
const DEFAULT_DOCUMENTS = [
  {
    id: "cert-infosys-networking",
    title: "Networking and Web Technology",
    issuer: "Infosys Springboard",
    recipient: "THOTLA. HARSHA VARDHAN REDDY",
    category: "Course Completion Certificate",
    date: "Dec 2024",
    type: "image",
    size: "80 KB",
    verified: true,
    description: "Official certificate awarded by Infosys Springboard for successfully completing the Networking and Web Technology course on December 7, 2024.",
    previewUrl: `${import.meta.env.BASE_URL}certificates/infosys-networking-web-tech.jpg`,
    verifyUrl: "https://verify.onwingspan.com",
  },
  {
    id: "cert-portswigger-api",
    title: "PortSwigger: API Testing Learning Path",
    issuer: "PortSwigger Web Security Academy",
    category: "Verified Lab Path",
    date: "Completed",
    type: "image",
    size: "1.6 MB",
    verified: true,
    description: "Completed all practical labs in PortSwigger's API Testing track: OpenAPI/Swagger reconnaissance, hidden endpoint discovery, server-side parameter pollution (SSPP), and mass assignment exploitation.",
    previewUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cert-android-lab",
    title: "Android APK Static Analysis Evidence",
    issuer: "REDSEC Research Lab",
    category: "Lab Audit Proof",
    date: "2024",
    type: "image",
    size: "840 KB",
    verified: true,
    description: "Verified decompilation log, exported activities security review, and JADX bytecode verification.",
    previewUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cert-google-cyber",
    title: "Google Cybersecurity Certificate",
    issuer: "Google / Coursera",
    category: "Professional Certificate",
    date: "2024",
    type: "image",
    size: "1.2 MB",
    verified: true,
    description: "Hands-on training in network defense, Linux security, SQL, Python automation, and SIEM security analysis.",
    previewUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  }
];

export default function ProofUploader({ storageKey = "redsec_proofs", compact = false }) {
  const [documents] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (storageKey === "redsec_credentials") {
          // Ensure real Infosys cert is present at the front
          const filtered = parsed.filter((d) => d.id !== "cert-infosys-networking");
          return [DEFAULT_DOCUMENTS[0], ...filtered];
        }
        return parsed.length > 0 ? parsed : DEFAULT_DOCUMENTS;
      }
    } catch (e) {
      console.warn("Could not load from localStorage", e);
    }
    return DEFAULT_DOCUMENTS;
  });

  const [activeHoverId, setActiveHoverId] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <div className={`proof-uploader-section ${compact ? "compact-mode" : ""}`}>
      {/* Grid of Credentials and Proofs with Hover Previews */}
      <div className="proof-grid">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="proof-card-container"
            onMouseEnter={() => setActiveHoverId(doc.id)}
            onMouseLeave={() => setActiveHoverId(null)}
          >
            <div
              className={`proof-card ${activeHoverId === doc.id ? "hover-active" : ""}`}
              onClick={() => setSelectedDoc(doc)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedDoc(doc);
              }}
            >
              <div className="proof-card-header">
                <div className="proof-icon-badge">
                  {doc.type === "image" ? <ImageIcon size={18} /> : <FileText size={18} />}
                </div>
                <div className="proof-status-pill">
                  <CheckCircle2 size={12} />
                  <span>{doc.verified ? "VERIFIED" : "PROOF"}</span>
                </div>
              </div>

              <div className="proof-card-body">
                <span className="proof-category">{doc.category}</span>
                <h4 className="proof-title">{doc.title}</h4>
                <p className="proof-issuer">{doc.issuer}</p>
              </div>

              <div className="proof-card-footer">
                <span className="proof-meta-tag">{doc.date}</span>
                <span className="proof-meta-size">{doc.size}</span>
                <span className="proof-view-cue">
                  <Eye size={13} /> Preview
                </span>
              </div>
            </div>

            {/* LIVE HOVER PREVIEW POPUP */}
            <AnimatePresence>
              {activeHoverId === doc.id && (
                <motion.div
                  className="proof-hover-preview"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                >
                  <div className="hover-preview-head">
                    <span className="hover-preview-title">
                      <ShieldCheck size={13} /> {doc.title}
                    </span>
                    <span className="hover-preview-size">{doc.size}</span>
                  </div>

                  {/* Visual Preview Box */}
                  <div className="hover-preview-viewport">
                    {doc.type === "image" && doc.previewUrl ? (
                      <img src={doc.previewUrl} alt={doc.title} className="hover-preview-img" />
                    ) : (
                      <div className="pdf-doc-mockup">
                        <FileText size={38} className="pdf-mockup-icon" />
                        <strong>DOCUMENT PROOF</strong>
                        <span>{doc.title}</span>
                        <small>Click card to open document reader</small>
                      </div>
                    )}
                  </div>

                  <p className="hover-preview-desc">{doc.description}</p>
                  <div className="hover-preview-foot">
                    <span>Issued: {doc.date}</span>
                    <b>CLICK CARD TO VIEW FULL PROOF →</b>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* FULL LIGHTBOX VIEWER MODAL */}
      <AnimatePresence>
        {selectedDoc && (
          <div className="lightbox-wrapper" onClick={() => setSelectedDoc(null)}>
            <motion.div
              className="lightbox-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="lightbox-dialog"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightbox-head">
                <div>
                  <span className="eyebrow">VERIFIED CREDENTIAL INSPECTION</span>
                  <h3>{selectedDoc.title}</h3>
                  <small>{selectedDoc.issuer} · {selectedDoc.date} · {selectedDoc.size}</small>
                </div>
                <button
                  className="icon-btn lightbox-close"
                  onClick={() => setSelectedDoc(null)}
                  aria-label="Close viewer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="lightbox-content">
                {selectedDoc.type === "image" && (selectedDoc.previewUrl || selectedDoc.rawUrl) ? (
                  <img
                    src={selectedDoc.previewUrl || selectedDoc.rawUrl}
                    alt={selectedDoc.title}
                    className="lightbox-img"
                  />
                ) : (
                  <div className="lightbox-doc-view">
                    <FileText size={56} className="pdf-mockup-icon" />
                    <h4>{selectedDoc.title}</h4>
                    <p>{selectedDoc.description}</p>
                    <div className="lightbox-doc-status">
                      <CheckCircle2 size={16} /> Cryptographically verified security lab proof
                    </div>
                  </div>
                )}
              </div>

              <div className="lightbox-foot">
                <p className="lightbox-desc">{selectedDoc.description}</p>
                <div className="lightbox-actions">
                  {selectedDoc.verifyUrl && (
                    <a
                      className="btn btn-secondary"
                      href={selectedDoc.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink size={14} /> Verify on Wingspan
                    </a>
                  )}
                  {(selectedDoc.previewUrl || selectedDoc.rawUrl) && (
                    <a
                      className="btn btn-secondary"
                      href={selectedDoc.previewUrl || selectedDoc.rawUrl}
                      download={`${selectedDoc.title}.${selectedDoc.type === "image" ? "jpg" : "pdf"}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Download size={14} /> Download Certificate
                    </a>
                  )}
                  <button className="btn btn-primary" onClick={() => setSelectedDoc(null)}>
                    Done Viewing
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
