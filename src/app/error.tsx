"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  ActionArrow,
  ErrorScreen,
  primaryAction,
  secondaryAction,
} from "@/components/errors/ErrorScreen";
import { site } from "@/lib/site";

/**
 * Error boundary for every route segment: a branded fallback instead of a
 * blank page. `unstable_retry` re-fetches and re-renders the segment, so it
 * also recovers from Server Component errors (unlike `reset`).
 */
export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Surface the error in dev/monitoring; the digest links to server logs in prod.
    console.error(error);
  }, [error]);

  return (
    <ErrorScreen
      code="500"
      label="Something went wrong"
      title={["Something", "broke."]}
      actions={
        <>
          <button
            type="button"
            onClick={() => unstable_retry()}
            className={primaryAction}
          >
            Try again
            <ActionArrow />
          </button>
          <Link href="/" className={secondaryAction}>
            Back to home
          </Link>
        </>
      }
      note={
        error.digest ? (
          <>
            If it keeps happening, email{" "}
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(`Website error ${error.digest}`)}`}
              className="font-semibold text-ultra underline decoration-2 underline-offset-4"
            >
              {site.email}
            </a>{" "}
            and quote reference{" "}
            <code className="rounded-md bg-white px-1.5 py-0.5 font-mono text-ink ring-1 ring-ink/10">
              {error.digest}
            </code>
            .
          </>
        ) : null
      }
    >
      <p>
        An unexpected error happened on our end. Please try again, and if it
        keeps happening, get in touch and we&apos;ll sort it out.
      </p>
    </ErrorScreen>
  );
}
