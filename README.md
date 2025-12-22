# Event Planner

Application web moderne de planification d'événements construite avec Next.js.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Langage**: TypeScript
- **Base de données**: PostgreSQL + Prisma
- **Authentification**: NextAuth.js (GitHub OAuth)
- **Validation**: Zod v4
- **Styling**: Tailwind CSS

## Installation

```bash
npm install
```

## Configuration

Créez un fichier `.env` à la racine :

```env
DATABASE_URL="postgresql://..."
GITHUB_ID="your_github_client_id"
GITHUB_SECRET="your_github_client_secret"
NEXTAUTH_SECRET="your_secret_key"
NEXTAUTH_URL="http://localhost:3000"
```

## Base de données

```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate dev
```

## Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Scripts

- `npm run dev` - Démarrer le serveur de développement
- `npm run build` - Construire pour la production
- `npm run start` - Démarrer le serveur de production
- `npm run lint` - Lancer le linter
