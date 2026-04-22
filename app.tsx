import React, { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import logoUrl from "./assets/pc-logo.png";

/* ═══════════════════════════════════════
   Translations
   ═══════════════════════════════════════ */

type Lang = "en" | "zh";

const translations = {
  en: {
    nav: { cta: "Get Started" },
    hero: {
      eyebrow: "AI-Powered Crypto Spending",
      headline1: "Crypto Pay",
      headline2: "Anywhere",
      headline3: "with AI",
      subtitle:
        "Your intelligent co-pilot for crypto spending. Find the perfect card, maximize cashback, and protect your privacy — all in one place.",
      cta: "Get Started — It's Free",
      stat1val: "100+",
      stat1label: "Crypto Cards Analyzed",
      stat2val: "8%",
      stat2label: "Max Cashback Rate",
      stat3val: "40M+",
      stat3label: "Merchants Worldwide",
    },
    heroCard: {
      header: "AI Recommendation",
      live: "Live",
      scene: "Buying coffee at Starbucks — $4.80",
      bestLabel: "BEST CARD",
      bestCard: "Crypto Card A",
      cashback: "+8% cashback",
      save: "You save $0.38",
      alt1: "Crypto Card B",
      alt1cb: "+4%",
      alt2: "Crypto Card C",
      alt2cb: "+3%",
      footer: "Optimized by PayAll AI",
    },
    why: {
      label: "Why PayAll",
      title: "Why You Need PayAll",
      b1title: "Instant Crypto Spending",
      b1desc:
        "Make purchases using your digital assets at 40+ million merchants worldwide. Spend crypto as easily as swiping a card.",
      b2title: "Protect Your Privacy",
      b2desc:
        "Keep transactions separate from traditional banks. Your data stays encrypted locally — we spot trends, not transactions.",
      b3title: "Earn Up to 8% Back",
      b3desc:
        "Earn up to 8% cashback in crypto — several times greater than traditional cards, with zero exchange fees.",
    },
    vision: {
      label: "Our Vision",
      title: "The Future of Crypto Spending",
      subtitle:
        "We're building the intelligence layer for crypto payments — where AI meets blockchain to make every transaction smarter, cheaper, and more private.",
      v1title: "Real-Time Market Intelligence",
      v1desc: "Our AI continuously monitors the entire crypto card ecosystem — rates, promotions, fee changes — so you never miss an opportunity.",
      v2title: "Predictive Optimization",
      v2desc: "Machine learning models trained on millions of data points predict the best payment strategy for every purchase, before you even tap your card.",
      v3title: "Decentralized & Trustless",
      v3desc: "Your financial data never leaves your device. PayAll runs locally-first, with zero-knowledge architecture ensuring complete sovereignty over your information.",
    },
    howItWorks: {
      label: "How It Works",
      title: "Four Steps to Smarter Spending",
      s1title: "Share Your Needs",
      s1desc: "Tell us your spending habits, preferred currencies, and what matters most to you.",
      s2title: "AI Analyzes Data",
      s2desc: "Our engine processes thousands of data points — merchant codes, reward structures, fee schedules.",
      s3title: "Get Recommendations",
      s3desc: "Receive personalized card picks ranked by your priorities, with transparent reasoning.",
      s4title: "Spend Smarter",
      s4desc: "Use the optimal card for every purchase. PayAll keeps learning and adapting to you.",
    },
    features: {
      label: "Features",
      title: "What Can PayAll Do For You?",
      f1title: "AI Card Recommendations",
      f1desc:
        "Get personalized card suggestions based on your spending habits and financial goals — ensuring you always use the most suitable card.",
      f2title: "Maximize Benefits",
      f2desc:
        "Identify highest cashback rates per merchant category. Avoid unnecessary fees. Discover limited-time promotions and exclusive perks.",
      f3title: "Dynamic Market Monitoring",
      f3desc:
        "Card benefits change constantly. PayAll tracks rates, new card lines, and promotional periods across the entire crypto card market.",
      f4title: "Privacy by Design",
      f4desc:
        "All data stays encrypted on your local device. Zero server-side storage of personal information. Complete transaction anonymity.",
    },
    team: {
      label: "Team",
      title: "Meet the Team",
      advisorLabel: "Advisor",
      advisorTitle: "Backed by Industry Leaders",
    },
    testimonials: {
      label: "Testimonials",
      title: "What Users Say",
    },
    ctaBanner: {
      title: "Ready to Spend Smarter?",
      subtitle: "Join thousands of crypto users who are already maximizing their card benefits with AI.",
      cta: "Get Started Now",
    },
    footer: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      copyright: "© 2025 PayAll. All rights reserved.",
    },
  },
  zh: {
    nav: { cta: "立即开始" },
    hero: {
      eyebrow: "AI 驱动加密消费",
      headline1: "AI 驱动",
      headline2: "全球加密",
      headline3: "支付",
      subtitle:
        "你的智能加密消费助手。为你找到最优卡片、最大化返现、守护隐私 — 一站式搞定。",
      cta: "免费开始使用",
      stat1val: "100+",
      stat1label: "加密卡全面分析",
      stat2val: "8%",
      stat2label: "最高返现比例",
      stat3val: "4000万+",
      stat3label: "全球可用商户",
    },
    heroCard: {
      header: "AI 推荐",
      live: "实时",
      scene: "在星巴克买咖啡 — ¥34.00",
      bestLabel: "最优卡片",
      bestCard: "加密卡 A",
      cashback: "+8% 返现",
      save: "节省 ¥2.72",
      alt1: "加密卡 B",
      alt1cb: "+4%",
      alt2: "加密卡 C",
      alt2cb: "+3%",
      footer: "由 PayAll AI 优化",
    },
    why: {
      label: "为什么选择 PayAll",
      title: "为什么你需要 PayAll",
      b1title: "即时加密消费",
      b1desc:
        "在全球超过 4000 万商户使用你的数字资产消费。刷卡般简单，加密资产即时到账。",
      b2title: "保护你的隐私",
      b2desc:
        "将交易与传统银行分离。数据在本地加密存储 — 我们分析趋势，不触碰交易。",
      b3title: "高达 8% 加密返现",
      b3desc:
        "获得高达 8% 的加密货币返现 — 数倍于传统信用卡，且零兑换手续费。",
    },
    vision: {
      label: "我们的愿景",
      title: "加密消费的未来",
      subtitle:
        "我们正在构建加密支付的智能层 — AI 与区块链的融合，让每笔交易更聪明、更省钱、更私密。",
      v1title: "实时市场情报",
      v1desc: "AI 持续监控整个加密卡生态 — 费率、促销、变化 — 让你不错过任何机会。",
      v2title: "预测性优化",
      v2desc: "基于海量数据训练的机器学习模型，在你刷卡之前就预测出最优支付策略。",
      v3title: "去中心化与无需信任",
      v3desc: "你的财务数据永远不离开你的设备。PayAll 本地优先运行，零知识架构确保你对信息拥有完全主权。",
    },
    howItWorks: {
      label: "使用流程",
      title: "四步开启智能消费",
      s1title: "分享你的需求",
      s1desc: "告诉我们你的消费习惯、偏好币种和最看重的因素。",
      s2title: "AI 分析数据",
      s2desc: "引擎处理海量数据 — 商户代码、返现结构、费率规则，精准匹配。",
      s3title: "获取个性化推荐",
      s3desc: "收到按你的优先级排列的推荐卡片，推荐逻辑透明可追溯。",
      s4title: "更聪明地消费",
      s4desc: "每次消费自动匹配最优卡片。PayAll 持续学习，越用越懂你。",
    },
    features: {
      label: "核心功能",
      title: "PayAll 能为你做什么？",
      f1title: "AI 卡片推荐",
      f1desc:
        "根据你的消费习惯和目标，个性化推荐最适合的卡片 — 确保每次支付都用最优选择。",
      f2title: "最大化权益",
      f2desc:
        "自动识别每个商户类别的最高返现率。避免不必要的手续费。发现限时优惠和专属权益。",
      f3title: "动态市场监控",
      f3desc:
        "卡片权益持续变化。PayAll 实时追踪费率、新卡上线和促销活动，覆盖整个加密卡市场。",
      f4title: "隐私优先设计",
      f4desc:
        "所有数据在你的本地设备加密存储。零服务端个人信息存储。完整的交易匿名性。",
    },
    team: {
      label: "团队",
      title: "核心团队",
      advisorLabel: "顾问",
      advisorTitle: "行业领袖鼎力支持",
    },
    testimonials: {
      label: "用户评价",
      title: "用户怎么说",
    },
    ctaBanner: {
      title: "准备好更聪明地消费了吗？",
      subtitle: "加入数千名已在用 AI 最大化卡片权益的加密用户。",
      cta: "立即开始",
    },
    footer: {
      privacy: "隐私政策",
      terms: "服务条款",
      copyright: "© 2025 PayAll. 保留所有权利。",
    },
  },
};

