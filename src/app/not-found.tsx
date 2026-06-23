import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="py-28 sm:py-36">
      <Container className="text-center">
        <p className="font-display text-7xl font-bold text-accent sm:text-8xl">
          404
        </p>
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
          This page wandered off
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">
          The page you're looking for doesn't exist or may have moved. Let's get
          you back on track.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg" icon="arrow-right">
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
