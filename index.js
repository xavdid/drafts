/* global prettier, plugins */
const monaco = require('monaco-editor')

monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
  noLib: true,
  allowNonTsExtensions: true,
  strictNullChecks: true
})

const editor = monaco.editor.create(document.getElementById('editor'), {
  language: 'javascript',
  minimap: {
    enabled: false
  },
  scrollBeyondLastLine: false
})

editor.getModel().updateOptions({ tabSize: 2 })

document.getElementById('copy').onclick = () => {
  editor.focus()
  const p = editor.getPosition()

  editor.setSelection(editor.getModel().getFullModelRange())
  document.execCommand('copy')

  editor.setPosition(p) // clears selection
  const t = document.getElementById('copied-text')
  t.style.opacity = '1'

  setTimeout(() => (t.style.opacity = '0'), 2000)
}

document.getElementById('pretty').onclick = () => {
  const text = editor.getModel().getValue()
  const res = prettier.format(text, { parser: 'babel', plugins })

  editor.getModel().setValue(res)
}
