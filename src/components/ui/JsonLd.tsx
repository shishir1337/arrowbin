/**
 * Renders a schema.org JSON-LD block. Server component — output is static markup
 * crawlers and answer engines read. Use one per structured-data graph.
 */

export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  // Escape the characters that could break out of the <script> block (e.g.
  // </script> or an HTML comment) if a schema string ever contains them. The
  // result is still valid JSON-LD that parses identically.
  const json = JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires raw script injection; output is escaped above.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
