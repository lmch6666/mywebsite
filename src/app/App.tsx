import React, { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  Github,
  Linkedin,
  Mail,
  Menu,
  Play,
  X,
} from "lucide-react";

type Article = {
  title: string;
  summary: string;
  date: string;
  read: string;
  tags: string[];
  href: string;
};

const articles: Article[] = [
  {
    title: "给 AI Agent 一个可控的前端工作台",
    summary: "从上下文、工具调用到可观测性：如何把 Agent 能力放进真实产品，而不是只做一个看起来聪明的聊天框。",
    date: "2024.07.08",
    read: "14 min",
    tags: ["AI Agent", "React"],
    href: "#article-rsc",
  },
  {
    title: "给设计系统留一扇逃生门",
    summary: "组件库不应该成为创造力的天花板。聊聊我如何用 tokens、slots 与组合式 API 保持一致而不失弹性。",
    date: "2024.05.03",
    read: "08 min",
    tags: ["Design System", "CSS"],
    href: "#article-design-system",
  },
  {
    title: "一次 Web 性能排障的完整记录",
    summary: "LCP 从 4.8s 到 1.9s，问题不在某一个指标，而是三个看似独立的小决定同时发生了。",
    date: "2024.03.22",
    read: "10 min",
    tags: ["Performance", "Debug"],
    href: "#article-performance",
  },
];

const videos = [
  { title: "用 CSS 做出不无聊的布局", duration: "18:42", label: "布局实验室", hue: "bg-[#e9efdd]", mark: "CSS" },
  { title: "我如何组织一个前端项目", duration: "24:08", label: "工程手记", hue: "bg-[#f6e0cd]", mark: "DX" },
  { title: "前端工程师如何与 AI Agent 协作", duration: "31:15", label: "智能体实践", hue: "bg-[#dfe8f4]", mark: "AI" },
];

const withViewTransition = (callback: () => void) => {
  const documentWithTransition = document as Document & {
    startViewTransition?: (updateCallback: () => void) => { finished: Promise<void> };
  };

  if (documentWithTransition.startViewTransition) {
    documentWithTransition.startViewTransition(callback);
  } else {
    callback();
  }
};

