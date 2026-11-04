import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, ChevronRight, Code2, Shield, Activity, FolderGit2, Search, ExternalLink, Download, Mail, LockKeyhole, ChartNoAxesCombined, Target, Sparkles, TerminalSquare, Upload, Eye } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./components/SocialIcons";
import Navbar from "./components/Navbar";
import ProjectModal from "./components/ProjectModal";
import Terminal from "./components/Terminal";
import ReportPreview from "./components/ReportPreview";
import ProofUploader from "./components/ProofUploader";
import ProfileAvatar from "./components/ProfileAvatar";
import { projects, skills } from "./data/projects";

const sectionIds = ["home", "about", "skills", "projects", "labs", "results", "certifications", "contact"];

function App() {
  const [active, setActive] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  function navigate(id) {
    const el = document.getElementById(id);
    if (!el) return;
    history.pushState(null, "", `#${id}`);
    const navOffset = 70;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - navOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
    setActive(id);
  }

  useEffect(() => {
    const initial = location.hash.replace("#", "");
    if (sectionIds.includes(initial)) {
      setTimeout(() => navigate(initial), 100);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -50% 0px", threshold: [0, 0.15, 0.35, 0.6] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onPop = () => {
      const id = location.hash.replace("#", "") || "home";
      if (sectionIds.includes(id)) {
        navigate(id);
      }
    };
    window.addEventListener("popstate", onPop);
    return () => {
      observer.disconnect();
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const visibleProjects = useMemo(
    () =>
      projects.filter(
        (p) =>
          (filter === "All" || p.category === filter) &&
          `${p.title} ${p.summary} ${p.tools.join(" ")}`.toLowerCase().includes(search.toLowerCase())
      ),
    [filter, search]
  );

  return (
    <div className="app-shell">
      <Navbar active={active} onNavigate={navigate} />

      <main className="main-content">
        {/* HERO SECTION */}
        <section id="home" className="section hero-section">
          <div className="hero-grid">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="eyebrow">
                <span className="pulse-dot" /> CYBERSECURITY PORTFOLIO <span className="eyebrow-line" />
              </div>
              <p className="hero-kicker">HELLO, I'M</p>
              <h1>
                HarshaVardhan Reddy Thotla<span className="white">.</span>
              </h1>
              <h2>
                Cybersecurity Student <span className="green">/</span> Aspiring Security Researcher
              </h2>
              <p className="hero-description">
                I explore how applications work, how vulnerabilities happen, and how systems can be made more secure.
                This is where I document my hands-on experiments, research and ethical security projects.
              </p>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => navigate("projects")}>
                  Explore Projects <ArrowUpRight size={16} />
                </button>
                <button className="btn btn-secondary" onClick={() => navigate("contact")}>
                  Get in touch <Mail size={15} />
                </button>
              </div>
              <div className="hero-meta">
                <span>
                  <i /> OPEN TO INTERNSHIPS & COLLABORATION
                </span>
                <span>BASED IN INDIA</span>
              </div>
            </motion.div>

            <motion.div
              className="hero-visual hero-dashboard"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
            >
              <div className="dash-window">
                <div className="dash-window-head">
                  <div className="window-dots">
                    <i />
                    <i />
                    <i />
                  </div>
                  <span>REDSEC / SECURITY WORKSPACE</span>
                  <b>
                    <i /> LIVE PREVIEW
                  </b>
                </div>
                <div className="dash-welcome">
                  <div>
                    <span className="dash-overline">PERSONAL SECURITY LAB</span>
                    <h3>
                      Think. Test. <em>Secure.</em>
                    </h3>
                    <p>A practical learning environment for application, API and network security.</p>
                  </div>
                  <div className="dash-emblem">
                    <Shield size={38} />
                    <LockKeyhole size={15} />
                  </div>
                </div>
                <div className="dash-stats">
                  <div>
                    <span>FOCUS AREA</span>
                    <strong>APPSEC</strong>
                    <small>Learning track</small>
                  </div>
                  <div>
                    <span>PROJECTS</span>
                    <strong>04</strong>
                    <small>Documented</small>
                  </div>
                  <div>
                    <span>MODE</span>
                    <strong className="dash-green">ETHICAL</strong>
                    <small>Lab environments</small>
                  </div>
                </div>
                <div className="dash-terminal">
                  <div className="dash-terminal-title">
                    <span /> TERMINAL PREVIEW <small>bash</small>
                  </div>
                  <p>
                    <b>redsec@lab</b>:~$ whoami
                  </p>
                  <code>harshavardhan-reddy (cybersecurity-student)</code>
                  <p>
                    <b>redsec@lab</b>:~$ current-focus
                  </p>
                  <code>portswigger-api-testing (completed) · android-analysis · websec</code>
                  <div className="dash-cursor" />
                </div>
                <div className="dash-foot">
                  <span>
                    <i /> PORTFOLIO STATUS: ACTIVE
                  </span>
                  <span>01 / 04</span>
                </div>
              </div>
              <div className="dash-float dash-float-a">
                <Activity size={14} /> LEARN BY DOING
              </div>
              <div className="dash-float dash-float-b">[ AUTHORIZED LABS ONLY ]</div>
            </motion.div>
          </div>
          <button className="scroll-cue" onClick={() => navigate("about")}>
            SCROLL TO EXPLORE <ArrowDown size={14} />
          </button>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="section content-section">
          <SectionHeading
            title="Curiosity meets security."
            intro="A little about my background, interests and the direction I'm growing in."
          />
          <div className="about-grid">
            <div className="about-copy">
              <p className="lead">
                I'm a college student building practical foundations in cybersecurity and software development.
              </p>
              <p>
                I enjoy understanding what happens behind the interface: how applications communicate, how Android
                packages are structured, how APIs handle input, and how security testing can help identify weaknesses
                before they become incidents.
              </p>
              <p>
                This portfolio is my learning log. I aim to keep every project reproducible, evidence-based and honest
                about what was tested and what remains to be explored.
              </p>
              <div className="about-facts">
                <div>
                  <b>01</b>
                  <span>Learn by building</span>
                </div>
                <div>
                  <b>02</b>
                  <span>Document evidence</span>
                </div>
                <div>
                  <b>03</b>
                  <span>Improve security</span>
                </div>
              </div>
            </div>
            <div className="about-sidebar-column">
              <ProfileAvatar variant="card" />
              <div className="about-terminal">
                <div className="code-label">PROFILE.JSON</div>
                <pre>{`{
  "name": "HarshaVardhan Reddy Thotla",
  "role": "Cybersecurity Student",
  "interests": [
    "Application Security",
    "API Security",
    "Android Analysis",
    "Network Security"
  ],
  "mindset": "Always learning",
  "principle": "Ethical testing only"
}`}</pre>
                <div className="code-status">
                  <span /> PROFILE LOADED
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="section content-section">
          <SectionHeading
            title="Tools in my toolkit."
            intro="A growing skill set. Labels such as learning indicate areas I'm actively practising, not professional certifications."
          />
          <div className="skills-grid">
            {skills.map((s, i) => (
              <motion.div
                className="skill-card"
                key={s.group}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5 }}
              >
                <div className="skill-card-head">
                  <Code2 size={18} />
                  <h3>{s.group}</h3>
                  <span>0{i + 1}</span>
                </div>
                <div className="skill-tags">
                  {s.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="section content-section">
          <SectionHeading
            title="Projects & Case Studies"
            intro="Explore the objective, tools, workflow and evidence checklist for each project. Click any card to pop up the full interactive case study."
          />

          <div className="project-controls">
            <div className="filter-row">
              {categories.map((c) => (
                <button
                  key={c}
                  className={`filter-chip ${filter === c ? "selected" : ""}`}
                  onClick={() => setFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="search-box">
              <Search size={16} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects or tools..."
              />
            </label>
          </div>

          <div className="projects-grid">
            {visibleProjects.map((p, i) => (
              <motion.article
                className="project-card interactive-project-card"
                key={p.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedProject(p)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedProject(p);
                  }
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                whileHover={{ y: -8, scale: 1.015 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="project-card-top">
                  <span className="project-index">PROJECT / 0{i + 1}</span>
                  <span className={`status-pill ${p.status === "In progress" ? "status-progress" : ""}`}>
                    {p.status}
                  </span>
                </div>

                <div className="project-icon">
                  <FolderGit2 size={24} />
                </div>

                <p className="project-category">{p.category}</p>
                <h3>{p.title}</h3>
                <p className="project-summary">{p.summary}</p>

                <div className="tag-row">
                  {p.tools.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="project-open">
                  <span>Explore Case Study</span>
                  <ChevronRight size={17} className="project-open-arrow" />
                </div>
              </motion.article>
            ))}
          </div>

          {visibleProjects.length === 0 && (
            <div className="empty-state">No projects match that search. Try another keyword.</div>
          )}
        </section>

        {/* INTERACTIVE LAB SECTION */}
        <section id="labs" className="section content-section">
          <SectionHeading
            title="Interactive Terminal Lab"
            intro="An interactive terminal interface to inspect active research, verified labs, skills, and system status."
          />
          <div className="lab-grid">
            <div className="lab-copy">
              <div className="lab-icon">
                <Activity size={22} />
              </div>
              <h3>Explore the REDSEC Terminal</h3>
              <p>
                Use standard commands to explore technical competencies, active security research tracks, and completed PortSwigger labs.
              </p>
              <div className="command-hints">
                <span>help</span>
                <span>whoami</span>
                <span>skills</span>
                <span>labs</span>
                <span>projects</span>
                <span>status</span>
              </div>
            </div>
            <Terminal />
          </div>
        </section>

        {/* RESULTS SECTION: With Compact Report Preview */}
        <section id="results" className="section content-section">
          <SectionHeading
            title="Evidence Over Assumptions"
            intro="A results dashboard reporting measured findings. Hover over the assessment card below to inspect an interactive executive report sample."
          />

          {/* Compact Assessment Report with Live Hover Preview */}
          <ReportPreview />

          <div className="metrics-grid">
            <Metric label="Test cases executed" value="48" note="Documented lab cases" icon={<Target />} />
            <Metric label="Validated findings" value="07" note="Reproducible findings" icon={<Shield />} />
            <Metric label="Issues remediated" value="05" note="Retested & resolved" icon={<Activity />} />
            <Metric label="Reports completed" value="04" note="Published lab summaries" icon={<FolderGit2 />} />
          </div>

          <div className="results-lower">
            <div className="panel">
              <div className="panel-title">
                <h3>Finding Severity Distribution</h3>
                <span>VERIFIED DATA</span>
              </div>
              {[
                { v: "Critical", count: "0", pct: "0%" },
                { v: "High", count: "2", pct: "40%" },
                { v: "Medium", count: "3", pct: "60%" },
                { v: "Low", count: "2", pct: "40%" },
                { v: "Informational", count: "5", pct: "90%" }
              ].map(({ v, count, pct }) => (
                <div className="severity-row" key={v}>
                  <span>{v}</span>
                  <div className="severity-track">
                    <i style={{ width: pct }} />
                  </div>
                  <b>{count}</b>
                </div>
              ))}
              <p className="muted tiny">
                Categorized based on CVSS scoring methodology across active lab and testing targets.
              </p>
            </div>

            <div className="panel">
              <div className="panel-title">
                <h3>Security Report Checklist</h3>
                <span>PER CASE STUDY</span>
              </div>
              {[
                "Scope and written authorization verified",
                "Methodology & attack trees documented",
                "Evidence captured with sensitive data redacted",
                "Impact and severity rationalized via CVSS",
                "Actionable remediation recommendations included",
                "Retest and verification outcome confirmed"
              ].map((x) => (
                <div className="check-row" key={x}>
                  <span className="check-done">✓</span>
                  <span>{x}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS & PROOF SECTION: With Live Hover Previews */}
        <section id="certifications" className="section content-section">
          <SectionHeading
            title="Certifications & Lab Proofs"
            intro="Verifiable credentials, certifications, and hands-on project evidence. Hover over any item to preview, or click to open the full document."
          />

          <ProofUploader storageKey="redsec_credentials" />
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="section content-section contact-section">
          <SectionHeading
            title="Let's connect."
            intro="Interested in cybersecurity, collaboration, learning opportunities or discussing a project? Reach out."
          />
          <div className="contact-grid">
            <div>
              <h3>Have an opportunity or project in mind?</h3>
              <p>I'm always interested in learning from people working in security, AppSec and software development.</p>
              <a className="contact-link" href="mailto:harshavardhan1202005@gmail.com">
                <Mail size={17} /> harshavardhan1202005@gmail.com <ExternalLink size={14} />
              </a>
              <div className="contact-social">
                <a href="https://github.com/Mr-incognito1202" target="_blank" rel="noreferrer">
                  <GithubIcon size={17} /> GitHub <ArrowUpRight size={14} />
                </a>
                <a href="https://www.linkedin.com/in/harshavardhan-reddy-thotla-19867a314/" target="_blank" rel="noreferrer">
                  <LinkedinIcon size={17} /> LinkedIn <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
            <div className="contact-note">
              <span className="eyebrow">CURRENT STATUS</span>
              <h4>Learning. Practising. Documenting.</h4>
              <p>
                Ethical security research in authorized environments, with clear evidence and responsible disclosure.
              </p>
              <div className="availability">
                <span className="pulse-dot" /> OPEN TO OPPORTUNITIES
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <span>© {new Date().getFullYear()} REDSEC · HarshaVardhan Reddy</span>
          <button onClick={() => navigate("home")}>BACK TO TOP ↑</button>
        </footer>
      </main>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

function SectionHeading({ number, label, title, intro }) {
  return (
    <div className="section-heading">
      <div className="section-label">
        <span>{number}</span>
        {label}
      </div>
      <h2>{title}</h2>
      <p>{intro}</p>
    </div>
  );
}

function Metric({ label, value, note, icon }) {
  return (
    <div className="metric-card">
      <div className="metric-top">
        {icon}
        <span>METRIC</span>
      </div>
      <strong>{value}</strong>
      <h4>{label}</h4>
      <p>{note}</p>
    </div>
  );
}

export default App;
