
import { GoogleGenAI } from "@google/genai";
import { ToolType, WritingMode } from '../types';
import { GLOBAL_SYSTEM_PROMPT } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const PROMPT_TEMPLATES: Record<ToolType, (input: string) => string> = {
  [ToolType.ARTICLE_REWRITER]: (input) => `Rewrite the following article. Rules: Improve clarity, SEO-friendly, natural transitions, keep length. Article:\n${input}`,
  [ToolType.GRAMMAR_FIXER]: (input) => `Correct grammar/spelling. Rules: Do not change meaning or tone. Output clean text. Text:\n${input}`,
  [ToolType.PARAPHRASER]: (input) => `Paraphrase in unique human-like way. Rules: Plagiarism-free, professional. Text:\n${input}`,
  [ToolType.TITLE_GENERATOR]: (input) => `Generate 5 SEO blog titles. Rules: Engaging, clear, max 60 chars. Topic:\n${input}`,
  [ToolType.META_DESCRIPTION]: (input) => `Generate 3 SEO meta descriptions. Rules: Max 155 chars, clickable. Topic:\n${input}`,
  [ToolType.BLOG_OUTLINE]: (input) => `Generate a detailed blog post outline for the topic: ${input}. Include H1, H2, and H3 suggestions.`,
  [ToolType.INTRO_GEN]: (input) => `Generate a compelling blog introduction for: ${input}. Hook the reader and state the value proposition.`,
  [ToolType.CONCLUSION_GEN]: (input) => `Generate a powerful conclusion for a blog post about: ${input}. Include a final thought and key takeaway.`,
  [ToolType.FAQ_GEN]: (input) => `Generate 5 SEO-friendly FAQs based on: ${input}. Use Schema-friendly formatting.`,
  [ToolType.EXPANDER]: (input) => `Expand the following content with more detail, examples, and depth without fluff:\n${input}`,
  [ToolType.SHORTENER]: (input) => `Condense the following text into a more concise version while keeping all core facts:\n${input}`,
  [ToolType.TONE_CHANGER]: (input) => `Rewrite the following text in three different tones (Formal, Casual, and Friendly):\n${input}`,
  [ToolType.KEYWORD_IDEAS]: (input) => `Generate 15 long-tail keyword ideas related to: ${input}. Include search intent for each.`,
  [ToolType.SEO_OPTIMIZER]: (input) => `Analyze and optimize the following text for better SEO performance and readability:\n${input}`,
  [ToolType.HEADING_GEN]: (input) => `Generate SEO-optimized H1, H2, and H3 headings for the following topic/text: ${input}`,
  [ToolType.SLUG_GEN]: (input) => `Generate 3 clean, SEO-friendly URL slugs for the title: ${input}`,
  [ToolType.SNIPPET_GEN]: (input) => `Write a concise paragraph (40-60 words) designed to win a Google Featured Snippet for the question: ${input}`,
  [ToolType.PAA_GEN]: (input) => `Generate 5 "People Also Ask" questions and short answers for: ${input}`,
  [ToolType.SENTENCE_REWRITER]: (input) => `Rewrite this sentence in 3 different ways while keeping the exact meaning:\n${input}`,
  [ToolType.PARAGRAPH_REWRITER]: (input) => `Rewrite this paragraph for better flow, impact, and professional quality:\n${input}`,
  [ToolType.PLAGIARISM_SAFE]: (input) => `Rewrite this content from scratch to ensure it is 100% original and will pass all plagiarism checkers:\n${input}`,
  [ToolType.ACTIVE_PASSIVE]: (input) => `Convert the following text from Active Voice to Passive Voice:\n${input}`,
  [ToolType.PASSIVE_ACTIVE]: (input) => `Convert the following text from Passive Voice to Active Voice for more impact:\n${input}`,
  [ToolType.AD_COPY]: (input) => `Generate 3 high-converting ad copies (Headline + Body) for this product/service: ${input}`,
  [ToolType.CTA_GEN]: (input) => `Generate 5 powerful, action-oriented Call-to-Action phrases for: ${input}`,
  [ToolType.EMAIL_SUBJECT]: (input) => `Generate 10 high-open-rate email subject lines for: ${input}`,
  [ToolType.PRODUCT_DESC]: (input) => `Write a persuasive, SEO-rich product description for: ${input}`,
  [ToolType.LANDING_PAGE]: (input) => `Create high-converting landing page copy structure (Headline, Sub-headline, Benefits, CTA) for: ${input}`,
  [ToolType.SOCIAL_CAPTION]: (input) => `Generate 3 engaging social media captions for this content: ${input}`,
  [ToolType.HASHTAG_GEN]: (input) => `Generate 20 trending and relevant hashtags for: ${input}`,
  [ToolType.YT_TITLE]: (input) => `Generate 5 viral, click-optimized (but honest) YouTube titles for: ${input}`,
  [ToolType.YT_DESC]: (input) => `Write an SEO-optimized YouTube video description for: ${input}. Include timestamps placeholders.`,
  [ToolType.YT_TAGS]: (input) => `Generate a comma-separated list of high-volume YouTube tags for: ${input}`,
  [ToolType.READABILITY_IMPROVER]: (input) => `Rewrite the following text to achieve a high readability score (grade 6-8 level):\n${input}`,
  [ToolType.SIMPLIFIER]: (input) => `Simplify this complex information so a 10-year-old could understand it:\n${input}`,
  [ToolType.KEYWORD_DENSITY]: (input) => `Analyze the keyword usage in this text and suggest 3 improvements for better balance:\n${input}`,
  [ToolType.SEO_CHECKLIST]: (input) => `Create a custom SEO checklist for a blog post about: ${input}`,
  
  // NEW TOOLS
  [ToolType.AI_HUMANIZER]: (input) => `Rewrite the following text to bypass AI detection. 
    Rules:
    - Increase burstiness and perplexity.
    - Use natural human-like phrasing.
    - Vary sentence length and structure significantly.
    - Avoid robotic repetition.
    - Maintain the original core meaning.
    Text:\n${input}`,
    
  [ToolType.CONTENT_REPURPOSER]: (input) => `Repurpose the following content into:
    1. A thread of 5 Tweets.
    2. A professional marketing email.
    3. A short LinkedIn post summary.
    Original Content:\n${input}`,
    
  [ToolType.LONG_FORM_GEN]: (input) => `Write a complete, high-quality, long-form blog article (1000+ words) based on: ${input}.
    Include:
    - An engaging title.
    - A hook-filled introduction.
    - Detailed H2 and H3 sections with valuable info.
    - A strong conclusion.
    - Natural keyword placement throughout.`,
    
  [ToolType.CONTENT_GAP_ANALYZER]: (input) => `Analyze the following content and identify 5-7 "Content Gaps" (topics, questions, or details that are missing but should be there for a complete authority guide):
    Content:\n${input}`,
    
  [ToolType.COMPETITOR_ANALYZER]: (input) => `Act as an SEO expert. Analyze the competitor's topic or URL: ${input}.
    Provide:
    1. Their likely target keywords.
    2. Their content strategy strengths.
    3. A plan to outrank them with better content structure.`
};

export const generateWritingContent = async (
  tool: ToolType,
  input: string,
  mode: WritingMode = WritingMode.DEFAULT
): Promise<string> => {
  if (!input.trim()) return "Please provide some text to process.";

  let prompt = PROMPT_TEMPLATES[tool](input);
  
  if (tool === ToolType.ARTICLE_REWRITER) {
    if (mode === WritingMode.SEO) prompt += "\n- FOCUS: SEO optimization.";
    else if (mode === WritingMode.SIMPLE) prompt += "\n- FOCUS: Beginner English.";
    else if (mode === WritingMode.PROFESSIONAL) prompt += "\n- FOCUS: Business tone.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: GLOBAL_SYSTEM_PROMPT,
        temperature: 0.7,
      }
    });

    return response.text || "No content generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate content. Please try again.");
  }
};
