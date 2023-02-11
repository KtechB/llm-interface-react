import { ComponentStory, ComponentMeta } from '@storybook/react'

import Dialog from './Dialog'

export default {
  title: 'Dialog',
  component: Dialog,
} as ComponentMeta<typeof Dialog>

const Template: ComponentStory<typeof Dialog> = (args) => <Dialog {...args} />

export const Default = Template.bind({})
Default.args = {
  messages: [
    { speakerId: 0, text: 'message1' },
    { speakerId: 1, text: 'message2' },
    { speakerId: 0, text: 'message3' },
  ],
}
