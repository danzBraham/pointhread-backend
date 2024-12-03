# Elysia with Bun runtime

## Getting Started

To get started with this template, simply paste this command into your terminal:

```bash
bun create elysia ./elysia-example
```

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

## Folder structure

```text
├── .husky/
├── node_modules/
├── prisma/
├── src/
│   ├── applications/
│   │   ├── services
│   │   │   └── user-service.ts
│   │   └── instance.ts
│   ├── infrastructure/
│   │   ├── interfaces
│   │   │   └── user-interface.ts
│   │   ├── repositories
│   │   │   └── user-repository.ts
│   │   ├── utils
│   │   │   └── prisma.ts
│   │   └── types.ts
│   ├── presentation/
│   │   ├── middlewares
│   │   │   └── auth-middleware.ts
│   │   └── router
│   │       └── user-router.ts
│   └── index.ts
├── .env
├── .gitignore
├── bun.lockb
├── commitlint.config.mjs
├── eslint.config.mjs
├── package.json
├── README.md
└── tsconfig.json
```