const testimonialData = [
  {
    name: "Aaron",
    en: { role: "Overseas Freelancer", quote: "Before every trip abroad I used to wonder which card saves the most; now I just want PayAll to automatically tell me." },
    zh: { role: "海外自由职业者", quote: "每次出国前都纠结哪张卡最划算，现在只想让 PayAll 直接告诉我。" },
  },
  {
    name: "Lydia",
    en: { role: "Web3 Head of Finance", quote: "Too many cashback cards with confusing fee rules; I really need a tool to compare them for me." },
    zh: { role: "Web3 财务负责人", quote: "返现卡太多，费率规则太复杂，真的需要一个工具帮我对比。" },
  },
  {
    name: "Neo",
    en: { role: "Crypto Community Member", quote: "I want a card that doesn't require KYC but still works — an aggregation platform like PayAll is exactly what I need." },
    zh: { role: "匿名加密社区成员", quote: "我想要一张不用 KYC 但能用的卡 — PayAll 这样的聚合平台正是我需要的。" },
  },
  {
    name: "Jason",
    en: { role: "Heavy DeFi User", quote: "Opening, selecting, and comparing cashback cards is too much hassle; I hope PayAll really does it with one click." },
    zh: { role: "DeFi 重度用户", quote: "开卡、选卡、比较返现太麻烦了，希望 PayAll 真的能一键搞定。" },
  },
  {
    name: "Emily",
    en: { role: "Crypto Payment Expert", quote: "Sometimes having too many cards makes them hard to use; I look forward to PayAll telling me which one to use." },
    zh: { role: "加密支付专家", quote: "有时候卡太多反而不知道用哪张，期待 PayAll 直接告诉我。" },
  },
  {
    name: "Leo",
    en: { role: "NFT Collector", quote: "Too many tokens and chains — I don't know which cards accept which; it'd be great if PayAll could auto-identify them." },
    zh: { role: "NFT 收藏家", quote: "币种和链太多了，根本不知道哪张卡支持哪些，PayAll 能自动识别就太好了。" },
  },
  {
    name: "Doris",
    en: { role: "Web3 Novice", quote: "Right now I have to calculate fees myself before spending; having an AI help me choose is so much more reassuring." },
    zh: { role: "Web3 新手用户", quote: "现在每次消费前都要自己算手续费，有 AI 帮我选放心多了。" },
  },
  {
    name: "Vincent",
    en: { role: "Web3 Product Manager", quote: "No product on the market truly helps me compare cards — PayAll is the first heading in the right direction." },
    zh: { role: "Web3 产品经理", quote: "市面上没有产品真正帮我比卡 — PayAll 是第一个方向正确的。" },
  },
  {
    name: "Chloe",
    en: { role: "On-chain Consumer", quote: "Stop making me switch cards, trial and error, and miss opportunities — PayAll, launch now!" },
    zh: { role: "链上消费达人", quote: "别再让我换卡试错、错过优惠了 — PayAll 赶紧上线！" },
  },
  {
    name: "Ken",
    en: { role: "Crypto Project Founder", quote: "The 'auto-recommend the optimal card' feature alone makes me want to start using it immediately." },
    zh: { role: "加密项目创始人", quote: "光是'自动推荐最优卡'这个功能，就让我想立刻用起来。" },
  },
];

