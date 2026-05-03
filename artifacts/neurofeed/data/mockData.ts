import { FeedItem, WeeklyReport } from '@/types';

export const MOCK_FEED: FeedItem[] = [
  {
    id: '1',
    title: 'GPT-5 Achieves Human-Level Reasoning in Complex Tasks',
    summary: 'OpenAI\'s latest model demonstrates unprecedented capabilities in multi-step reasoning, outperforming PhD students in mathematics and logic challenges. The model uses a novel reflective architecture that allows it to detect and correct its own errors mid-reasoning — a behavior previously unique to human cognition.',
    insights: [
      'Scores 95% on MATH benchmark vs 78% for GPT-4',
      'Self-correction mechanism reduces hallucinations by 60%',
      'Context window expanded to 2M tokens',
    ],
    source: 'Article',
    topic: 'AI Research',
    readTime: 6,
    publishedAt: '2h ago',
    thumbnail: 'ai',
    author: 'MIT Technology Review',
    eli5: 'A really smart computer program got even smarter. It can now check its own homework and fix mistakes before giving you an answer, just like you would re-read your essay.',
    businessImpact: 'Companies using AI for research, legal analysis, and financial modeling will see 3-5x productivity gains. Early adopters in knowledge industries gain significant competitive advantage.',
    futurePrediction: 'By 2026, AI reasoning models will handle 40% of white-collar analytical work autonomously. Human oversight shifts from execution to strategy.',
  },
  {
    id: '2',
    title: 'Reddit\'s Secret Algorithm That Predicts Stock Market Moves',
    summary: 'Researchers at Stanford discovered that sentiment patterns in WallStreetBets and investing subreddits can predict S&P 500 movements 48 hours in advance with 73% accuracy. The study analyzed 12 million posts over 3 years, revealing that retail investor emotion precedes institutional moves.',
    insights: [
      '73% prediction accuracy 48 hours in advance',
      'Emotion analysis outperforms traditional indicators',
      'Works best during high-volatility periods',
    ],
    source: 'Reddit',
    topic: 'Finance',
    readTime: 4,
    publishedAt: '5h ago',
    thumbnail: 'business',
    author: 'r/stocks',
    eli5: 'When lots of people on the internet get excited or scared about money stuff, the stock market tends to follow their feelings two days later.',
    businessImpact: 'Quant hedge funds are already integrating social sentiment APIs. Retail traders with sentiment tools can level the playing field against institutional traders.',
    futurePrediction: 'Social sentiment will become a required data stream for all institutional investors by 2027. SEC may begin regulating coordinated social media trading campaigns.',
  },
  {
    id: '3',
    title: 'Scientists Achieve Room-Temperature Superconductivity',
    summary: 'A team at Seoul National University has synthesized a material that conducts electricity with zero resistance at room temperature and ambient pressure. If independently verified, this would be the most significant physics discovery in a century, enabling lossless power grids, instant-charge batteries, and ultra-powerful MRI machines.',
    insights: [
      'Zero electrical resistance at 22°C and 1 atm pressure',
      'Material synthesized from copper and lead compounds',
      'Independent verification underway at 3 institutions',
    ],
    source: 'Article',
    topic: 'Science',
    readTime: 8,
    publishedAt: '1d ago',
    thumbnail: 'ai',
    author: 'Nature Physics',
    eli5: 'Electricity usually loses some power as heat when it travels through wires. Scientists found a material where no power is lost at all — like a water pipe with no leaks.',
    businessImpact: 'Could eliminate $1.5T in annual global energy waste. Electric vehicles, MRI machines, and power grids would be completely reinvented. Current semiconductor stocks face existential disruption.',
    futurePrediction: 'If verified, we\'ll see the first commercial applications in MRI and particle accelerators by 2028. Power grid transformation takes 15-20 years but begins immediately.',
  },
  {
    id: '4',
    title: 'Anthropic\'s Claude 4 Can Now "Think" for 10 Hours Straight',
    summary: 'Anthropic released Claude 4 with extended thinking mode, allowing the model to reason through complex problems over extended periods before responding. Early tests show it solving previously-unsolvable math proofs and writing production-ready code for entire software features independently.',
    insights: [
      'Extended thinking up to 36,000 tokens of internal reasoning',
      'Solves IMO competition problems with 89% accuracy',
      'Autonomously codes full features with test coverage',
    ],
    source: 'YouTube',
    topic: 'AI Research',
    readTime: 5,
    publishedAt: '3h ago',
    thumbnail: 'ai',
    author: 'Two Minute Papers',
    eli5: 'The AI now takes a long "thinking break" before answering, like a really smart student who reads the whole exam before picking up their pencil.',
    businessImpact: 'Software development timelines compress by 60-80%. Engineering teams shift to AI supervisors. First-mover companies in AI-native software development capture outsized market share.',
    futurePrediction: 'By end of 2025, AI will autonomously ship 30% of B2B SaaS features. Senior engineers become AI orchestrators, not coders.',
  },
  {
    id: '5',
    title: 'The Startup That\'s Replacing Real Estate Agents with AI',
    summary: 'Doma AI closed a $180M Series C after demonstrating that their AI agent can handle 94% of standard real estate transactions end-to-end — from property search to closing — without human intervention. The company processes over 2,000 transactions per month across 12 states.',
    insights: [
      '$180M raised at $1.2B valuation',
      '94% of transactions handled fully autonomously',
      '2,000+ monthly transactions across 12 US states',
    ],
    source: 'Article',
    topic: 'Startups',
    readTime: 4,
    publishedAt: '6h ago',
    thumbnail: 'business',
    author: 'TechCrunch',
    eli5: 'A computer program that helps people buy and sell houses without needing a human to do all the paperwork and negotiating. It\'s like having a really organized robot assistant.',
    businessImpact: 'Real estate agents face 40% job displacement by 2027. Title companies, mortgage brokers, and inspection services are next. Early-stage AI real estate plays still have 10x runway.',
    futurePrediction: 'AI-native real estate closes 80% of residential transactions by 2028. Traditional agent commissions collapse from 5-6% to under 1%.',
  },
  {
    id: '6',
    title: 'Meta\'s AR Glasses Are Better Than You Think',
    summary: 'Early developer reviews of Meta\'s Orion AR glasses reveal an experience dramatically ahead of competitors. The glasses overlay contextual information, enable live translation in 47 languages, and feature a neural interface for gesture control — all in a package that looks like normal eyewear.',
    insights: [
      'Neural interface reads finger gestures without touching device',
      'Live translation in 47 languages with 200ms latency',
      '6-hour battery life in a standard glasses form factor',
    ],
    source: 'YouTube',
    topic: 'Tech Hardware',
    readTime: 7,
    publishedAt: '12h ago',
    thumbnail: 'ai',
    author: 'Marques Brownlee',
    eli5: 'Imagine glasses that can show you information floating in the air, translate what anyone says in real time, and you control them just by moving your fingers in the air.',
    businessImpact: 'If consumer AR reaches iPhone-level adoption, it disrupts screens, keyboards, advertising, and retail. Meta positioned 3 years ahead of Apple in consumer AR.',
    futurePrediction: 'Mass market AR glasses arrive in 2026-2027. Physical retail and outdoor advertising reinvented by AR overlays by 2028.',
  },
  {
    id: '7',
    title: 'Why Sleep Is the Ultimate Performance Enhancer',
    summary: 'New research from UC Berkeley tracked 10,000 executives over 5 years and found that those sleeping 7-9 hours made 35% better decisions, had 40% higher creative output, and were 2.3x less likely to be terminated. Sleep quality predicted career trajectory better than IQ or education.',
    insights: [
      '35% better decision-making with 7-9 hours vs 5-6 hours',
      'Sleep quality predicts career trajectory better than IQ',
      'Deep sleep stages directly correlate with learning consolidation',
    ],
    source: 'Reddit',
    topic: 'Health & Performance',
    readTime: 5,
    publishedAt: '1d ago',
    thumbnail: null,
    author: 'r/science',
    eli5: 'Getting enough sleep is like charging your brain\'s batteries overnight. Without it, you make worse choices and forget things you learned — like a phone that\'s always at 20%.',
    businessImpact: 'Corporate wellness programs focused on sleep ROI are the next big HR trend. Sleep tech market (trackers, apps, smart mattresses) accelerates from $15B to $80B by 2030.',
    futurePrediction: '"Sleep optimization" becomes standard in elite professional development programs. Companies with mandatory rest policies outperform peers on innovation metrics.',
  },
  {
    id: '8',
    title: 'The Country Building an AI-Run Government',
    summary: 'Estonia is piloting an AI governance system where algorithms handle permit approvals, tax disputes, and social benefit allocations. The system processes 12 million decisions annually with a 3% human override rate — and citizen satisfaction scores are 28% higher than the previous human-run system.',
    insights: [
      '12 million government decisions handled by AI annually',
      'Only 3% of decisions require human override',
      'Citizen satisfaction up 28% compared to human bureaucracy',
    ],
    source: 'Article',
    topic: 'Policy & Society',
    readTime: 6,
    publishedAt: '2d ago',
    thumbnail: 'business',
    author: 'The Economist',
    eli5: 'A small country is testing letting computers make most government decisions, like approving permits and giving out benefits, instead of having people do it. People seem to prefer it!',
    businessImpact: 'GovTech becomes a $500B market as governments worldwide adopt AI for administrative functions. Companies building compliant AI governance infrastructure have massive tailwinds.',
    futurePrediction: '15 countries will have AI-first administrative systems by 2030. Democratic legitimacy questions force new "AI governance" constitutional frameworks.',
  },
  {
    id: '9',
    title: 'Biotech Startup Reverses Aging in Mice by 20 Years',
    summary: 'Rejuve Biosciences has published peer-reviewed results showing their gene therapy protocol reverses biological aging markers in mice by the equivalent of 20 human years. The treatment targets mitochondrial function and epigenetic clocks simultaneously, and human trials are planned for 2026.',
    insights: [
      'Biological age reversed by 20-year equivalent in mice',
      'Targets both mitochondria and epigenetic markers simultaneously',
      'Human trials planned for Q1 2026',
    ],
    source: 'Article',
    topic: 'Biotech',
    readTime: 7,
    publishedAt: '3d ago',
    thumbnail: 'ai',
    author: 'Science Magazine',
    eli5: 'Scientists found a way to make old mouse bodies act like young mouse bodies again, using a special treatment that fixes damage in tiny parts of their cells.',
    businessImpact: 'Longevity biotech sector explodes from $25B to $500B+ if human trials succeed. Insurance, retirement planning, and healthcare fundamentally restructured.',
    futurePrediction: 'First approved partial aging reversal treatment for humans by 2032. Life expectancy projections revised upward for people born after 2000.',
  },
  {
    id: '10',
    title: 'Nvidia\'s Next GPU Is 10x More Powerful Than H100',
    summary: 'Leaked benchmarks for Nvidia\'s Rubin architecture show 10x improvement in AI training performance over the H100. With HBM4 memory and a new interconnect fabric, Rubin can train a GPT-4 scale model in 8 hours instead of 90 days. Pre-orders are already oversubscribed by 18 months.',
    insights: [
      '10x AI training performance vs H100',
      'Trains GPT-4 scale models in 8 hours vs 90 days',
      'Pre-orders oversubscribed by 18 months already',
    ],
    source: 'Reddit',
    topic: 'Tech Hardware',
    readTime: 5,
    publishedAt: '4h ago',
    thumbnail: 'ai',
    author: 'r/hardware',
    eli5: 'Nvidia made a new super-powerful computer chip that makes AI learn 10 times faster. It\'s like upgrading from a bicycle to a sports car for AI training.',
    businessImpact: 'AI startups with early Rubin access leapfrog well-funded competitors. Cloud providers (AWS, Azure, GCP) race for allocation. Nvidia\'s moat deepens despite competition.',
    futurePrediction: 'Compute democratization lag extends — top AI labs maintain 2-3 year hardware advantage over startups. Open-source models fall further behind frontier labs.',
  },
  {
    id: '11',
    title: 'The Psychology of Going Viral in 2025',
    summary: 'A landmark study analyzing 50 million viral posts found the #1 predictor of virality is not controversy or humor — it\'s "moral elevation": content that makes people feel proud of humanity. Posts triggering elevation spread 4x faster than outrage content and generate 7x more meaningful engagement.',
    insights: [
      '"Moral elevation" emotion spreads 4x faster than outrage',
      'Generates 7x more meaningful engagement than controversy',
      'Works across all platforms and age demographics',
    ],
    source: 'YouTube',
    topic: 'Psychology',
    readTime: 4,
    publishedAt: '8h ago',
    thumbnail: null,
    author: 'Veritasium',
    eli5: 'The stuff that spreads the fastest online is content that makes you feel like "wow, people can be really great sometimes" — not angry or scared stuff like you might think.',
    businessImpact: 'Brand marketers shift budgets from controversy to "elevation marketing." Content creators who master this emotion build more loyal, monetizable audiences than outrage farmers.',
    futurePrediction: 'Platform algorithms explicitly reward elevation content by 2026 as regulatory pressure on outrage-driven engagement mounts.',
  },
  {
    id: '12',
    title: 'SpaceX Starship Completes First Full Earth Orbit',
    summary: 'SpaceX\'s Starship completed its first full orbital mission, deploying 20 Starlink satellites from a fully reusable second stage before both the ship and booster successfully landed. The milestone puts human Mars missions firmly within a 5-year window, with NASA Artemis moon landings accelerated to 2027.',
    insights: [
      'First fully reusable two-stage orbital vehicle',
      'Deployed 20 satellites before landing both stages',
      'Mars mission window now confirmed for 2029-2031',
    ],
    source: 'YouTube',
    topic: 'Space',
    readTime: 6,
    publishedAt: '1d ago',
    thumbnail: 'ai',
    author: 'Scott Manley',
    eli5: 'SpaceX flew their giant rocket all the way around the Earth and then landed it safely — both parts! This means they can reuse it like an airplane instead of throwing it away.',
    businessImpact: 'Launch costs fall 90% vs current market. Satellite internet, space manufacturing, and orbital tourism become economically viable. Defense and intelligence agencies rapidly expand orbital assets.',
    futurePrediction: 'By 2030, 50,000 satellites in low Earth orbit. Monthly human spaceflights become routine. First permanent lunar infrastructure established by 2028.',
  },
];

