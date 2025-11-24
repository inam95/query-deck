# QueryDeck

**Repository:** [https://github.com/inam95/query-deck](https://github.com/inam95/query-deck)

QueryDeck is a modern web application designed to help developers practice and master technical interview questions. It consolidates interview resources into a single, polished platform with advanced filtering and sorting capabilities.

## Key Features

- **Advanced Filtering & Sorting**: Filter questions by difficulty, type, and search text. Sort by votes, title, or difficulty.
- **URL-Based State Management**: All filters and sorting preferences are synced with the URL using `nuqs`, making views easily shareable.
- **Performance & Accessibility**: Optimized for speed and accessibility. (See `lighthouse result.PNG` for performance metrics).
- **Responsive Design**: Fully responsive layout that works seamlessly on mobile and desktop.
- **Dark & Light Mode**: Built-in theme support.
- **Server Components First**: Optimized for performance and SEO using Next.js App Router.
- **Modern UI/UX**: Styled with Tailwind CSS and Shadcn UI, featuring smooth animations powered by Framer Motion.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [nuqs](https://github.com/47ng/nuqs) (URL state)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Deployment**: [Vercel](https://vercel.com/)

## Interesting Technical Decisions

- **URL as State Manager**: Instead of relying on global state stores, I used `nuqs` to manage state via URL search parameters. This ensures the UI is always in sync with the URL, enabling users to bookmark or share specific filtered views.
- **Server Components**: I adopted a Server Components first architecture. The question list is fetched and rendered on the server to reduce client-side JavaScript and improve load times.
- **Prisma & Postgres**: Chosen for robust type-safety and data integrity.

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js (v18+)
- Docker & Docker Compose (for the database)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/inam95/query-deck.git
    cd query-deck
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Set up Environment Variables**

    Create a `.env` file in the root directory:

    ```env
    DATABASE_URL="postgresql://postgres:password@localhost:5432/query_deck?schema=public"
    ```

4.  **Start the Database**

    ```bash
    docker-compose up -d
    ```

5.  **Setup the Database Schema**

    ```bash
    npx prisma db push
    ```

6.  **Import Data**

    Import the `questions.csv` file located in the root directory into your `question` table using your preferred database tool (e.g., pgAdmin, DBeaver, or TablePlus).

7.  **Run the Development Server**

    ```bash
    npm run dev
    # or
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000).

## Future Improvements

- **Question Detail Page**: Dedicated page for full problem descriptions and solutions.
- **Bookmarking System**: Allow users to save questions.
- **Mock Interview Generator**: Generate random question sets based on selected topics.

## Deployment

The application is deployed on Vercel: [https://query-deck.vercel.app/](https://query-deck.vercel.app/)
