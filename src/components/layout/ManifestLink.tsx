"use client";

import { useEffect } from "react";

/**
 * Adds <link rel="manifest"> once the page has loaded. In the server-rendered
 * <head>, Chrome fetched the manifest at Medium priority straight after the
 * HTML, and PageSpeed counted it as a chain in "Network dependency tree".
 * Nothing needs it during load: browsers read it when someone installs the
 * site or adds it to their home screen. See src/app/manifest.webmanifest/route.ts.
 */
export function ManifestLink() {
  useEffect(() => {
    const add = () => {
      if (document.querySelector('link[rel="manifest"]')) return;
      const link = document.createElement("link");
      link.rel = "manifest";
      link.href = "/manifest.webmanifest";
      document.head.appendChild(link);
    };
    if (document.readyState === "complete") {
      add();
      return;
    }
    window.addEventListener("load", add, { once: true });
    return () => window.removeEventListener("load", add);
  }, []);
  return null;
}
