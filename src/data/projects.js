// Replace sample content and metrics with your own verified project work.
export const projects = [
  {
    id: "apk-analysis",
    title: "Android APK Static Analysis",
    category: "Mobile Security",
    status: "In progress",
    level: "Beginner–Intermediate",
    tools: ["JADX", "Kali Linux", "Android Studio"],
    summary: "Inspect an Android package to understand its manifest, permissions, components and potential security weaknesses.",
    objective: "Perform a repeatable static review of an Android APK and document evidence-backed security observations.",
    workflow: ["Obtain an APK that you own or are authorized to assess.", "Decode and inspect the package using JADX.", "Review AndroidManifest.xml, permissions and exported components.", "Trace relevant code paths and validate observations.", "Write findings with impact, evidence and remediation."],
    results: ["Manifest and permission review", "Component inventory", "Evidence-backed findings report", "Remediation recommendations"],
    github: "",
    report: "",
    featured: true
  },
  {
    id: "api-testing",
    title: "PortSwigger Academy: API Testing Path",
    category: "API Security",
    status: "Completed",
    level: "Practitioner",
    tools: ["Burp Suite Pro/Community", "Burp Repeater", "Burp Intruder", "OpenAPI/Swagger", "OWASP API Top 10"],
    summary: "Successfully completed PortSwigger's API Testing learning path covering API endpoint reconnaissance, hidden HTTP methods, mass assignment, and server-side parameter pollution (SSPP).",
    objective: "Master discovery, analysis, and exploitation of REST and JSON-based API vulnerabilities in simulated production architectures.",
    workflow: [
      "API Documentation Discovery: Identified exposed OpenAPI/Swagger specifications and schema files to map undocumented endpoints.",
      "Hidden Endpoint & Method Discovery: Fuzzed endpoints and tested alternate HTTP verbs (GET, POST, PUT, DELETE, PATCH) to bypass authorization controls.",
      "Mass Assignment Exploitation: Manipulated JSON request bodies to tamper with hidden user properties (e.g., escalating role privileges to administrator).",
      "Server-Side Parameter Pollution (SSPP): Injected query string parameters into backend requests to bypass security logic and access restricted accounts.",
      "Remediation & Defense: Documented schema hardening, strict input allowlisting, parameter validation, and rate limiting mitigations."
    ],
    results: [
      "All PortSwigger API Testing path labs fully solved",
      "Exploited hidden administrative endpoints via HTTP verb tampering",
      "Privilege escalation achieved via Mass Assignment JSON tampering",
      "Bypassed server authorization logic using Server-Side Parameter Pollution",
      "Published reproducible methodology and remediation guide"
    ],
    github: "https://github.com/Mr-incognito1202",
    report: "",
    featured: true
  },
  {
    id: "web-security",
    title: "Web Application Security Lab",
    category: "Web Security",
    status: "Planned",
    level: "Beginner–Intermediate",
    tools: ["OWASP Juice Shop", "Burp Suite", "Browser DevTools"],
    summary: "Learn common web application weaknesses using a deliberately vulnerable application in a local lab.",
    objective: "Understand vulnerability causes, safe validation, impact and practical remediation.",
    workflow: ["Run OWASP Juice Shop locally.", "Select a learning objective and test case.", "Observe requests and responses.", "Validate the issue without accessing real user data.", "Record impact, evidence and remediation."],
    results: ["Lab notes", "Request/response evidence", "Vulnerability explanations", "Remediation checklist"],
    github: "",
    report: "",
    featured: false
  },
  {
    id: "network-recon",
    title: "Network Reconnaissance Lab",
    category: "Network Security",
    status: "Planned",
    level: "Beginner",
    tools: ["Nmap", "Kali Linux", "Linux"],
    summary: "Inventory hosts and exposed services in a private test network that you own or are authorized to scan.",
    objective: "Understand basic network discovery and service enumeration, then explain the security implications.",
    workflow: ["Create an isolated lab network.", "Identify the authorized target range.", "Perform host discovery and basic port scanning.", "Review service/version information.", "Summarize exposure and defensive recommendations."],
    results: ["Authorized asset inventory", "Open-port summary", "Service observations", "Hardening recommendations"],
    github: "",
    report: "",
    featured: false
  }
];

export const skills = [
  { group: "Security", items: ["PortSwigger API Security (Completed)", "OWASP API Top 10", "OWASP Web Top 10", "Mobile App Analysis (JADX)", "Vulnerability Reporting"] },
  { group: "Tools", items: ["Burp Suite (Repeater, Intruder)", "Kali Linux", "JADX Decompiler", "Postman", "Nmap"] },
  { group: "Development", items: ["RESTful APIs & JSON", "HTML & CSS", "JavaScript & React", "Python fundamentals"] },
  { group: "Foundations", items: ["Networking & Web Tech (Infosys Certified)", "HTTP/1.1 & HTTP/2", "API Authentication (JWT/OAuth)", "Linux Command Line", "Git & GitHub"] }
];