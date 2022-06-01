import { EditorView, NodeView } from "prosemirror-view";
import { Node } from "prosemirror-model";

export class HeadingView implements NodeView {
  node: Node;

  view: EditorView;

  getPos?: () => number | undefined;

  contentDOM: HTMLHeadingElement;

  dom: HTMLHeadingElement;

  level: number;

  constructor(node: Node, view: EditorView, getPos: () => number | undefined, a: any, b: any) {
    console.log('constructor args', { node, view, getPos, a, b })
    const { id, level } = node.attrs as any;
    this.level = level;
    this.dom = document.createElement(`h${level}`) as HTMLHeadingElement;
    this.contentDOM = this.dom;
    if (id) this.dom.id = `x${id}`;
    this.node = node;
    this.view = view;
    this.getPos = getPos;
    console.log('constructed', node)
  }

  update(node: Node) {
    console.log('update', node)
    if (node.type.name !== 'heading') return false;

    const {
      attrs: { numbered, level },
    } = node;

    if (this.level !== level) return false;

    const isNumberEnabledInDom = this.dom.getAttribute('numbered') !== null;
    if (numbered !== isNumberEnabledInDom) {
      if (numbered) {
        this.dom.setAttribute('numbered', '');
      } else {
        this.dom.removeAttribute('numbered');
      }
    }
    return true;
  }
}


