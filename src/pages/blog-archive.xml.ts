import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import { renderFeedContent } from '../lib/feed';

export async function GET(context) {
  const posts = (await getCollection('blogArchive')).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  return rss({
    title: `${site.title} · 优秀博客转存`,
    description: '翻译与转存的优秀博客文章',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: `${post.data.description}（转译自 ${post.data.sourceAuthor} · ${post.data.sourceSite}）`,
      pubDate: post.data.date,
      link: `/blog-archive/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
      content: renderFeedContent(post.body ?? '', context.site!.origin, post.data.cover),
    })),
    customData: '<language>zh-CN</language>',
  });
}