function Preloader() {
  return (
    <div className="intro-screen fixed inset-0 z-[100] grid place-items-center bg-[#10130f] text-[#f8f7f2]">
      <div className="intro-word text-center">
        <p className="mb-4 font-mono text-[10px] font-semibold tracking-[0.35em] text-[#b9cd62] sm:text-xs">PERSONAL FIELD NOTES</p>
        <h1 className="font-display text-5xl font-semibold tracking-[-0.045em] sm:text-7xl">LIN YU</h1>
        <div className="intro-line mx-auto mt-7 h-px w-32 bg-[#b9cd62]" />
      </div>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(() => new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTag, setActiveTag] = useState("全部");

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const clock = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(clock);
  }, []);

  const beijingTime = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);

  const visitSection = (id: string) => {
    withViewTransition(() => setMenuOpen(false));
    window.setTimeout(() => document.querySelector(id)?.scrollIntoView({ behavior: "auto", block: "start" }), 20);
  };

  const chooseTag = (tag: string) => withViewTransition(() => setActiveTag(tag));

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-[#b9cd62] selection:text-[#10130f]">
      {loading && <Preloader />}

      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <button onClick={() => visitSection("#about")} className="group flex items-center gap-2 text-left" aria-label="回到顶部">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#10130f] font-mono text-[10px] font-bold text-[#b9cd62]">LY</span>
            <span className="font-display text-lg font-semibold tracking-[-0.03em]">林予 / Lin Yu</span>
          </button>
          <nav className="hidden items-center gap-7 font-mono text-[11px] font-medium tracking-[0.14em] text-muted-foreground md:flex">
            <button onClick={() => visitSection("#about")} className="hover:text-foreground">01 / 关于</button>
            <button onClick={() => visitSection("#writing")} className="hover:text-foreground">02 / 文章</button>
            <button onClick={() => visitSection("#watching")} className="hover:text-foreground">03 / 视频</button>
          </nav>
          <a href="mailto:hello@linyu.dev" className="hidden items-center gap-2 rounded-full bg-[#10130f] px-4 py-2 font-mono text-[10px] font-bold tracking-[0.12em] text-[#f8f7f2] hover:bg-[#405021] sm:flex">写封信 <ArrowUpRight size={13} /></a>
          <button onClick={() => withViewTransition(() => setMenuOpen((open) => !open))} className="grid h-9 w-9 place-items-center md:hidden" aria-label="打开导航">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {menuOpen && (
          <nav className="border-t border-border bg-background px-5 py-5 md:hidden">
            <div className="grid gap-1 font-mono text-sm">
              {[['#about', '01 / 关于'], ['#writing', '02 / 文章'], ['#watching', '03 / 视频']].map(([id, label]) => <button key={id} onClick={() => visitSection(id)} className="py-3 text-left">{label}</button>)}
              <a href="mailto:hello@linyu.dev" className="py-3">hello@linyu.dev</a>
            </div>
          </nav>
        )}
      </header>

      <section id="about" className="scroll-mt-24 border-b border-border">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
            <div className="mb-14 flex items-center gap-3 font-mono text-[10px] font-bold tracking-[0.18em] text-muted-foreground"><span className="h-px w-10 bg-[#b9cd62]" /> 01 — ABOUT ME</div>
            <p className="max-w-3xl font-display text-[clamp(2.8rem,7vw,6.7rem)] font-medium leading-[0.96] tracking-[-0.055em]">前端工程师，<br /><em className="font-normal text-[#536628]">也在乎像素的呼吸。</em></p>
            <div className="mt-12 grid max-w-2xl gap-8 border-t border-border pt-6 sm:grid-cols-[1.2fr_0.8fr]">
              <p className="text-base leading-7 text-[#4b4e46]">我叫林予，现居杭州。专注于构建快速、清晰且让人愿意停留的 Web 体验。日常与 React、TypeScript、AI Agent 和浏览器标准一起工作，探索让智能体真正融入产品与研发流程的方式。</p>
              <div className="font-mono text-[11px] leading-6 tracking-[0.06em] text-muted-foreground"><p>AVAILABLE FOR SELECTED WORK</p><p className="text-foreground">HANGZHOU · REMOTE</p><p className="mt-3 text-[#536628]">● OPEN TO CONNECT</p></div>
            </div>
          </div>
          <aside className="relative min-h-[330px] overflow-hidden border-t border-border bg-[#dfe8f4] lg:min-h-0 lg:border-l lg:border-t-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,.94),transparent_18rem),linear-gradient(135deg,transparent_50%,rgba(16,19,15,.08))]" />
            <div className="absolute bottom-7 left-7 right-7 rounded-sm border border-[#10130f]/15 bg-[#f8f7f2]/70 p-5 backdrop-blur-sm">
              <Code2 className="mb-9 text-[#536628]" size={30} strokeWidth={1.5} />
              <p className="font-display text-2xl leading-tight tracking-[-0.035em]">让 AI Agent，<br />成为可靠的搭档。</p>
              <div className="mt-7 flex items-center justify-between border-t border-[#10130f]/10 pt-3 font-mono text-[10px] tracking-[0.12em]"><span>BEIJING TIME</span><time dateTime={now.toISOString()}>{beijingTime}</time></div>
            </div>
          </aside>
        </div>
      </section>

      <section id="writing" className="scroll-mt-24 border-b border-border bg-card">
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="mb-12 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div><p className="mb-4 font-mono text-[10px] font-bold tracking-[0.18em] text-muted-foreground">02 — WRITING</p><h2 className="font-display text-4xl font-medium tracking-[-0.045em] sm:text-5xl">写下那些想明白的事</h2></div>
            <div className="flex flex-wrap gap-2" aria-label="文章筛选">
              {["全部", "React", "架构", "CSS"].map((tag) => <button key={tag} onClick={() => chooseTag(tag)} className={`rounded-full border px-3 py-1.5 font-mono text-[10px] font-semibold tracking-[0.09em] ${activeTag === tag ? "border-[#10130f] bg-[#10130f] text-[#f8f7f2]" : "border-border text-muted-foreground hover:border-[#10130f] hover:text-foreground"}`}>{tag}</button>)}
            </div>
          </div>
          <div className="border-t border-border">
            {articles.filter((article) => activeTag === "全部" || article.tags.includes(activeTag)).map((article, index) => <a key={article.title} href={article.href} className="group grid gap-5 border-b border-border py-7 sm:grid-cols-[80px_minmax(0,1fr)_150px] sm:items-start">
              <span className="font-mono text-xs text-[#536628]">0{index + 1}</span>
              <div><div className="mb-3 flex flex-wrap gap-2">{article.tags.map((tag) => <span key={tag} className="font-mono text-[10px] font-semibold tracking-[0.09em] text-muted-foreground">#{tag}</span>)}</div><h3 className="font-display text-2xl font-medium leading-tight tracking-[-0.035em] group-hover:text-[#536628] sm:text-3xl">{article.title}</h3><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{article.summary}</p></div>
              <div className="flex items-center justify-between gap-3 font-mono text-[10px] tracking-[0.1em] text-muted-foreground sm:block sm:text-right"><span>{article.date} · {article.read}</span><ArrowUpRight className="mt-4 hidden sm:ml-auto sm:block" size={18} /></div>
            </a>)}
          </div>
          <a href="#all-articles" className="mt-8 inline-flex items-center gap-3 font-mono text-[11px] font-bold tracking-[0.12em] underline decoration-[#b9cd62] decoration-2 underline-offset-4">查看所有文章 <ArrowDownRight size={16} /></a>
        </div>
      </section>

      <section id="watching" className="scroll-mt-24 bg-[#10130f] text-[#f8f7f2]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="mb-4 font-mono text-[10px] font-bold tracking-[0.18em] text-[#b9cd62]">03 — WATCHING</p><h2 className="font-display text-4xl font-medium tracking-[-0.045em] sm:text-5xl">也说给你听</h2></div><p className="max-w-sm text-sm leading-6 text-[#c4c7be]">在视频里拆解工程实践，分享那些用文字不太容易说清楚的细节。</p></div>
          <div className="grid gap-px overflow-hidden border border-[#f8f7f2]/15 bg-[#f8f7f2]/15 md:grid-cols-3">
            {videos.map((video) => <a href="#video" key={video.title} className="group relative min-h-[315px] overflow-hidden bg-[#10130f] p-6 sm:min-h-[380px]">
              <div className={`absolute inset-x-0 top-0 h-[58%] ${video.hue} p-5 text-[#10130f]`}><div className="flex justify-between font-mono text-[10px] font-bold tracking-[0.1em]"><span>{video.label}</span><span>{video.duration}</span></div><span className="absolute bottom-[-0.14em] left-4 font-display text-8xl font-semibold tracking-[-0.09em] opacity-80">{video.mark}</span></div>
              <div className="absolute left-6 top-[calc(58%-23px)] grid h-12 w-12 place-items-center rounded-full bg-[#10130f] text-[#f8f7f2] group-hover:bg-[#536628]"><Play size={16} fill="currentColor" /></div>
              <div className="absolute bottom-6 left-6 right-6"><h3 className="font-display text-2xl font-medium leading-tight tracking-[-0.035em]">{video.title}</h3><div className="mt-6 flex items-center justify-between border-t border-[#f8f7f2]/20 pt-3 font-mono text-[10px] tracking-[0.1em] text-[#c4c7be]"><span>WATCH NOW</span><ArrowUpRight size={16} /></div></div>
            </a>)}
          </div>
        </div>
      </section>

      <footer className="bg-[#10130f] px-5 pb-7 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-7 border-t border-[#f8f7f2]/15 pt-7 text-[#f8f7f2] sm:flex-row sm:items-end sm:justify-between"><div><p className="font-display text-2xl tracking-[-0.035em]">保持好奇，持续交付。</p><a className="mt-2 inline-block font-mono text-[11px] tracking-[0.08em] text-[#b9cd62]" href="mailto:hello@linyu.dev">hello@linyu.dev</a></div><div className="flex gap-3"><a aria-label="GitHub" href="https://github.com" className="grid h-9 w-9 place-items-center rounded-full border border-[#f8f7f2]/20 hover:bg-[#f8f7f2] hover:text-[#10130f]"><Github size={16} /></a><a aria-label="LinkedIn" href="https://linkedin.com" className="grid h-9 w-9 place-items-center rounded-full border border-[#f8f7f2]/20 hover:bg-[#f8f7f2] hover:text-[#10130f]"><Linkedin size={16} /></a><a aria-label="Email" href="mailto:hello@linyu.dev" className="grid h-9 w-9 place-items-center rounded-full border border-[#f8f7f2]/20 hover:bg-[#f8f7f2] hover:text-[#10130f]"><Mail size={16} /></a></div><p className="font-mono text-[10px] tracking-[0.1em] text-[#8d9287]">© 2024 LIN YU</p></div>
      </footer>
    </main>
  );
}

export default App;
