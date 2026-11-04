import { useState } from "react";
import { Terminal as TerminalIcon, Play, RotateCcw } from "lucide-react";

const commands = {
  help: "Available commands: help, whoami, skills, projects, labs, status, clear",
  whoami: "harshavardhan-reddy@redsec — Cybersecurity Student & Security Researcher",
  skills: "Core proficiencies: PortSwigger API Testing (Completed) • Burp Suite • OWASP Top 10 • Android Static Review (JADX) • Linux",
  projects: "Featured: PortSwigger API Testing Path [COMPLETED] • Android APK Static Analysis • Network Recon",
  labs: "PortSwigger Web Security Academy: API Testing Path [COMPLETED]\n✓ Finding API Documentation (OpenAPI/Swagger)\n✓ Exploiting Hidden API Endpoints\n✓ Exploiting Server-Side Parameter Pollution (SSPP)\n✓ Privilege Escalation via Mass Assignment",
  status: "Portfolio status: ONLINE\nMode: ACTIVE INTERFACE\nTarget: PortSwigger Academy & Authorized Labs"
};

export default function Terminal() {
  const [value, setValue] = useState("help");
  const [history, setHistory] = useState([
    { command: "welcome", output: "Welcome to REDSEC Terminal. Type 'help' to begin." }
  ]);

  function run(e) {
    e.preventDefault();
    const cmd = value.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") {
      setHistory([]);
    } else {
      setHistory((h) => [
        ...h,
        {
          command: cmd,
          output: commands[cmd] || `Command not found: ${cmd}. Type 'help' for available commands.`
        }
      ]);
    }
    setValue("");
  }

  return (
    <div className="terminal">
      <div className="terminal-head">
        <div className="window-dots">
          <i />
          <i />
          <i />
        </div>
        <span>
          <TerminalIcon size={14} /> REDSEC // TERMINAL
        </span>
        <span className="terminal-live">ONLINE</span>
      </div>
      <div className="terminal-body">
        {history.map((h, i) => (
          <div className="terminal-entry" key={i}>
            <div className="terminal-prompt">
              visitor@redsec:~$ <b>{h.command}</b>
            </div>
            <pre>{h.output}</pre>
          </div>
        ))}
        <form className="terminal-form" onSubmit={run}>
          <label htmlFor="terminal-command">visitor@redsec:~$</label>
          <input
            id="terminal-command"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="type help..."
            autoComplete="off"
          />
          <button aria-label="Run command">
            <Play size={14} />
          </button>
          <button
            type="button"
            className="terminal-clear"
            aria-label="Clear terminal"
            onClick={() => setHistory([])}
          >
            <RotateCcw size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
