import markdownIt from 'markdown-it';

const parser = new markdownIt({ html: true });

/**
 * Render article markdown into full-content HTML for RSS readers.
 * RSS readers resolve relative URLs against their own domain, so every
 * relative src/href must be rewritten to an absolute URL, and the frontmatter
 * cover becomes the leading image of the entry.
 */
export function renderFeedContent(markdown: string, origin: string, cover?: string): string {
  const coverHtml = cover ? `<p><img src="${origin}${cover}" alt="" /></p>\n` : '';
  return (
    coverHtml +
    parser
      .render(markdown)
      .replace(/(src|href)="\/(?!\/)/g, `$1="${origin}/`)
  );
}
