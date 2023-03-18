import { ComponentStory, ComponentMeta } from '@storybook/react'

import MarkdownRenderer from './MarkdonwRenderer'

export default {
  title: 'MarkdownRenderer',
  component: MarkdownRenderer,
} as ComponentMeta<typeof MarkdownRenderer>

const Template: ComponentStory<typeof MarkdownRenderer> = (args) => (
  <MarkdownRenderer {...args} />
)

const codeText = '```a = b```'
export const Default = Template.bind({})
Default.args = {
  markdown: `# This is a title\n\nThis is some text with **bold** and *italic* formatting.${codeText}`,
}
