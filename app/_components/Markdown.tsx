import type { ReactNode } from "react";

/** Renderizador de Markdown simples para os artigos do blog (sem dependências externas). */

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let index = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1]) {
      nodes.push(<strong key={`${keyPrefix}-b${index}`}>{match[1]}</strong>);
    } else {
      const href = match[3];
      const external = /^https?:\/\//.test(href);
      nodes.push(
        <a key={`${keyPrefix}-a${index}`} href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>{match[2]}</a>,
      );
    }
    last = pattern.lastIndex;
    index += 1;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function Markdown({ source }: { source: string }) {
  const blocks = source.trim().split(/\n\s*\n/);
  return (
    <>
      {blocks.map((rawBlock, blockIndex) => {
        const block = rawBlock.trim();
        const key = `b${blockIndex}`;
        if (block.startsWith("### ")) return <h3 key={key}>{renderInline(block.slice(4), key)}</h3>;
        if (block.startsWith("## ")) return <h2 key={key}>{renderInline(block.slice(3), key)}</h2>;
        const lines = block.split("\n").map((line) => line.trim());
        if (lines.every((line) => /^[-*] /.test(line))) {
          return <ul key={key}>{lines.map((line, i) => <li key={i}>{renderInline(line.slice(2), `${key}-${i}`)}</li>)}</ul>;
        }
        if (lines.every((line) => /^\d+\. /.test(line))) {
          return <ol key={key}>{lines.map((line, i) => <li key={i}>{renderInline(line.replace(/^\d+\. /, ""), `${key}-${i}`)}</li>)}</ol>;
        }
        if (block.startsWith("> ")) return <blockquote key={key}>{renderInline(lines.map((l) => l.replace(/^> ?/, "")).join(" "), key)}</blockquote>;
        return <p key={key}>{renderInline(lines.join(" "), key)}</p>;
      })}
    </>
  );
}
