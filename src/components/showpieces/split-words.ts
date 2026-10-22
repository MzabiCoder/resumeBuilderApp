/**
 * Wrap every word inside `el` in a <span data-word>, preserving nested markup
 * (e.g. <mark> placeholders). Works on whatever copy is present. `revert()`
 * restores the exact original DOM.
 */
export function splitWords(el: HTMLElement): { words: HTMLSpanElement[]; revert: () => void } {
  const original = el.innerHTML;
  const words: HTMLSpanElement[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

  for (const node of textNodes) {
    const parts = (node.textContent ?? "").split(/(\s+)/);
    const frag = document.createDocumentFragment();
    for (const part of parts) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        frag.append(part);
      } else {
        const span = document.createElement("span");
        span.dataset.word = "";
        span.style.display = "inline-block";
        span.textContent = part;
        words.push(span);
        frag.append(span);
      }
    }
    node.replaceWith(frag);
  }

  return {
    words,
    revert: () => {
      el.innerHTML = original;
    },
  };
}