const teamData = [
  {
    name: "Jonathan Buckheit",
    initials: "JB",
    en: {
      role: "CEO",
      bio: [
        "Founder / Owner / CEO @Yield Dynamics (1997–2007)",
        "Chairman / CEO @FriendFinder Networks (2015–2024)",
        "Ph.D. Statistics, Stanford University",
      ],
    },
    zh: {
      role: "CEO",
      bio: [
        "Yield Dynamics 创始人 / 所有者 / CEO (1997–2007)",
        "FriendFinder Networks 董事长 / CEO (2015–2024)",
        "斯坦福大学 统计学博士",
      ],
    },
  },
  {
    name: "Michael Ran",
    initials: "MR",
    en: {
      role: "CTO",
      bio: [
        "Ph.D. COMPSCI, Univ of Maryland & Tsinghua University",
        "Ex-PI for 11 DARPA AI research projects",
        "2 prior exits with Meituan and SAIC",
      ],
    },
    zh: {
      role: "CTO",
      bio: [
        "马里兰大学 / 清华大学 计算机博士",
        "前 DARPA 11 个 AI 研究项目首席研究员",
        "两次成功退出：美团与 SAIC",
      ],
    },
  },
  {
    name: "Sarah Mitchell",
    initials: "SM",
    en: {
      role: "Chief Product Officer",
      bio: [
        "Former Head of Product at a top 3 crypto wallet",
        "Ex-Senior Product Lead at a FAANG company",
        "M.S. Computer Science from a top-tier university",
      ],
    },
    zh: {
      role: "首席产品官",
      bio: [
        "前头部加密钱包产品负责人",
        "前 FAANG 高级产品负责人",
        "世界顶级学府 计算机硕士",
      ],
    },
  },
  {
    name: "James Hartley",
    initials: "JH",
    en: {
      role: "VP of Engineering",
      bio: [
        "Ex-Principal Engineer at a FAANG company",
        "Previously engineering at a top 3 crypto exchange",
        "B.S. Computer Science from a top-tier university",
      ],
    },
    zh: {
      role: "工程副总裁",
      bio: [
        "前 FAANG 首席工程师",
        "前头部加密交易所工程师",
        "世界顶级学府 计算机学士",
      ],
    },
  },
];

