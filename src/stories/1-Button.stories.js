import React from 'react'
import { action } from '@storybook/addon-actions'
import { Button } from '@storybook/react/demo'
import { withNotes, withMarkdownNotes } from '@storybook/addon-notes'
import { withA11y } from '@storybook/addon-a11y'

export default {
  title: 'Button',
  component: Button,
  decorators: [withA11y],
}

export const Text = () => (
  <Button onClick={action('clicked')}>Hello Button</Button>
)

export const Emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
)

export const TextWithNotes = () => (
  <Button onClick={action('clicked')}>Hello Button</Button>
)

const markdown = `
# Hello World

This is some code showing usage of the component and other inline documentation

~~~js
<div>
  hello world!
  <TextWithNotes />
</div>
~~~
  `

TextWithNotes.story = {
  name: 'Text With Notes',
  parameters: {
    notes: { markdown },
  },
}
