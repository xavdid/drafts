/* global prettier, plugins */
const monaco = require('monaco-editor')

monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
  noLib: true,
  allowNonTsExtensions: true,
  strictNullChecks: true
})

const editor = monaco.editor.create(document.getElementById('editor'), {
  // value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
  language: 'javascript',
  minimap: {
    enabled: false
  },
  scrollBeyondLastLine: false
})

editor.getModel().updateOptions({ tabSize: 2 })

document.getElementById('copy').onclick = () => {
  const p = editor.getPosition()
  editor.setSelection(editor.getModel().getFullModelRange())
  document.execCommand('copy')

  editor.setPosition(p) // clears selection

  console.log('copied')
}

document.getElementById('pretty').onclick = () => {
  const text = editor.getModel().getValue()
  const res = prettier.format(text, { parser: 'babel', plugins })

  editor.getModel().setValue(res)

  console.log('prettier')
}
