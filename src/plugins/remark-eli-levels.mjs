/**
 * Remark plugin that transforms :::eli10 / :::eli15 / :::eli20 fenced blocks
 * into HTML <div data-eli-level="..."> wrappers.
 *
 * Requires blank lines around ::: markers so they parse as separate paragraphs.
 */
import { visit } from 'unist-util-visit';

const ELI_PATTERN = /^:::(eli(?:10|15|20))\s*$/;
const CLOSE_PATTERN = /^:::\s*$/;

export default function remarkEliLevels() {
  return (tree) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      if (!parent || index === undefined) return;

      const text = extractText(node);
      const match = text.match(ELI_PATTERN);
      if (!match) return;

      const level = match[1];
      const closeIdx = findClose(parent, index + 1);
      if (closeIdx === -1) return;

      const children = parent.children.slice(index + 1, closeIdx);

      const openHtml = {
        type: 'html',
        value: `<div data-eli-level="${level}">`,
      };
      const closeHtml = {
        type: 'html',
        value: `</div>`,
      };

      parent.children.splice(
        index,
        closeIdx - index + 1,
        openHtml,
        ...children,
        closeHtml,
      );
    });
  };
}

function extractText(node) {
  if (node.type === 'text') return node.value;
  if (node.children) return node.children.map(extractText).join('');
  return '';
}

function findClose(parent, startIdx) {
  for (let i = startIdx; i < parent.children.length; i++) {
    const child = parent.children[i];
    if (child.type === 'paragraph') {
      const text = extractText(child);
      if (CLOSE_PATTERN.test(text.trim())) return i;
      if (ELI_PATTERN.test(text.trim())) return -1;
    }
  }
  return -1;
}
