"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Global error boundary. Catches uncaught render errors in any route segment and
 * shows a branded fallback instead of a blank page. `reset` re-renders the segment.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error in dev/monitoring; the digest links to server logs in prod.
    console.error(error);
  }, [error]);

  return (
    <section className="py-28 sm:py-36">
      <Container className="text-center">
        <p className="font-display text-7xl font-bold text-accent sm:text-8xl">
          500
        </p>
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
          Something went wrong
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">
          An unexpected error occurred on our end. Please try again — and if it
          keeps happening, get in touch and we'll sort it out.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" icon="arrow-right" onClick={reset}>
            Try again
          </Button>
          <ButtonLink href="/contact" size="lg" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
