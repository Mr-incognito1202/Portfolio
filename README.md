# REDSEC Cybersecurity Portfolio

A responsive React single-page portfolio starter with:
- Fixed desktop sidebar and mobile navigation drawer
- Smooth scrolling with URL hash navigation and browser back/forward support
- Searchable and filterable project cards
- Project case-study modal with objective, methodology and evidence checklist
- Safe simulated terminal
- Results dashboard placeholders (no fabricated metrics)
- Responsive layout and reduced-motion support

## Requirements
- Node.js 20.19+ or 22.12+
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## Personalize before publishing
1. Replace `[Your Name]` in `src/App.jsx`.
2. Update the email, GitHub and LinkedIn links in `src/App.jsx` and `src/components/Sidebar.jsx`.
3. Edit `src/data/projects.js`. Replace planned project content with your own completed work.
4. Add only verified outcomes and real evidence. Do not present template metrics as actual results.
5. Add certificate links and images in the certifications section.
6. Add your project screenshots under `public/images/` and link them from project data as you expand the UI.

## Safety and accuracy
The terminal is a local UI simulation. It does not execute shell commands, scan hosts or interact with external systems. Perform security testing only on systems you own or are explicitly authorized to assess.

## Deploy
You can deploy the `dist/` folder using a static host such as GitHub Pages, Netlify or Vercel. Configure the host for a Vite static site. Because this starter uses URL hash navigation, it does not require server-side route rewrites.
