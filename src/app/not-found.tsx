import Link from "next/link";

import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-96 flex-col items-center justify-start">
      <section className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h2 className="text-center text-2xl font-light">404: Page not found</h2>
        <Link href="/">
          <Button variant="default" size="lg">
            Return Home
          </Button>
        </Link>
      </section>
    </main>
  );
}
