export const site = {
  title: 'ChrisV',
  subtitle: 'A researcher who builds, designs, and writes about intelligent systems.',
  heroTitle: '智能&艺术',
  tag: 'CHRISV',
  author: 'ChrisV',
  email: 'shiyaol492@gmail.com',
  startYear: 2026,
};

export const nav = [
  { label: '首页', href: '/' },
  { label: '文章', href: '/articles' },
  { label: '项目', href: '/projects' },
  { label: '资源', href: '/resources' },
  { label: '关于', href: '/about' },
  { label: '碎碎念', href: '/random' },
];

export const social = [
  { label: 'GitHub', href: 'https://github.com/EricLeeK', icon: 'github' },
  { label: 'X', href: 'https://x.com/Victori13579092', icon: 'x' },
  { label: 'Email', href: 'mailto:shiyaol492@gmail.com', icon: 'email' },
  {
    label: 'WeChat',
    href: '#',
    icon: 'wechat',
    qrImage: '/images/wechat-qr.jpg',
    qrTitle: '微信号',
    qrValue: 'V',
  },
  {
    label: '小红书',
    href: 'https://xhslink.com/m/8FhFbx6a8DS',
    icon: 'xiaohongshu',
  },
];

export const filters = [
  { id: 'all', label: '全部' },
  { id: 'featured', label: '🔥 推荐' },
  { id: 'ai', label: 'AI' },
  { id: 'design', label: '设计' },
  { id: 'art', label: '艺术' },
  { id: 'random', label: '碎碎念' },
];

export const categories = [
  {
    id: 'research',
    number: '01',
    tag: 'ARTICLES',
    title: '研究',
    description: 'AI相关方向论文博客精读与探索',
    href: '/articles?filter=ai',
    icon: '/images/research-icon.png',
    stats: [
      { value: '{articles}', label: '篇文章' },
      { value: '12.5k', label: '总阅读', hidden: true },
    ],
  },
  {
    id: 'projects',
    number: '02',
    tag: 'WORKS',
    title: '项目',
    description: '构建有价值的工具与开源项目',
    href: '/projects',
    icon: '/images/projects-icon.png',
    stats: [
      { value: '{projects}', label: '个项目' },
      { value: '{opensource}', label: '在开源' },
    ],
  },
  {
    id: 'random',
    number: '03',
    tag: 'RANDOM',
    title: '碎碎念',
    description: '记录思考、灵感与生活片段',
    href: '/random',
    icon: '/images/random-icon.png',
    stats: [
      { value: '{random}', label: '条想法' },
      { value: '持续', label: '更新中' },
    ],
  },
];