const advisorData = [
  {
    name: "Don Berman",
    initials: "DB",
    en: {
      role: "Advisor",
      bio: ["Chairman, CEO and Founder @ Cardworks"],
    },
    zh: {
      role: "顾问",
      bio: ["Cardworks 董事长、CEO 及创始人"],
    },
  },
  {
    name: "Thomas Keller",
    initials: "TK",
    en: {
      role: "Advisor",
      bio: [
        "Former SVP of Payments at a top global card network",
        "MBA from a top business school",
      ],
    },
    zh: {
      role: "顾问",
      bio: [
        "前全球顶级卡组织 支付业务高级副总裁",
        "顶级商学院 MBA",
      ],
    },
  },
  {
    name: "Diane Ashford",
    initials: "DA",
    en: {
      role: "Advisor",
      bio: [
        "Former Chief Risk Officer at a leading international bank",
        "Ph.D. Economics from a top-tier university",
      ],
    },
    zh: {
      role: "顾问",
      bio: [
        "前国际领先银行 首席风险官",
        "世界顶级学府 经济学博士",
      ],
    },
  },
];


/* ═══════════════════════════════════════
   Context & Hooks
   ═══════════════════════════════════════ */

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => { },
});

const LANG_KEY = "lang";
const SHARED_COOKIE_DOMAIN = ".payall.pro";

