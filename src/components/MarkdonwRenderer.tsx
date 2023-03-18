import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { CodeBlock } from './CodeBlock'

interface MarkdownRendererProps {
  markdown: string
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  return (
    <div className='markdown-renderer'>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={CodeBlock}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer
