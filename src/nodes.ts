import { NodeSpec } from "prosemirror-model";

export type NumberedNode = {
  id: string | null;
  label: string | null;
  numbered: boolean;
};

export function readBooleanAttr(val?: string | boolean | null): boolean {
  if (val == null) return false;
  if (typeof val === 'boolean') return val;
  if (val?.toLowerCase() === 'false') return false;
  return true;
}

export function readBooleanDomAttr(dom: HTMLElement, attr: string): boolean {
  return readBooleanAttr(dom.getAttribute(attr));
}


export function getNumberedAttrs(dom: HTMLElement): any {
  return {
    id: dom.getAttribute('id') ?? null,
    numbered: readBooleanDomAttr(dom, 'numbered'),
    label: dom.getAttribute('label') ?? null,
  };
}


export function convertToBooleanAttribute(value: boolean) {
  return value ? '' : undefined;
}



export function setNumberedAttrs(
  attrs: Record<string, any>,
): Record<keyof NumberedNode, string | undefined> {
  return {
    id: attrs.id || undefined,
    numbered: convertToBooleanAttribute(attrs.numbered),
    label: attrs.label || undefined,
  };
}



const getAttrs = (level: number) => (dom: string | HTMLElement) => {
  if (typeof dom === 'string') return {}
  console.log('parsed', level, getNumberedAttrs(dom))
  return {
    ...getNumberedAttrs(dom),
    level,
  }
};

export const heading: NodeSpec = {
  attrs: {
    id: { default: null },
    label: { default: null },
    numbered: { default: false },
    level: { default: 1 },
  },
  content: `inline*`,
  group: 'block',
  defining: true,
  parseDOM: [
    { tag: 'h1', getAttrs: getAttrs(1) },
    { tag: 'h2', getAttrs: getAttrs(2) },
    { tag: 'h3', getAttrs: getAttrs(3) },
    { tag: 'h4', getAttrs: getAttrs(4) },
    { tag: 'h5', getAttrs: getAttrs(5) },
    { tag: 'h6', getAttrs: getAttrs(6) },
  ],
  toDOM(node) {
    console.log('to dom', node)
    return [`h${node.attrs.level}`, setNumberedAttrs(node.attrs), 0];
  },
}
