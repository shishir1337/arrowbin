"use client";

import dynamic from "next/dynamic";

/**
 * The service pages' bespoke client demos, one chunk each.
 *
 * All eight services share one route (`services/[slug]`), and a page's first
 * scripts include every client component its server code imports, rendered or
 * not. Imported statically, every service page shipped all eight signatures and
 * every widget (151 KB raw / 42 KB gz). Through `next/dynamic` each demo is its
 * own chunk, and a page only lists the chunks it actually renders.
 *
 * Load timing is unchanged on purpose: with SSR (the default) next/dynamic
 * server-renders the demo and adds a `<link rel="preload" as="script">` for its
 * chunk in <head>, so the browser fetches it alongside the page's other first
 * scripts, exactly when it fetched it before. No loading fallback and no
 * Suspense boundary, so the server HTML is the same as before.
 */

/* Signatures (section 02) */
export const OrderRace = dynamic(() =>
  import("../custom/OrderRace").then((m) => m.OrderRace),
);
export const FunnelSignature = dynamic(() =>
  import("../ecommerce/FunnelSignature").then((m) => m.FunnelSignature),
);
export const PhoneSignature = dynamic(() =>
  import("../mobile/PhoneSignature").then((m) => m.PhoneSignature),
);
export const ScaleSignature = dynamic(() =>
  import("../saas/ScaleSignature").then((m) => m.ScaleSignature),
);
export const FidelitySignature = dynamic(() =>
  import("../uiux/FidelitySignature").then((m) => m.FidelitySignature),
);
export const AgentSignature = dynamic(() =>
  import("../ai/AgentSignature").then((m) => m.AgentSignature),
);
export const PipelineSignature = dynamic(() =>
  import("../cloud/PipelineSignature").then((m) => m.PipelineSignature),
);
export const DecaySignature = dynamic(() =>
  import("../maintenance/DecaySignature").then((m) => m.DecaySignature),
);

/* Widgets further down each page */
export const StoreAnatomy = dynamic(() =>
  import("../ecommerce/StoreAnatomy").then((m) => m.StoreAnatomy),
);
export const PlanToggle = dynamic(() =>
  import("../saas/PlanToggle").then((m) => m.PlanToggle),
);
export const MvpScoper = dynamic(() =>
  import("../saas/MvpScoper").then((m) => m.MvpScoper),
);
export const UxAudit = dynamic(() =>
  import("../uiux/UxAudit").then((m) => m.UxAudit),
);
export const TokenPlayground = dynamic(() =>
  import("../uiux/TokenPlayground").then((m) => m.TokenPlayground),
);
export const GroundedChat = dynamic(() =>
  import("../ai/GroundedChat").then((m) => m.GroundedChat),
);
export const RoiCalculator = dynamic(() =>
  import("../ai/RoiCalculator").then((m) => m.RoiCalculator),
);
export const AutoscaleLive = dynamic(() =>
  import("../cloud/AutoscaleLive").then((m) => m.AutoscaleLive),
);
export const IncidentPlans = dynamic(() =>
  import("../maintenance/IncidentPlans").then((m) => m.IncidentPlans),
);