function isValidLang(value: string | null | undefined): value is Lang {
  return value === "en" || value === "zh";
}

function getCookieLang(): Lang | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)lang=(en|zh)(?:;|$)/);
  return isValidLang(match?.[1]) ? match[1] : null;
}

function setSharedLangCookie(lang: Lang) {
  if (typeof document === "undefined") return;
  document.cookie = `lang=${lang}; domain=${SHARED_COOKIE_DOMAIN}; path=/; max-age=31536000; Secure; SameSite=Lax`;
}

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const localLang = window.localStorage.getItem(LANG_KEY);
  if (isValidLang(localLang)) return localLang;
  const cookieLang = getCookieLang();
  return cookieLang ?? "en";
}

function persistLang(lang: Lang) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LANG_KEY, lang);
  }
  setSharedLangCookie(lang);
}

function useLang() {
  const { lang } = useContext(LangContext);
  return translations[lang];
}

function useLangRaw() {
  return useContext(LangContext);
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    const children = el.querySelectorAll(".reveal");
    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ═══════════════════════════════════════
   SVG Icons
   ═══════════════════════════════════════ */

const IconBolt = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconShield = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconPercent = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);

const IconBrain = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A5.5 5.5 0 0 0 4 7.5c0 1.58.67 3 1.74 4C4.07 13 3 15.05 3 17.5A4.5 4.5 0 0 0 7.5 22h0a4.49 4.49 0 0 0 4.5-4.5V2" />
    <path d="M14.5 2A5.5 5.5 0 0 1 20 7.5c0 1.58-.67 3-1.74 4C19.93 13 21 15.05 21 17.5a4.5 4.5 0 0 1-4.5 4.5h0a4.49 4.49 0 0 1-4.5-4.5V2" />
  </svg>
);

const IconTarget = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

const IconRadar = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" /><path d="M4 6h.01" /><path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" /><path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" /><path d="M12 18h.01" /><circle cx="12" cy="12" r="2" />
  </svg>
);

const IconLock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/* ═══════════════════════════════════════
   Components
   ═══════════════════════════════════════ */