export const EXPLORE_TOPICS = [
  { id: 't1', name: 'AI Research', icon: 'cpu', count: 247 },
  { id: 't2', name: 'Startups', icon: 'trending-up', count: 189 },
  { id: 't3', name: 'Finance', icon: 'bar-chart-2', count: 156 },
  { id: 't4', name: 'Science', icon: 'zap', count: 134 },
  { id: 't5', name: 'Health', icon: 'heart', count: 98 },
  { id: 't6', name: 'Space', icon: 'star', count: 87 },
  { id: 't7', name: 'Biotech', icon: 'activity', count: 72 },
  { id: 't8', name: 'Psychology', icon: 'message-circle', count: 65 },
  { id: 't9', name: 'Policy', icon: 'globe', count: 54 },
  { id: 't10', name: 'Hardware', icon: 'box', count: 43 },
];

export const WEEKLY_REPORT: WeeklyReport = {
  weekLabel: 'Apr 28 — May 4',
  totalRead: 23,
  topTopics: [
    { topic: 'AI Research', count: 9, percentage: 0.39 },
    { topic: 'Startups', count: 5, percentage: 0.22 },
    { topic: 'Finance', count: 4, percentage: 0.17 },
    { topic: 'Science', count: 3, percentage: 0.13 },
    { topic: 'Space', count: 2, percentage: 0.09 },
  ],
  highlights: [
    'You deep-dived into GPT-5\'s reasoning architecture',
    'Explored 3 breakthroughs in biotech longevity research',
    'Followed the real estate AI disruption story from seed to Series C',
  ],
  learningStreak: 12,
};

