/**
 * Client testimonials — single source for the Testimonials section and the
 * Organization Review / AggregateRating schema.
 *
 * NOTE: these are stand-ins approved for launch and will be replaced with real,
 * named, verifiable client reviews before production. Keep `rating` on a 1–5 scale.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Arrowbin delivered our platform faster than we thought possible — and the quality was outstanding. They felt like part of our team.",
    name: "Sarah Mitchell",
    role: "Product Lead, SaaS Startup",
    rating: 5,
  },
  {
    quote:
      "They rebuilt our store with a focus on speed and conversion. Page loads dropped dramatically and sales followed.",
    name: "David Chen",
    role: "Founder, E-commerce Brand",
    rating: 5,
  },
  {
    quote:
      "Clear communication, clean code and real ownership of the outcome. We've trusted them with every project since.",
    name: "Rafiul Islam",
    role: "Operations Director, Logistics",
    rating: 5,
  },
];

/** Average rating across all testimonials, rounded to one decimal. */
export const averageRating =
  Math.round(
    (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length) *
      10,
  ) / 10;
