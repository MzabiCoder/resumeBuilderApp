import type { FaqItem } from "./schema";

export const homeFaq: FaqItem[] = [
  {
    id: "different-resume-per-job",
    question: "Do I need a different resume for each job application?",
    answer: [
      "Not a whole new resume — but you should tailor it. Keep one complete “master” resume, then for each application adjust your summary, reorder your skills and tweak your top bullet points so they mirror the language in the job post.",
      "Recruiters and applicant tracking systems both look for that match, and a tailored resume consistently gets more callbacks than a generic one. In our builder, click **Duplicate**, paste the job description, and let the AI highlight missing keywords and suggest edits. It usually takes about 10 minutes.",
    ],
  },
  {
    id: "choose-template",
    question: "How do I choose the right resume template?",
    answer: [
      "Start with your field and your experience level. Finance, law, government and healthcare favour clean, traditional layouts. Tech, marketing and startups are comfortable with modern designs. Creative roles can show more personality.",
      "If you’re applying to large employers that use applicant tracking systems, a single-column **ATS-optimized** template is the safest choice. Early in your career? Pick a template that puts education and skills near the top. Every template uses real, selectable text and standard headings, and you can switch templates any time without losing your content.",
    ],
  },
  {
    id: "is-it-free",
    question: "“Free resume builder” usually doesn’t mean free. Is this one actually free?",
    answer: [
      "Yes. Building your resume, using the AI writer and downloading as PDF or Word are all free — no trial that turns into a subscription, no credit card, no watermark and no paywall at the download button.",
      "You don’t even need an account to download; you only need one to save your documents and come back later.",
    ],
    todo: "Before launch: add one honest sentence on how the site is funded.",
  },
  {
    id: "sell-my-information",
    question: "Does this site sell my information?",
    answer: [
      "No. We don’t sell or rent your personal information to anyone. Your resume content is used only to provide the service to you.",
      "When you use AI features, the relevant text is sent to our AI provider to generate a response, and under our provider’s API terms it isn’t used to train their models. Uploaded files are deleted right after we extract the text. You can export or permanently delete all your data any time from the **Privacy Center**.",
    ],
    todo: "Verify the AI-provider training claim against current API terms before launch.",
  },
  {
    id: "ats-friendly",
    question: "What does ATS-friendly mean?",
    answer: [
      "Most medium and large employers use an Applicant Tracking System (ATS) — software that reads your resume, pulls out your details and helps recruiters search and rank candidates. An ATS-friendly resume is one that software can read correctly.",
      "That means real text instead of images, standard section headings like “Experience” and “Education,” simple formatting without complex tables or text boxes, common fonts, and keywords that match the job post. All our templates parse cleanly, and the **ATS check** in the final step flags anything that could cause trouble.",
    ],
  },
  {
    id: "resume-review",
    question: "Can I have my resume reviewed?",
    answer: [
      "Yes — instantly and for free. Our AI review gives your resume a strength score, checks it for ATS compatibility and gives specific, section-by-section suggestions, such as weak bullets, missing metrics or skills to add. Paste a job description and it will also show how well your resume matches that role.",
      "We also recommend having a trusted mentor or colleague in your field read it before you apply; a second pair of human eyes catches things software can’t.",
    ],
  },
  {
    id: "how-long",
    question: "How long does it take?",
    answer: [
      "Most people finish in 10–15 minutes. With **Full AI** mode, a complete first draft takes under a minute — then you review, fill in any placeholders and download.",
    ],
  },
  {
    id: "upload-existing",
    question: "Can I upload my existing resume?",
    answer: [
      "Yes — PDF or Word, up to 5 MB. We import it into the builder so you can edit, restyle and improve it, and we can give it an instant AI review. The original file is deleted as soon as the text is extracted.",
    ],
  },
  {
    id: "pdf-or-word",
    question: "Should I download as PDF or Word?",
    answer: [
      "Use **PDF** by default — it looks exactly the same on every device and our PDFs contain real, selectable text that applicant tracking systems can read. Choose **Word** if the employer asks for it or wants to edit the document.",
    ],
  },
];
