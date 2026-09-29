"use client";

import { useEffect } from "react";
import "./globals.css";

/**
 * Last-resort fallback for errors in the root layout itself. It replaces the
 * whole layout, so it renders its own <html>/<body> and keeps to plain markup
 * (no header, fonts or motion that might be what failed).
 */
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="grid min-h-dvh place-items-center bg-frost px-6 text-ink">
        <title>Something went wrong | Arrowbin</title>
        <main className="max-w-lg text-center">
          <p className="label text-ink-2">(500) Something went wrong</p>
          <h1 className="mt-5 text-5xl font-black uppercase tracking-[-0.03em] sm:text-6xl">
            Something <span className="text-ultra">broke.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-2">
            An unexpected error happened on our end. Please try again, or email
            hello@arrowbin.com
            {error.digest ? ` and quote reference ${error.digest}` : ""}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => unstable_retry()}
              className="inline-flex h-12 cursor-pointer items-center rounded-full bg-ultra px-6 font-semibold text-white"
            >
              Try again
            </button>
            {/* A full page load, not a client transition: the app shell is what failed. */}
            <a
              href="/"
              className="inline-flex h-12 items-center rounded-full border border-ink/15 bg-white px-6 font-semibold text-ink"
            >
              Back to home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