export const AI_CHAT_RESPONSES: Record<string, string> = {
  default: 'That\'s a fascinating question. Based on your feed and recent knowledge trends, here\'s what I\'m seeing...',
};

export const SUGGESTED_PROMPTS = [
  'What happened in AI this week?',
  'Explain quantum computing simply',
  'Top startup opportunities in 2025',
  'How does sleep affect performance?',
  'What is the most important tech trend?',
];

export function getAIResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('ai') || lower.includes('gpt') || lower.includes('llm') || lower.includes('model')) {
    return 'This week in AI was explosive. GPT-5 dropped with a self-correction mechanism that cuts hallucinations by 60%. Anthropic\'s Claude 4 can now think for hours before responding — it solved IMO math problems with 89% accuracy. The consensus from researchers: we\'re entering the reasoning era of AI, where models don\'t just pattern-match — they actually think. The practical impact? Software development timelines compress 60-80%. Engineers become AI orchestrators, not coders. If you\'re building anything, this changes your roadmap.';
  }

  if (lower.includes('startup') || lower.includes('business') || lower.includes('invest')) {
    return 'The most interesting startup opportunities right now cluster around AI-enabled service replacement. Real estate, legal, accounting, and healthcare admin are all being automated at the transaction level — not just assisted. The pattern: take a high-margin service business, identify the 90% of work that\'s procedural, and replace it with AI. Early movers are seeing 94% automation rates. The remaining 10% that requires judgment is where humans stay — and that\'s where premium pricing goes. Which sector are you most interested in?';
  }

  if (lower.includes('sleep') || lower.includes('health') || lower.includes('performance')) {
    return 'The UC Berkeley study is the most compelling performance research in years. 7-9 hours of sleep predicts career trajectory better than IQ or education — that\'s a stunning finding. The mechanism: deep sleep consolidates everything you learned that day into long-term memory. Without it, you\'re writing to RAM that gets wiped. The executives who slept well made 35% better decisions. The sleep-deprived ones couldn\'t even accurately assess their own impairment. Practical takeaway: treat sleep as a cognitive performance tool, not rest. Non-negotiable 8 hours gives you a measurable edge.';
  }

  if (lower.includes('quantum') || lower.includes('physics') || lower.includes('science')) {
    return 'Quantum computing is best understood through the "superposition" concept. Classical computers use bits — 0 or 1. Quantum computers use qubits that can be 0, 1, or both simultaneously until observed. This lets them explore millions of solutions in parallel instead of sequentially. Current quantum computers are still "noisy" — prone to errors — but error correction is advancing rapidly. The practical timeline: quantum advantage over classical computers in chemistry simulation and optimization by 2027-2028. Cryptography disruption (breaking RSA encryption) is further out — 2030-2035. The most urgent application is drug discovery and materials science.';
  }

  if (lower.includes('space') || lower.includes('spacex') || lower.includes('mars')) {
    return 'SpaceX completing the first orbital Starship mission is genuinely historic. Both stages — ship and booster — landed successfully. This means full reusability is real, not theoretical. Launch costs are about to drop 90% vs the current market. The downstream effects: 50,000 satellites in low Earth orbit by 2030, making global internet access universal. Space manufacturing becomes viable — zero-gravity production of pharmaceuticals, semiconductors, and fiber optics. Human Mars missions in the 2029-2031 window are now credible. The most underrated opportunity: the space economy shifts from launch to on-orbit services and in-space manufacturing.';
  }

  if (lower.includes('trend') || lower.includes('future') || lower.includes('predict')) {
    return 'The five most significant trends reshaping everything right now:\n\n1. **AI Reasoning Models** — systems that think, not just pattern-match. Changes software, research, medicine.\n\n2. **Room-Temp Superconductivity** — if verified, it\'s the century\'s most important physics discovery. Lossless energy, instant EV charging.\n\n3. **Longevity Biotech** — reversal of aging markers in animal models. Human trials 2026. Insurance and retirement planning face reinvention.\n\n4. **Consumer AR** — Meta\'s Orion glasses work. The smartphone paradigm shifts in the next 3-5 years.\n\n5. **AI Governance** — the first governments running AI-native administration. 15 countries by 2030.\n\nWhich of these do you want to go deeper on?';
  }

  return 'Great question. Based on the latest research and trends in your feed, here\'s what stands out: the convergence of AI reasoning capabilities and biological science is creating a unique moment where knowledge itself becomes the most valuable asset. The people who understand these shifts earliest — and act on them — will have disproportionate impact. What specific domain are you most focused on? I can pull the most relevant signals for you.';
}