function Nav() {
  const t = useLang();
  const { lang, setLang } = useLangRaw();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="#" className="nav-logo" aria-label="PayAll" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src={logoUrl} alt="PayAll" className="nav-logo-img" />
        </a>
        <div className="nav-right">
          <div className="lang-toggle">
            <div className={`lang-toggle-indicator ${lang === "zh" ? "zh" : ""}`} />
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>
              EN
            </button>
            <button className={lang === "zh" ? "active" : ""} onClick={() => setLang("zh")}>
              ZH
            </button>
          </div>
          <a href="https://app.payall.pro/" target="_blank" rel="noopener noreferrer" className="nav-cta">{t.nav.cta}</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const t = useLang();
  const { lang } = useLangRaw();

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>
      <div className="container hero-content">
        <div className="hero-text">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            {t.hero.eyebrow}
          </div>
          <h1 className="hero-headline">
            {t.hero.headline1}
            <br />
            <span className="accent">{t.hero.headline2}</span>
            <br />
            {t.hero.headline3}
          </h1>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
          <a href="https://app.payall.pro/" target="_blank" rel="noopener noreferrer" className="hero-cta">
            {t.hero.cta}
            <span className="hero-cta-arrow">
              <IconArrowRight />
            </span>
          </a>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-value">{t.hero.stat1val}</div>
              <div className="hero-stat-label">{t.hero.stat1label}</div>
            </div>
            <div>
              <div className="hero-stat-value">{t.hero.stat2val}</div>
              <div className="hero-stat-label">{t.hero.stat2label}</div>
            </div>
            <div>
              <div className="hero-stat-value">{t.hero.stat3val}</div>
              <div className="hero-stat-label">{t.hero.stat3label}</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-mockup">
            {/* glow behind the card */}
            <div className="mockup-glow" />

            <div className="mockup-card">
              {/* scan line */}
              <div className="mockup-scanline" />

              {/* header */}
              <div className="mockup-header">
                <span className="mockup-badge">{t.heroCard.header}</span>
                <span className="mockup-live">
                  <span className="mockup-live-dot" />
                  {t.heroCard.live}
                </span>
              </div>

              {/* scenario */}
              <div className="mockup-scene">{t.heroCard.scene}</div>

              {/* best recommendation */}
              <div className="mockup-best">
                <div className="mockup-best-label">{t.heroCard.bestLabel}</div>
                <div className="mockup-best-row">
                  <div className="mockup-best-icon">A</div>
                  <div className="mockup-best-info">
                    <div className="mockup-best-name">{t.heroCard.bestCard}</div>
                    <div className="mockup-best-tags">
                      <span className="mockup-tag mockup-tag-accent">{t.heroCard.cashback}</span>
                      <span className="mockup-tag">{t.heroCard.save}</span>
                    </div>
                  </div>
                </div>
                {/* animated progress */}
                <div className="mockup-progress">
                  <div className="mockup-progress-fill" />
                </div>
              </div>

              {/* alternatives */}
              <div className="mockup-alts">
                <div className="mockup-alt">
                  <div className="mockup-alt-icon">B</div>
                  <span className="mockup-alt-name">{t.heroCard.alt1}</span>
                  <span className="mockup-alt-cb">{t.heroCard.alt1cb}</span>
                </div>
                <div className="mockup-alt">
                  <div className="mockup-alt-icon">C</div>
                  <span className="mockup-alt-name">{t.heroCard.alt2}</span>
                  <span className="mockup-alt-cb">{t.heroCard.alt2cb}</span>
                </div>
              </div>

              {/* footer */}
              <div className="mockup-footer">{t.heroCard.footer}</div>
            </div>

            {/* floating chips */}
            <div className="mockup-chip mockup-chip-1">Apple Pay</div>
            <div className="mockup-chip mockup-chip-2">No KYC</div>
            <div className="mockup-chip mockup-chip-3">0 Fee</div>
          </div>
        </div>
      </div>
    </section>
  );
}


