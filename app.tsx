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
      eyebrow: "AI-Assisted Crypto Card Comparison",
      headline1: "Crypto Card",
      headline2: "Intelligence",
      headline3: "with AI",
      subtitle:
        "Your AI-assisted companion for comparing third-party crypto card options. Review card features, cashback, fees, and privacy-related information in one place.",
      cta: "Get Started — It's Free",
      stat1val: "100+",
      stat1label: "Crypto Cards Analyzed",
      stat2val: "8%",
      stat2label: "Max Cashback Rate",
      stat3val: "40M+",
      stat3label: "Merchants Worldwide",
    },
    heroCard: {
      header: "AI Comparison",
      live: "Preview",
      scene: "Before a purchase at Starbucks — $4.80",
      bestLabel: "REFERENCE MATCH",
      bestCard: "Crypto Card A",
      cashback: "+8% cashback",
      save: "Reference savings $0.38",
      alt1: "Crypto Card B",
      alt1cb: "+4%",
      alt2: "Crypto Card C",
      alt2cb: "+3%",
      footer: "Compared by PayAll AI",
      chip2: "Issuer Terms",
      chip3: "Fee Info",
    },
    why: {
      label: "Why PayAll",
      title: "Why Compare Crypto Cards Here",
      b1title: "Compare Crypto Card Options",
      b1desc:
        "Compare third-party card providers that may support digital-asset funding and broad merchant acceptance. Review issuer terms before applying.",
      b2title: "Protect Your Privacy",
      b2desc:
        "Use a privacy-first comparison experience. PayAll is designed to minimize personal data collection and does not intentionally collect private keys, mnemonic phrases, wallet passwords, or card account credentials.",
      b3title: "Review Potential Rewards",
      b3desc:
        "Compare publicly available cashback, fee, and promotional information from third-party issuers. Actual rewards and fees depend on issuer terms.",
    },
    vision: {
      label: "Our Vision",
      title: "The Future of Crypto Card Comparison",
      subtitle:
        "We're building an intelligence layer for crypto card information — AI-assisted comparisons that help users review third-party card features before applying or using a card.",
      v1title: "Real-Time Market Intelligence",
      v1desc: "Our AI monitors publicly available crypto card information — rates, promotions, and fee changes — to help you stay informed.",
      v2title: "AI-Assisted Comparison",
      v2desc: "Machine learning models compare card information, fees, and rewards to help you identify options before you make a purchase.",
      v3title: "Privacy-First Design",
      v3desc: "PayAll follows a privacy-first design and is built to minimize personal data collection while protecting user data through appropriate technical safeguards.",
    },
    howItWorks: {
      label: "How It Works",
      title: "Four Steps to Smarter Card Comparison",
      s1title: "Share Your Needs",
      s1desc: "Tell us your preferences, expected use cases, preferred currencies, and what matters most to you.",
      s2title: "AI Compares Information",
      s2desc: "Our engine compares publicly available data — merchant categories, reward structures, and disclosed fee schedules.",
      s3title: "Review Comparison Results",
      s3desc: "View AI-assisted card comparisons ranked by your stated priorities, with transparent rationale for reference.",
      s4title: "Review Before You Decide",
      s4desc: "Use the comparison results as a reference before choosing or using a third-party card.",
    },
    features: {
      label: "Features",
      title: "What Can PayAll Do For You?",
      f1title: "AI-Assisted Card Suggestions",
      f1desc:
        "Get AI-assisted card suggestions based on user-selected preferences and publicly available card information. Recommendations are informational only.",
      f2title: "Compare Benefits & Fees",
      f2desc:
        "Compare publicly available cashback rates, fees, limited-time promotions, and perks by merchant category for reference.",
      f3title: "Dynamic Market Monitoring",
      f3desc:
        "Card benefits change constantly. PayAll tracks publicly available rates, new card lines, and promotional periods across the crypto card market for reference.",
      f4title: "Privacy by Design",
      f4desc:
        "PayAll is designed to minimize personal data collection and protect user data through appropriate technical safeguards.",
      disclaimer:
        "Recommendations are for informational purposes only and do not constitute financial, payment, legal, or suitability advice. Please review card issuer terms before applying or using a card.",
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
      title: "Ready to Compare Smarter?",
      subtitle: "Join crypto users reviewing card features, fees, and rewards with AI-assisted comparisons.",
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
      eyebrow: "AI 辅助加密卡比较",
      headline1: "AI 辅助",
      headline2: "加密卡",
      headline3: "比较",
      subtitle:
        "你的 AI 辅助加密卡比较助手。集中查看第三方卡片功能、返现、费用和隐私相关信息。",
      cta: "免费开始使用",
      stat1val: "100+",
      stat1label: "加密卡全面分析",
      stat2val: "8%",
      stat2label: "最高返现比例",
      stat3val: "4000万+",
      stat3label: "全球可用商户",
    },
    heroCard: {
      header: "AI 比较",
      live: "预览",
      scene: "在星巴克消费前 — ¥34.00",
      bestLabel: "参考匹配",
      bestCard: "加密卡 A",
      cashback: "+8% 返现",
      save: "参考节省 ¥2.72",
      alt1: "加密卡 B",
      alt1cb: "+4%",
      alt2: "加密卡 C",
      alt2cb: "+3%",
      footer: "由 PayAll AI 比较",
      chip2: "发卡方条款",
      chip3: "费用说明",
    },
    why: {
      label: "为什么选择 PayAll",
      title: "为什么在这里比较加密卡",
      b1title: "比较加密卡选项",
      b1desc:
        "比较可能支持数字资产充值和全球商户网络的第三方卡商。申请前请阅读发卡方条款。",
      b2title: "保护你的隐私",
      b2desc:
        "使用隐私优先的比较体验。PayAll 旨在尽量减少个人数据收集，且不会有意收集私钥、助记词、钱包密码或卡账户凭证。",
      b3title: "查看潜在权益",
      b3desc:
        "比较第三方发卡方公开的返现、费用和促销信息；实际返现和费用以发卡方条款为准。",
    },
    vision: {
      label: "我们的愿景",
      title: "加密卡比较的未来",
      subtitle:
        "我们正在构建面向加密卡信息的智能层 — 通过 AI 辅助比较，帮助用户在申请或使用第三方卡片前查看相关功能信息。",
      v1title: "市场信息监测",
      v1desc: "AI 持续监测公开的加密卡生态信息 — 费率、促销和规则变化 — 帮助你了解可参考的信息。",
      v2title: "AI 辅助比较",
      v2desc: "机器学习模型会比较卡片信息、费用与权益，帮助你在消费前识别可选方案。",
      v3title: "隐私优先设计",
      v3desc: "PayAll 采用隐私优先设计，旨在尽量减少个人数据收集，并通过适当技术措施保护用户数据。",
    },
    howItWorks: {
      label: "使用流程",
      title: "四步开启智能卡片比较",
      s1title: "分享你的需求",
      s1desc: "告诉我们你的偏好、预期使用场景、偏好币种和最看重的因素。",
      s2title: "AI 比较信息",
      s2desc: "引擎比较公开数据 — 商户类别、返现结构、披露的费用规则。",
      s3title: "查看比较结果",
      s3desc: "查看按你声明优先级排序的 AI 辅助卡片比较，附可追溯的参考依据。",
      s4title: "决策前查看",
      s4desc: "在选择或使用第三方卡片前，将比较结果作为参考。",
    },
    features: {
      label: "核心功能",
      title: "PayAll 能为你做什么？",
      f1title: "AI 辅助卡片建议",
      f1desc:
        "基于你自主选择的偏好和公开卡片信息，提供 AI 辅助卡片建议；推荐内容仅供信息参考。",
      f2title: "比较权益与费用",
      f2desc:
        "比较不同商户类别下公开的返现、费用和限时优惠信息，帮助你发现可参考的卡片权益。",
      f3title: "动态市场监控",
      f3desc:
        "卡片权益持续变化。PayAll 持续跟踪公开的费率、新卡上线和促销活动，覆盖整个加密卡市场，供你参考。",
      f4title: "隐私优先设计",
      f4desc:
        "PayAll 旨在尽量减少个人数据收集，并通过适当技术措施保护用户数据。",
      disclaimer:
        "推荐内容仅供信息参考，不构成金融、支付、法律或适用性建议。申请或使用任何卡片前，请查看发卡方条款。",
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
      title: "准备好更聪明地比较了吗？",
      subtitle: "加入正在通过 AI 辅助比较查看卡片功能、费用与权益的加密用户。",
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
    en: { role: "Overseas Freelancer", quote: "Before every trip abroad I used to compare card fees and rewards manually; now I want PayAll to help me review options before deciding." },
    zh: { role: "海外自由职业者", quote: "每次出国前都要手动比较卡片费用和权益，现在希望 PayAll 帮我在决策前查看选项。" },
  },
  {
    name: "Lydia",
    en: { role: "Web3 Head of Finance", quote: "Too many cashback cards with confusing fee rules; I really need a tool to compare them for me." },
    zh: { role: "Web3 财务负责人", quote: "返现卡太多，费率规则太复杂，真的需要一个工具帮我对比。" },
  },
  {
    name: "Neo",
    en: { role: "Crypto Card Researcher", quote: "I want a clearer way to compare card requirements, fees, and supported regions before applying — an aggregation platform like PayAll is exactly what I need." },
    zh: { role: "加密卡研究者", quote: "我希望在申请前更清楚地比较卡片要求、费用和支持地区 — PayAll 这样的聚合平台正是我需要的。" },
  },
  {
    name: "Jason",
    en: { role: "Heavy DeFi User", quote: "Opening, selecting, and comparing cashback cards is too much hassle; I hope PayAll can make the comparison process easier." },
    zh: { role: "DeFi 重度用户", quote: "开卡、选卡、比较返现太麻烦了，希望 PayAll 能让比较过程更简单。" },
  },
  {
    name: "Emily",
    en: { role: "Crypto Card User", quote: "Sometimes having too many cards makes them hard to compare; I look forward to PayAll helping me review relevant options." },
    zh: { role: "加密卡用户", quote: "有时候卡太多反而不好比较，期待 PayAll 帮我查看相关选项。" },
  },
  {
    name: "Leo",
    en: { role: "NFT Collector", quote: "Too many tokens and chains — I don't know which card providers support which features; it'd be great if PayAll could help compare them." },
    zh: { role: "NFT 收藏家", quote: "币种和链太多了，根本不知道哪些发卡方支持哪些功能，PayAll 能帮助比较就太好了。" },
  },
  {
    name: "Doris",
    en: { role: "Web3 Novice", quote: "Right now I have to compare fees myself before deciding; having AI-assisted comparisons makes the process clearer." },
    zh: { role: "Web3 新手用户", quote: "现在每次决策前都要自己比较手续费，有 AI 辅助比较会更清楚。" },
  },
  {
    name: "Vincent",
    en: { role: "Web3 Product Manager", quote: "No product on the market truly helps me compare cards — PayAll is the first heading in the right direction." },
    zh: { role: "Web3 产品经理", quote: "市面上没有产品真正帮我比卡 — PayAll 是第一个方向正确的。" },
  },
  {
    name: "Chloe",
    en: { role: "On-chain Card User", quote: "Stop making me compare cards manually and miss useful information — PayAll, launch now!" },
    zh: { role: "链上卡片用户", quote: "别再让我手动比较卡片、错过有用信息了 — PayAll 赶紧上线！" },
  },
  {
    name: "Ken",
    en: { role: "Crypto Project Founder", quote: "The AI-assisted card comparison feature alone makes me want to start using it immediately." },
    zh: { role: "加密项目创始人", quote: "光是‘AI 辅助卡片比较’这个功能，就让我想立刻用起来。" },
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
            <div className="mockup-chip mockup-chip-2">{t.heroCard.chip2}</div>
            <div className="mockup-chip mockup-chip-3">{t.heroCard.chip3}</div>
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
        <p className="section-disclaimer reveal reveal-delay-4">{t.features.disclaimer}</p>
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
