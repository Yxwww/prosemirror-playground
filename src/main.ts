// schema {
// editor{
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { DOMParser } from 'prosemirror-model'
import { exampleSetup } from 'prosemirror-example-setup'
import { schema as baseSchema } from 'prosemirror-schema-basic'
import { Schema } from 'prosemirror-model'
import 'prosemirror-menu/style/menu.css'
import 'codemirror/lib/codemirror.css'
import { arrowHandlers, CodeBlockView } from './codemirror'
import 'codemirror/mode/javascript/javascript'

let baseNodes: any = baseSchema.spec.nodes
const schema = new Schema({
  nodes: baseNodes.update(
    'code_block',
    Object.assign({}, baseNodes.get('code_block'), { isolating: true })
  ),
  marks: baseSchema.spec.marks,
})

const editorDom = document.querySelector('#editor')
const content = document.querySelector('#content')
if (!editorDom || !content) {
  throw new Error('#editor or !content not found')
}
;(window as any).view = new EditorView(editorDom, {
  state: EditorState.create({
    doc: DOMParser.fromSchema(schema).parse(content),
    plugins: exampleSetup({ schema }).concat(arrowHandlers),
  }),
  nodeViews: {
    code_block: (node: any, view: any, getPos: any) =>
      new CodeBlockView(node, view, getPos),
  },
})
// }
