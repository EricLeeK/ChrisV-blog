import type { CollectionEntry } from 'astro:content';
import { stripMarkdown } from './utils';

export function readingMinutes(body = '') {
  const chinese = (body.match(/[\u3400-\u9fff]/g) || []).length;
  const words = (body.replace(/[\u3400-\u9fff]/g, ' ').match(/\b[\w'-]+\b/g) || []).length;
  return Math.max(1, Math.ceil(chinese / 400 + words / 220));
}

export function noteTitle(note: CollectionEntry<'random'>) {
  return note.data.title || stripMarkdown(note.body, 28) || '无题手记';
}

export function noteExcerpt(note: CollectionEntry<'random'>) {
  return note.data.description || stripMarkdown(note.body, 120);
}

export function dateLabel(date: Date) {
  return date.toLocaleDateString('zh-CN', { timeZone: 'Asia/Shanghai', year: 'numeric', month: 'long', day: 'numeric' });
}
