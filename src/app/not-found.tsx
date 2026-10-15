import type { Metadata } from "next";
import Link from "next/link";
import {
  ActionArrow,
  ErrorScreen,
  primaryAction,
  secondaryAction,
} from "@/components/errors/ErrorScreen";

// Next adds its own <meta name="robots" content="noindex"> to every 404.
// `robots: null` drops the site-wide "index, follow" (metadata merges shallowly,
// so null replaces the root value) without emitting a second robots tag. No
// `alternates` either: the root layout sets no canonical, so the 404 has none.
export const metadata: Metadata = {
  title: "Page not found",
  robots: null,
};

export default function NotFound() {
  return (
    <ErrorScreen
      code="404"
      label="Page not found"
      title={["This page", "wandered off."]}
      actions={
        <>
          <Link href="/" className={primaryAction}>
            Back to home
            <ActionArrow />
          </Link>
          <Link href="/contact" className={secondaryAction}>
            Contact us
          </Link>
        </>
      }
    >
      <p>
        The page you&apos;re looking for doesn&apos;t exist or has moved. If a
        link on our site brought you here, let us know and we&apos;ll fix it.
      </p>
    </ErrorScreen>
  );
}
