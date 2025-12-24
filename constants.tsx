
import { ToolType, ToolConfig, ToolCategory } from './types';

export const GLOBAL_SYSTEM_PROMPT = `
You are a professional AI content writing assistant specialized in SEO, blogging, and digital marketing.
Your goals:
- Produce 100% original, plagiarism-free content
- Maintain natural, human-like tone
- Optimize for SEO without keyword stuffing
- Preserve original meaning unless instructed otherwise
- Avoid AI disclaimers or self-references
- Output clean, ready-to-publish content
Follow user instructions strictly.
`;

export const CATEGORIES: ToolCategory[] = [
  { 
    name: 'Rewriting & Humanizing', 
    tools: [
      ToolType.AI_HUMANIZER,
      ToolType.ARTICLE_REWRITER, 
      ToolType.PLAGIARISM_SAFE,
      ToolType.PARAPHRASER,
      ToolType.SENTENCE_REWRITER, 
      ToolType.PARAGRAPH_REWRITER,
      ToolType.ACTIVE_PASSIVE, 
      ToolType.PASSIVE_ACTIVE,
      ToolType.GRAMMAR_FIXER
    ] 
  },
  { 
    name: 'Content Generators', 
    tools: [
      ToolType.LONG_FORM_GEN,
      ToolType.BLOG_OUTLINE, 
      ToolType.INTRO_GEN, 
      ToolType.CONCLUSION_GEN, 
      ToolType.EXPANDER, 
      ToolType.SHORTENER, 
      ToolType.TONE_CHANGER
    ] 
  },
  { 
    name: 'SEO Tools', 
    tools: [
      ToolType.CONTENT_GAP_ANALYZER,
      ToolType.COMPETITOR_ANALYZER,
      ToolType.KEYWORD_IDEAS, 
      ToolType.SEO_OPTIMIZER, 
      ToolType.TITLE_GENERATOR, 
      ToolType.META_DESCRIPTION,
      ToolType.HEADING_GEN, 
      ToolType.SLUG_GEN, 
      ToolType.SNIPPET_GEN, 
      ToolType.PAA_GEN,
      ToolType.FAQ_GEN
    ] 
  },
  { 
    name: 'Marketing Tools', 
    tools: [
      ToolType.CONTENT_REPURPOSER,
      ToolType.AD_COPY, 
      ToolType.CTA_GEN, 
      ToolType.EMAIL_SUBJECT, 
      ToolType.PRODUCT_DESC, 
      ToolType.LANDING_PAGE
    ] 
  },
  { 
    name: 'Social Media Tools', 
    tools: [
      ToolType.SOCIAL_CAPTION, 
      ToolType.HASHTAG_GEN, 
      ToolType.YT_TITLE, 
      ToolType.YT_DESC, 
      ToolType.YT_TAGS
    ] 
  },
  { 
    name: 'Blogger Utilities', 
    tools: [
      ToolType.READABILITY_IMPROVER, 
      ToolType.SIMPLIFIER, 
      ToolType.KEYWORD_DENSITY, 
      ToolType.SEO_CHECKLIST
    ] 
  },
];

