import { db } from "../lib/prisma";

// Rendered on every request: each visit is recorded, which proves the database works.
export const dynamic = "force-dynamic";

export default async function Home() {
  await db().visit.create({ data: {} });
  const visits = await db().visit.count();
  return (
    <main>
      <h1>Hello from Next.js and Prisma!</h1>
      <p>This page has been visited {visits} times.</p>
      <p>
        Edit <code>app/page.tsx</code> and deploy again.
      </p>
    </main>
  );
}
