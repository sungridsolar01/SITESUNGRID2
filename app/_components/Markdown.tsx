import type { ReactNode } from "react";

/**
 * Renderizador de Markdown simples para os artigos do blog (sem dependências externas).
 * Suporta: ## e ### títulos, parágrafos, listas (- e 1.), checklists (- [ ] / - [x]),
 * tabelas (| a | b |), citações (>), **negrito**, *itálico* e [links](/caminho/).
 */

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)|\*([^*\s][^*]*?)\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let index = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1]) {
      nodes.push(<strong key={`${keyPrefix}-b${index}`}>{renderInline(match[1], `${keyPrefix}-b${index}`)}</strong>);
    } else if (match[4]) {
      nodes.push(<em key={`${keyPrefix}-i${index}`}>{match[4]}</em>);
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

function splitRow(line: string) {
  return line.replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function renderTable(lines: string[], key: string) {
  const [head, , ...rows] = lines;
  return (
    <div className="blog-table" key={key} role="region" aria-label="Tabela" tabIndex={0}>
      <table>
        <thead><tr>{splitRow(head).map((cell, i) => <th key={i} scope="col">{renderInline(cell, `${key}-h${i}`)}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>{splitRow(row).map((cell, i) => <td key={i}>{renderInline(cell, `${key}-${r}-${i}`)}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderBlock(block: string, key: string): ReactNode {
  if (block.startsWith("### ")) return <h3 key={key}>{renderInline(block.slice(4), key)}</h3>;
  if (block.startsWith("## ")) return <h2 key={key}>{renderInline(block.slice(3), key)}</h2>;
  const lines = block.split("\n").map((line) => line.trim());
  if (lines.length >= 2 && lines.every((line) => line.startsWith("|")) && /^\|?\s*:?-{3,}/.test(lines[1])) return renderTable(lines, key);
  if (lines.every((line) => /^[-*] \[[ xX]\] /.test(line))) {
    return (
      <ul className="blog-checklist" key={key}>
        {lines.map((line, i) => {
          const done = /^[-*] \[[xX]\]/.test(line);
          return <li key={i}><span className="blog-check" aria-hidden="true">{done ? "☑" : "☐"}</span>{renderInline(line.slice(6), `${key}-${i}`)}</li>;
        })}
      </ul>
    );
  }
  if (lines.every((line) => /^[-*] /.test(line))) {
    return <ul key={key}>{lines.map((line, i) => <li key={i}>{renderInline(line.slice(2), `${key}-${i}`)}</li>)}</ul>;
  }
  if (lines.every((line) => /^\d+\. /.test(line))) {
    return <ol key={key}>{lines.map((line, i) => <li key={i}>{renderInline(line.replace(/^\d+\. /, ""), `${key}-${i}`)}</li>)}</ol>;
  }
  if (block.startsWith("> ")) return <blockquote key={key}>{renderInline(lines.map((l) => l.replace(/^> ?/, "")).join(" "), key)}</blockquote>;
  return <p key={key}>{renderInline(lines.join(" "), key)}</p>;
}

export function Markdown({ source }: { source: string }) {
  // Um título (## / ###) seguido de texto na linha de baixo vira dois blocos.
  const normalized = source.trim().replace(/^(#{2,3} [^\n]+)\n(?!\n)/gm, "$1\n\n");
  const blocks = normalized.split(/\n\s*\n/);
  return <>{blocks.map((rawBlock, blockIndex) => renderBlock(rawBlock.trim(), `b${blockIndex}`))}</>;
}
