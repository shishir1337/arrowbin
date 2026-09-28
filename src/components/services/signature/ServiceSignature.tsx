import { AgentSignature } from "../ai/AgentSignature";
import { PipelineSignature } from "../cloud/PipelineSignature";
import { OrderRace } from "../custom/OrderRace";
import { FunnelSignature } from "../ecommerce/FunnelSignature";
import { DecaySignature } from "../maintenance/DecaySignature";
import { PhoneSignature } from "../mobile/PhoneSignature";
import { ScaleSignature } from "../saas/ScaleSignature";
import { FidelitySignature } from "../uiux/FidelitySignature";
import { SignatureFrame } from "./SignatureFrame";

/**
 * Each service's bespoke showpiece. Returns null for services whose signature
 * is not built yet, so the page never renders an empty shell.
 */
export function ServiceSignature({
  slug,
  label,
}: {
  slug: string;
  label: string;
}) {
  switch (slug) {
    case "custom-software-development":
      return (
        <SignatureFrame
          label={label}
          kicker="The difference"
          title="One order, two ways"
          intro="The same customer order, handled the way most teams do it today and by a system built around your workflow. Watch the race, then plug in your own numbers."
        >
          <OrderRace />
        </SignatureFrame>
      );
    case "ecommerce-development":
      return (
        <SignatureFrame
          label={label}
          kicker="Where sales leak"
          title="Turn more visitors into orders"
          intro="Most stores don't need more traffic; they lose buyers along the way. Switch on the fixes we build in and watch where the extra orders come from."
        >
          <FunnelSignature />
        </SignatureFrame>
      );
    case "mobile-app-development":
      return (
        <SignatureFrame
          label={label}
          kicker="One codebase"
          title="One app, feels native on both"
          intro="Swipe through a sample app, then flip between iOS and Android. It's the same code; the platform details adapt so it feels at home on either."
        >
          <PhoneSignature />
        </SignatureFrame>
      );
    case "saas-product-engineering":
      return (
        <SignatureFrame
          label={label}
          kicker="Built to scale"
          title="From 10 customers to 10,000"
          intro="Shortcuts feel fast until the product takes off. Drag the customer count up and compare a quick build with one designed to scale from day one."
        >
          <ScaleSignature />
        </SignatureFrame>
      );
    case "ui-ux-design":
      return (
        <SignatureFrame
          label={label}
          kicker="Wireframe to final"
          title="Structure first, then the polish"
          intro="Every screen starts as a wireframe so the flow is right before anything looks pretty. Drag across the screen to see the same layout, before and after."
        >
          <FidelitySignature />
        </SignatureFrame>
      );
    case "ai-automation":
      return (
        <SignatureFrame
          label={label}
          kicker="AI at work"
          title="Watch an AI agent clear the inbox"
          intro="An agent reads each message, pulls out what matters, decides and acts in your tools. When it isn't sure, it hands over to a person, with the work already done."
        >
          <AgentSignature />
        </SignatureFrame>
      );
    case "cloud-devops-hosting":
      return (
        <SignatureFrame
          label={label}
          kicker="Release day, every day"
          title="Watch a release go out"
          intro="Every change is built, tested, scanned and rolled out gradually by the pipeline. Try a failing test or a bad release and see what never reaches your customers."
        >
          <PipelineSignature />
        </SignatureFrame>
      );
    case "maintenance-support":
      return (
        <SignatureFrame
          label={label}
          kicker="Software ages"
          title="Twelve months, two products"
          intro="Launch day is the healthiest your software will ever be on its own. Press play and watch the same product over a year, left alone and looked after."
        >
          <DecaySignature />
        </SignatureFrame>
      );
    default:
      return null;
  }
}
