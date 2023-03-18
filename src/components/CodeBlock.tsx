// cite: https://zenn.dev/redpanda/articles/ab0832ce800bf3
import { CodeComponent } from 'react-markdown/lib/ast-to-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const customCode: CodeComponent = ({ inline, className, children }) => {
  const style = a11yDark
  const match = /language-(\w+)(:?.+)?/.exec(className || '')
  const lang = match && match[1] ? match[1] : ''
  const name = match && match[2] ? match[2].slice(1) : ''
  return !inline && match ? (
    <>
      {name && <span className=' py-1 px-2 text-xs'>{name}</span>}
      <SyntaxHighlighter
        style={style}
        language={lang}
        PreTag='div'
        className='md-codeblock'
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </>
  ) : (
    <code className='rounded-md bg-slate-800 '>{children}</code>
  )
}
export const CodeBlock = {
  code: customCode,
}