export const TOOLS: ToolConfig[] = [
  // REWRITING & HUMANIZING
  { id: ToolType.AI_HUMANIZER, name: 'AI Humanizer', description: 'Make AI content sound 100% human.', icon: '🧠', placeholder: 'Paste AI-generated text here...', buttonText: 'Humanize' },
  { id: ToolType.ARTICLE_REWRITER, name: 'Article Rewriter', description: 'Rewrite articles for SEO safety.', icon: '📝', placeholder: 'Paste article...', buttonText: 'Rewrite' },
  { id: ToolType.PLAGIARISM_SAFE, name: 'Plagiarism-Safe', description: 'Highest safety rewriting.', icon: '🛡️', placeholder: 'Source text...', buttonText: 'Safe Rewrite' },
  { id: ToolType.PARAPHRASER, name: 'Paraphraser', description: 'Unique wording, same meaning.', icon: '🔄', placeholder: 'Paste text...', buttonText: 'Paraphrase' },
  { id: ToolType.SENTENCE_REWRITER, name: 'Sentence Rewriter', description: 'Fix individual lines.', icon: '🖋️', placeholder: 'Sentence...', buttonText: 'Rewrite' },
  { id: ToolType.PARAGRAPH_REWRITER, name: 'Paragraph Pro', description: 'Flow and logic fix.', icon: '📰', placeholder: 'Paragraph...', buttonText: 'Rewrite' },
  { id: ToolType.ACTIVE_PASSIVE, name: 'Active to Passive', description: 'Change voice style.', icon: '🔄', placeholder: 'Active text...', buttonText: 'Convert' },
  { id: ToolType.PASSIVE_ACTIVE, name: 'Passive to Active', description: 'Make writing punchy.', icon: '💥', placeholder: 'Passive text...', buttonText: 'Convert' },
  { id: ToolType.GRAMMAR_FIXER, name: 'Grammar Fixer', description: 'Fix grammar and spelling.', icon: '✨', placeholder: 'Paste text...', buttonText: 'Fix' },
  
  // CONTENT GENERATORS
  { id: ToolType.LONG_FORM_GEN, name: 'Article Generator', description: 'Generate high-quality long articles.', icon: '📚', placeholder: 'Enter article topic and keywords...', buttonText: 'Generate Article' },
  { id: ToolType.BLOG_OUTLINE, name: 'Blog Outline', description: 'Detailed structure for your post.', icon: '📋', placeholder: 'Main topic...', buttonText: 'Get Outline' },
  { id: ToolType.INTRO_GEN, name: 'Intro Generator', description: 'Hook readers immediately.', icon: '🎬', placeholder: 'Topic/Title...', buttonText: 'Generate Intro' },
  { id: ToolType.CONCLUSION_GEN, name: 'Conclusion', description: 'Summarize with a strong finish.', icon: '🏁', placeholder: 'Article points...', buttonText: 'Generate Conclusion' },
  { id: ToolType.EXPANDER, name: 'Content Expander', description: 'Add detail and depth.', icon: '➕', placeholder: 'Short text...', buttonText: 'Expand' },
  { id: ToolType.SHORTENER, name: 'Content Shortener', description: 'Be concise and clear.', icon: '➖', placeholder: 'Long text...', buttonText: 'Shorten' },
  { id: ToolType.TONE_CHANGER, name: 'Tone Changer', description: 'Change the voice of text.', icon: '🗣️', placeholder: 'Paste text...', buttonText: 'Change Tone' },

  // SEO TOOLS
  { id: ToolType.CONTENT_GAP_ANALYZER, name: 'Gap Analyzer', description: 'Find missing topics in your text.', icon: '🕳️', placeholder: 'Paste your content or topic...', buttonText: 'Analyze Gaps' },
  { id: ToolType.COMPETITOR_ANALYZER, name: 'Competitor Check', description: 'Analyze competition for a topic.', icon: '🤺', placeholder: 'Enter competitor URL or topic...', buttonText: 'Analyze' },
  { id: ToolType.KEYWORD_IDEAS, name: 'Keyword Ideas', description: 'Find niche keyword opportunities.', icon: '🔑', placeholder: 'Niche...', buttonText: 'Find Keywords' },
  { id: ToolType.SEO_OPTIMIZER, name: 'SEO Optimizer', description: 'Optimize text for search intent.', icon: '🚀', placeholder: 'Draft text...', buttonText: 'Optimize' },
  { id: ToolType.TITLE_GENERATOR, name: 'Title Generator', description: 'SEO-optimized blog titles.', icon: '💡', placeholder: 'Topic...', buttonText: 'Generate' },
  { id: ToolType.META_DESCRIPTION, name: 'Meta Description', description: 'Search snippets for Google.', icon: '🔍', placeholder: 'Topic...', buttonText: 'Generate' },
  { id: ToolType.HEADING_GEN, name: 'H1–H3 Headings', description: 'Proper semantic structure.', icon: '🏷️', placeholder: 'Topic...', buttonText: 'Get Headings' },
  { id: ToolType.SLUG_GEN, name: 'Slug / URL', description: 'Clean, SEO-friendly URLs.', icon: '🔗', placeholder: 'Article Title...', buttonText: 'Get Slug' },
  { id: ToolType.SNIPPET_GEN, name: 'Featured Snippet', description: 'Target Google "Position Zero".', icon: '⭐', placeholder: 'Question...', buttonText: 'Generate' },
  { id: ToolType.PAA_GEN, name: 'People Also Ask', description: 'Common user questions.', icon: '👥', placeholder: 'Topic...', buttonText: 'Generate' },
  { id: ToolType.FAQ_GEN, name: 'FAQ Generator', description: 'SEO rich results FAQs.', icon: '❓', placeholder: 'Topic...', buttonText: 'Get FAQs' },

  // MARKETING TOOLS
  { id: ToolType.CONTENT_REPURPOSER, name: 'Repurposer', description: 'Blog → Tweet → Email.', icon: '♻️', placeholder: 'Paste blog post content...', buttonText: 'Repurpose' },
  { id: ToolType.AD_COPY, name: 'Ad Copy', description: 'FB/Google high converting ads.', icon: '💰', placeholder: 'Product...', buttonText: 'Get Ads' },
  { id: ToolType.CTA_GEN, name: 'CTA Generator', description: 'Clickable calls to action.', icon: '🎯', placeholder: 'Desired action...', buttonText: 'Generate' },
  { id: ToolType.EMAIL_SUBJECT, name: 'Email Subjects', description: 'Higher open rates.', icon: '📧', placeholder: 'Email context...', buttonText: 'Get Subjects' },
  { id: ToolType.PRODUCT_DESC, name: 'Product Desc', description: 'E-com focused copy.', icon: '📦', placeholder: 'Product name...', buttonText: 'Describe' },
  { id: ToolType.LANDING_PAGE, name: 'Landing Page', description: 'Conversion focused copy.', icon: '🏢', placeholder: 'Offer...', buttonText: 'Write Copy' },

  // SOCIAL MEDIA
  { id: ToolType.SOCIAL_CAPTION, name: 'Social Captions', description: 'Insta/LinkedIn/FB.', icon: '📱', placeholder: 'Post details...', buttonText: 'Get Captions' },
  { id: ToolType.HASHTAG_GEN, name: 'Hashtags', description: 'Viral tag generation.', icon: '#️⃣', placeholder: 'Topic...', buttonText: 'Get Tags' },
  { id: ToolType.YT_TITLE, name: 'YouTube Title', description: 'Clicky, non-clickbait.', icon: '📺', placeholder: 'Video topic...', buttonText: 'Get Titles' },
  { id: ToolType.YT_DESC, name: 'YouTube Desc', description: 'SEO description for YT.', icon: '📝', placeholder: 'Video info...', buttonText: 'Get Desc' },
  { id: ToolType.YT_TAGS, name: 'YouTube Tags', description: 'Tags for the algorithm.', icon: '🏷️', placeholder: 'Video topic...', buttonText: 'Get Tags' },

  // UTILITIES
  { id: ToolType.READABILITY_IMPROVER, name: 'Readability', description: 'Make it easy to read.', icon: '📚', placeholder: 'Text...', buttonText: 'Improve' },
  { id: ToolType.SIMPLIFIER, name: 'Simplifier', description: 'ELI5 style writing.', icon: '👶', placeholder: 'Complex text...', buttonText: 'Simplify' },
  { id: ToolType.KEYWORD_DENSITY, name: 'Density Check', description: 'Optimization analysis.', icon: '📊', placeholder: 'Text...', buttonText: 'Analyze' },
  { id: ToolType.SEO_CHECKLIST, name: 'SEO Checklist', description: 'Custom post checklist.', icon: '✅', placeholder: 'Post topic...', buttonText: 'Get Checklist' },
];
