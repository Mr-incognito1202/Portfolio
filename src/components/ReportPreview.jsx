import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ShieldAlert, CheckCircle2, Eye, ExternalLink, Sparkles, ChevronRight, Download } from "lucide-react";

export default function ReportPreview() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="report-preview-container">
      {/* Compact Interactive Assessment Report Trigger */}
      <motion.div
        className={`report-banner-compact ${hovered ? "is-hovered" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setHovered((prev) => !prev)}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div className="report-banner-left">
          <div className="report-icon-box">
            <FileText size={22} />
          </div>
          <div className="report-banner-text">
            <div className="report-badge-row">
              <span className="eyebrow">ASSESSMENT REPORTING</span>
              <span className="report-status-tag">
                <i /> HOVER TO PREVIEW REPORT
              </span>
            </div>
            <h4>Vulnerability Assessment & Findings Summary</h4>
            <p>Measurable test scopes, reproducible steps, risk severity and verified remediation logs.</p>
          </div>
        </div>

        <div className="report-banner-right">
          <span className="preview-cue-btn">
            <Eye size={15} />
            <span>{hovered ? "Viewing Preview" : "Hover to Preview"}</span>
            <ChevronRight size={14} className={hovered ? "rotated" : ""} />
          </span>
        </div>
      </motion.div>

      {/* Hover Popup / Unfold Preview Panel */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="report-popup-preview"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="preview-top-bar">
              <div className="preview-header-tags">
                <span className="doc-type">SECURITY REPORT SAMPLE</span>
                <span className="doc-id">REF: REDSEC-VAPT-2024-01</span>
              </div>
              <span className="audit-status-badge">
                <CheckCircle2 size={13} /> VERIFIED LAB AUDIT
              </span>
            </div>

            <div className="preview-body-grid">
              <div className="preview-meta-block">
                <h5>Scope & Target Environment</h5>
                <p>
                  <strong>Target:</strong> Android APK Static Review & REST API Authentication Endpoints
                </p>
                <p>
                  <strong>Methodology:</strong> OWASP Top 10 + OWASP Mobile Security Testing Guide (MSTG)
                </p>
                <p>
                  <strong>Auditor:</strong> HarshaVardhan Reddy (Ethical Lab Simulation)
                </p>
              </div>

              <div className="preview-findings-block">
                <h5>Executive Vulnerability Breakdown</h5>
                <div className="findings-bars">
                  <div className="finding-row high">
                    <span className="f-severity">HIGH</span>
                    <span className="f-title">Exported Activity without Intent Filter Protection</span>
                    <span className="f-status">Remediated</span>
                  </div>
                  <div className="finding-row medium">
                    <span className="f-severity">MED</span>
                    <span className="f-title">Permissive CORS & Missing Token Expiration</span>
                    <span className="f-status">Validated</span>
                  </div>
                  <div className="finding-row low">
                    <span className="f-severity">LOW</span>
                    <span className="f-title">Server Banner Disclosure (Apache 2.4.52)</span>
                    <span className="f-status">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="preview-footer-note">
              <span>* Interactive preview of standardized reporting methodology. Replace with verified client/lab deliverables.</span>
              <span className="preview-rating">SECURITY SCORE: <strong>A- (88/100)</strong></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
