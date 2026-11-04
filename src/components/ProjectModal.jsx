import { useEffect } from "react";
import { X, ExternalLink, Github, FileText, CheckCircle2, ListChecks, Target, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProofUploader from "./ProofUploader";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="modal-wrapper">
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="modal-dialog-container" onClick={onClose}>
            <motion.div
              className="project-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: "spring", damping: 26, stiffness: 360 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-top">
                <div className="modal-badge-group">
                  <span className="eyebrow">CASE STUDY</span>
                  <span className="status-pill status-progress">{project.category}</span>
                </div>
                <button className="icon-btn modal-close-btn" onClick={onClose} aria-label="Close project">
                  <X size={18} />
                </button>
              </div>

              <h2 id="modal-title">{project.title}</h2>
              <p className="modal-summary">{project.summary}</p>

              <div className="tag-row">
                {project.tools.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>

              <div className="modal-section">
                <h3><Target size={16} /> Project Objective</h3>
                <p>{project.objective}</p>
              </div>

              <div className="modal-section">
                <h3><ListChecks size={16} /> Methodology & Execution Workflow</h3>
                <ol className="workflow">
                  {project.workflow.map((step, i) => (
                    <li key={step}>
                      <b>{String(i + 1).padStart(2, "0")}</b>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="modal-section">
                <h3><CheckCircle2 size={16} /> Key Deliverables & Evidence</h3>
                <div className="result-list">
                  {project.results.map((r) => (
                    <div key={r}>
                      <CheckCircle2 size={15} />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
                <p className="muted tiny">
                  Evidence-backed methodology designed for authorized lab environments and reproducible security findings.
                </p>
              </div>

              {/* Verified Proof / Evidence for this specific Case Study */}
              <div className="modal-section">
                <h3><ShieldCheck size={16} /> Project Proof & Artifacts</h3>
                <p className="muted tiny" style={{ marginBottom: "12px" }}>
                  Verified lab artifacts and evidence files. Hover over items to preview.
                </p>
                <ProofUploader storageKey={`redsec_case_proofs_${project.id}`} compact={true} />
              </div>

              <div className="modal-actions">
                {project.github ? (
                  <a className="btn btn-secondary" href={project.github} target="_blank" rel="noreferrer">
                    <Github size={15} /> Source Code <ExternalLink size={13} />
                  </a>
                ) : (
                  <span className="btn btn-disabled">
                    <Github size={15} /> Repository Private / In Lab
                  </span>
                )}
                {project.report ? (
                  <a className="btn btn-primary" href={project.report} target="_blank" rel="noreferrer">
                    <FileText size={15} /> Full Report <ExternalLink size={13} />
                  </a>
                ) : (
                  <span className="btn btn-disabled">
                    <FileText size={15} /> Report Documentation Pending
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
