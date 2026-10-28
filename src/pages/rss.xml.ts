import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import { renderFeedContent } from '../lib/feed';

export async function GET(context) {
  const posts = (await getCollection('articles')).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  return rss({
    title: `${site.title} · 文章`,
    description: site.subtitle,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/articles/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
      content: renderFeedContent(post.body ?? '', context.site!.origin, post.data.cover),
    })),
    customData: '<language>zh-CN</language>',
  });
}
