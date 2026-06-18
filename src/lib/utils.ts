export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

const CATEGORY_FILTER_MAP: Record<string, string> = {
  'AI 理论': 'ai-theory',
  'Agent 实践与开发': 'agent-practice',
  'AI 探索': 'ai-exploration',
  设计: 'design-art',
  艺术: 'design-art',
  'AI Agents': 'ai-agents',
  NLP: 'nlp',
  'Creative Coding': 'creative-coding',
  Design: 'design-art',
  'Research Tools': 'research-tools',
};

export function getFilterSlugs(category: string, tags: string[] = []): string {
  const slugs = new Set<string>();

  const mapped = CATEGORY_FILTER_MAP[category];
  if (mapped) slugs.add(mapped);

  const full = slugify(category);
  if (full) slugs.add(full);

  category.split(/[\s&+,;]+/).forEach((token) => {
    const s = slugify(token);
    if (s) slugs.add(s);
  });

  tags.forEach((tag) => {
    const s = slugify(tag);
    if (s) slugs.add(s);
  });

  return Array.from(slugs).join(',');
}

export function stripMarkdown(markdown: string | undefined, maxLength = 80): string {
  if (!markdown) return '';

  const plain = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/^[>\-]\s*/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

  return plain.slice(0, maxLength).trim();
}
