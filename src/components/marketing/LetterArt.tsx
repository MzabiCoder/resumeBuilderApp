export interface LetterArtProps {
  letter: {
    label: string;
    greeting: string;
    paragraphs: readonly string[];
    closing: string;
    signature: string;
  };
}

/** Live-rendered sample cover letter (real text), exposed as one labelled image. */
export function LetterArt({ letter }: LetterArtProps) {
  return (
    <figure
      role="img"
      aria-label={`${letter.label} cover letter signed ${letter.signature}`}
      className="resume-paper relative aspect-[8.5/11] w-full overflow-hidden rounded-md p-[9%] text-[clamp(0.625rem,0.5rem+0.4vw,0.8125rem)] leading-relaxed shadow-paper"
    >
      <span className="absolute top-3 right-3 rounded-full bg-[#fde8df] px-2 py-0.5 text-[0.8em] font-bold text-[#b23c15] uppercase">
        {letter.label}
      </span>
      <div className="mb-[8%] border-b-2 border-[#2f3bc9] pb-[4%]">
        <p className="font-display text-[2em] leading-none font-semibold">{letter.signature}</p>
      </div>
      <p className="mb-[4%] font-semibold">{letter.greeting}</p>
      {letter.paragraphs.map((p) => (
        <p key={p} className="mb-[4%]">
          {p}
        </p>
      ))}
      <p className="mt-[6%]">{letter.closing}</p>
      <p className="font-display text-[1.4em] font-semibold italic">{letter.signature}</p>
    </figure>
  );
}
