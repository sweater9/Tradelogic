# TradeLogic

Standalone reconstruction of the TradeLogic Base44 application as a portable Vite + React project.

## What is included

- Responsive trading command center
- Market setup scanner
- Structured `SCAN → ANALYZE → RESEARCH → RISK → PLAN` workflow
- Interactive setup selection
- Chart visualization with Recharts
- Pattern/trend/confidence/invalidation readout
- Trade thesis and risk framing panels
- Mobile navigation
- Local-first architecture with no Base44 runtime dependency

## Stack

- Vite
- React 18
- React Router
- Framer Motion
- Recharts
- Lucide React
- Zod-ready validation layer

The dependency fingerprint supplied from the original Base44 project was used to keep this reconstruction close to the original app family while removing managed Base44 coupling.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Reconstruction note

This repository is a clean-room reconstruction. It does not claim to contain Base44's proprietary platform source or private backend implementation. Features that require private Base44 entities, functions, authentication, storage, or secrets should be reconnected to an independent backend before production use.