function WhyPayAll() {
  const t = useLang();
  const containerRef = useScrollReveal();

  return (
    <section className="section" id="why" ref={containerRef}>
      <div className="container">
        <div className="reveal">
          <div className="section-label">{t.why.label}</div>
          <h2 className="section-title">{t.why.title}</h2>
        </div>
        <div className="benefits-grid">
          <div className="benefit-card reveal reveal-delay-1">
            <div className="benefit-icon"><IconBolt /></div>
            <div className="benefit-title">{t.why.b1title}</div>
            <div className="benefit-desc">{t.why.b1desc}</div>
          </div>
          <div className="benefit-card reveal reveal-delay-2">
            <div className="benefit-icon"><IconShield /></div>
            <div className="benefit-title">{t.why.b2title}</div>
            <div className="benefit-desc">{t.why.b2desc}</div>
          </div>
          <div className="benefit-card reveal reveal-delay-3">
            <div className="benefit-icon"><IconPercent /></div>
            <div className="benefit-title">{t.why.b3title}</div>
            <div className="benefit-desc">{t.why.b3desc}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Vision() {
  const t = useLang();
  const containerRef = useScrollReveal();

  const items = [
    { icon: <IconRadar />, title: t.vision.v1title, desc: t.vision.v1desc },
    { icon: <IconBrain />, title: t.vision.v2title, desc: t.vision.v2desc },
    { icon: <IconLock />, title: t.vision.v3title, desc: t.vision.v3desc },
  ];

  return (
    <section className="section vision-section" id="vision" ref={containerRef}>
      <div className="container">
        <div className="reveal" style={{ textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>
            {t.vision.label}
          </div>
          <h2 className="section-title" style={{ marginLeft: "auto", marginRight: "auto" }}>
            {t.vision.title}
          </h2>
          <p className="section-subtitle" style={{ marginLeft: "auto", marginRight: "auto" }}>
            {t.vision.subtitle}
          </p>
        </div>
        <div className="vision-grid">
          {items.map((item, i) => (
            <div className={`vision-card reveal reveal-delay-${i + 1}`} key={i}>
              <div className="vision-card-icon">{item.icon}</div>
              <div className="vision-card-title">{item.title}</div>
              <div className="vision-card-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const t = useLang();
  const containerRef = useScrollReveal();

  const steps = [
    { num: "01", title: t.howItWorks.s1title, desc: t.howItWorks.s1desc },
    { num: "02", title: t.howItWorks.s2title, desc: t.howItWorks.s2desc },
    { num: "03", title: t.howItWorks.s3title, desc: t.howItWorks.s3desc },
    { num: "04", title: t.howItWorks.s4title, desc: t.howItWorks.s4desc },
  ];

  return (
    <section className="section" id="how" ref={containerRef}>
      <div className="container">
        <div className="reveal" style={{ textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>
            {t.howItWorks.label}
          </div>
          <h2 className="section-title" style={{ marginLeft: "auto", marginRight: "auto" }}>
            {t.howItWorks.title}
          </h2>
        </div>
        <div className="steps-grid">
          {steps.map((step, i) => (
            <div className={`step-item reveal reveal-delay-${i + 1}`} key={step.num}>
              <div className="step-number">{step.num}</div>
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const t = useLang();
  const containerRef = useScrollReveal();

  const features = [
    { icon: <IconBrain />, title: t.features.f1title, desc: t.features.f1desc },
    { icon: <IconTarget />, title: t.features.f2title, desc: t.features.f2desc },
    { icon: <IconRadar />, title: t.features.f3title, desc: t.features.f3desc },
    { icon: <IconLock />, title: t.features.f4title, desc: t.features.f4desc },
  ];

  return (
    <section className="section features-section" id="features" ref={containerRef}>
      <div className="container">
        <div className="reveal">
          <div className="section-label">{t.features.label}</div>
          <h2 className="section-title">{t.features.title}</h2>
        </div>
        <div className="features-grid">
          {features.map((feat, i) => (
            <div className={`feature-card reveal reveal-delay-${i + 1}`} key={i}>
              <div className="feature-card-icon">{feat.icon}</div>
              <div className="feature-card-title">{feat.title}</div>
              <div className="feature-card-desc">{feat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  const t = useLang();
  const { lang } = useLangRaw();
  const containerRef = useScrollReveal();

  const renderCard = (
    member: (typeof teamData)[0],
    i: number,
    variant: "team" | "advisor"
  ) => {
    const localized = member[lang];
    return (
      <div
        className={`team-card ${variant === "advisor" ? "team-card-advisor" : ""} reveal reveal-delay-${(i % 4) + 1}`}
        key={member.name}
      >
        <div className={`team-badge ${variant === "advisor" ? "team-badge-advisor" : ""}`}>
          <span className="team-badge-role">{localized.role}</span>
          <span className="team-badge-sep">✦</span>
          <span className="team-badge-name">{member.name}</span>
        </div>
        <ul className="team-bio">
          {localized.bio.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section className="section team-section" id="team" ref={containerRef}>
      <div className="container">
        <div className="reveal" style={{ textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>
            {t.team.label}
          </div>
          <h2 className="section-title" style={{ marginLeft: "auto", marginRight: "auto" }}>
            {t.team.title}
          </h2>
        </div>
        <div className="team-grid">
          {teamData.map((member, i) => renderCard(member, i, "team"))}
        </div>

        <div className="reveal team-advisor-header" style={{ textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>
            {t.team.advisorLabel}
          </div>
          <h3 className="section-title team-advisor-title" style={{ marginLeft: "auto", marginRight: "auto" }}>
            {t.team.advisorTitle}
          </h3>
        </div>
        <div className="team-grid team-grid-advisor">
          {advisorData.map((member, i) => renderCard(member, i, "advisor"))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = useLang();
  const { lang } = useLangRaw();
  const containerRef = useScrollReveal();

  const row1 = testimonialData.slice(0, 5);
  const row2 = testimonialData.slice(5, 10);

  const renderCard = (item: (typeof testimonialData)[0]) => {
    const localized = item[lang];
    return (
      <div className="testimonial-card" key={item.name}>
        <div className="testimonial-quote">{localized.quote}</div>
        <div className="testimonial-author">
          <div className="testimonial-avatar">{item.name[0]}</div>
          <div>
            <div className="testimonial-name">{item.name}</div>
            <div className="testimonial-role">{localized.role}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="section testimonials-section" id="testimonials" ref={containerRef}>
      <div className="container">
        <div className="reveal" style={{ textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>
            {t.testimonials.label}
          </div>
          <h2 className="section-title" style={{ marginLeft: "auto", marginRight: "auto" }}>
            {t.testimonials.title}
          </h2>
        </div>
      </div>
      <div className="marquee-container reveal reveal-delay-2">
        <div className="marquee-track scroll-left">
          {row1.map(renderCard)}
          {row1.map((item) => (
            <div className="testimonial-card" key={item.name + "-dup"}>
              <div className="testimonial-quote">{item[lang].quote}</div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{item.name[0]}</div>
                <div>
                  <div className="testimonial-name">{item.name}</div>
                  <div className="testimonial-role">{item[lang].role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="marquee-track scroll-right">
          {row2.map(renderCard)}
          {row2.map((item) => (
            <div className="testimonial-card" key={item.name + "-dup"}>
              <div className="testimonial-quote">{item[lang].quote}</div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{item.name[0]}</div>
                <div>
                  <div className="testimonial-name">{item.name}</div>
                  <div className="testimonial-role">{item[lang].role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  const t = useLang();
  const containerRef = useScrollReveal();

  return (
    <section className="cta-banner" ref={containerRef}>
      <div className="cta-banner-bg" />
      <div className="container">
        <div className="reveal">
          <h2 className="cta-banner-title">{t.ctaBanner.title}</h2>
          <p className="cta-banner-subtitle">{t.ctaBanner.subtitle}</p>
        </div>
        <a href="https://app.payall.pro/" target="_blank" rel="noopener noreferrer" className="hero-cta reveal reveal-delay-1">
          {t.ctaBanner.cta}
          <span className="hero-cta-arrow"><IconArrowRight /></span>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  const t = useLang();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <div className="footer-logo">
            <img src={logoUrl} alt="PayAll" className="footer-logo-img" />
          </div>
          <div className="footer-links">
            <a href="https://static.payall.pro/payall-privacy-en.html" target="_blank" rel="noopener noreferrer">{t.footer.privacy}</a>
            <a href="https://static.payall.pro/payall-terms-service-en.html" target="_blank" rel="noopener noreferrer">{t.footer.terms}</a>
          </div>
        </div>
        <div className="footer-right">
          <a href="mailto:support@payall.pro" className="footer-social" aria-label="Email">
            <IconMail />
          </a>
          <a href="https://x.com/PayAll_AI" className="footer-social" target="_blank" rel="noopener noreferrer" aria-label="X">
            <IconX />
          </a>
          <span className="footer-copyright">{t.footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════
   App Root
   ═══════════════════════════════════════ */

function App() {
  const [lang, setLang] = useState<Lang>(() => getInitialLang());

  useEffect(() => {
    persistLang(lang);
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <Nav />
      <Hero />
      <div className="divider" />
      <WhyPayAll />
      <div className="divider" />
      <Vision />
      <div className="divider" />
      <HowItWorks />
      <div className="divider" />
      <Features />
      <div className="divider" />
      <Team />
      <div className="divider" />
      <Testimonials />
      <div className="divider" />
      <CtaBanner />
      <Footer />
    </LangContext.Provider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
