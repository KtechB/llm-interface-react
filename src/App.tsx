import clsx from 'clsx'
import { useState, useCallback } from 'react'

import Button from './components/Button'
import Dialog, { Message } from './components/Dialog'

function App() {
  const [inputText, setInputText] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([
    { speakerId: 1, text: 'Hello!' },
  ])
  const onSubmit = useCallback(() => {
    setMessages([...messages, { speakerId: 0, text: inputText }])
    setInputText('')
  }, [messages, inputText])

  return (
    <div className='App'>
      <div className={clsx('h-40 w-max-80')}>
        <Dialog messages={messages} />
        <input
          className='w-full'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Button onClick={onSubmit} />
      </div>
    </div>
  )
}

export default App
