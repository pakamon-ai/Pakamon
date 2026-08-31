# PROJECT BLUEPRINT — AI ผู้รับบริการเสมือนเพื่อฝึกวิเคราะห์ธาตุเจ้าเรือน

## Architecture Decision Record (ADR) — Deployment Strategy

- **Hosting**: Netlify
- **Deployment Type**: Static/client-side web application
- **Backend**: None
- **Database**: None
- **Authentication**: None
- **External AI/API dependency**: None
- **Client Storage**: Browser `localStorage` for current session attempt persistence
- **Build Tool**: Vite (React 19 + TypeScript + Tailwind CSS)
- **Output Directory**: `dist`
