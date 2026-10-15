import type { Post } from "@/lib/blog";
import { post as aiAgentCostSmallBusiness } from "./ai-agent-cost-small-business";
import { post as aiAutomationForSmallBusiness } from "./ai-automation-for-small-business";
import { post as chatgptShoppingForOnlineStores } from "./chatgpt-shopping-for-online-stores";
import { post as courierApiIntegrationBangladesh } from "./courier-api-integration-bangladesh";
import { post as developerSalariesByCountry } from "./developer-salaries-by-country";
import { post as mvpDevelopmentCost } from "./mvp-development-cost";
import { post as mvpVsPrototypeVsPoc } from "./mvp-vs-prototype-vs-poc";
import { post as paymentGatewayIntegrationBangladesh } from "./payment-gateway-integration-bangladesh";
import { post as saasDevelopmentCost } from "./saas-development-cost";
import { post as shopifyVsCustomEcommerce } from "./shopify-vs-custom-ecommerce";
import { post as softwareMaintenanceCost } from "./software-maintenance-cost";
import { post as vibeCodedAppProductionReady } from "./vibe-coded-app-production-ready";
import { post as wordpressToNextjsMigration } from "./wordpress-to-nextjs-migration";

/**
 * Posts added after the original three guides, one file per post so each can be
 * written and reviewed on its own. Order here does not matter: the blog sorts by date.
 */
export const extraPosts: Post[] = [
  vibeCodedAppProductionReady,
  wordpressToNextjsMigration,
  paymentGatewayIntegrationBangladesh,
  aiAgentCostSmallBusiness,
  mvpDevelopmentCost,
  shopifyVsCustomEcommerce,
  chatgptShoppingForOnlineStores,
  saasDevelopmentCost,
  courierApiIntegrationBangladesh,
  softwareMaintenanceCost,
  mvpVsPrototypeVsPoc,
  aiAutomationForSmallBusiness,
  developerSalariesByCountry,
];
