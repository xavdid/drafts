const monaco = require('monaco-editor')

monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
  noLib: true,
  allowNonTsExtensions: true
})

monaco.editor.create(document.getElementById('editor'), {
  value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
  language: 'javascript',
  minimap: {
    enabled: false
  },
  scrollBeyondLastLine: false
})
