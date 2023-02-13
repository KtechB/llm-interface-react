import clsx from 'clsx'
import { useState, useCallback, useEffect } from 'react'

import { DefaultApi, Configuration } from './api-client'
import Button from './components/Button'
import Dialog, { Message } from './components/Dialog'
import Header from './components/Header'

const config = new Configuration({ basePath: 'http://localhost:8000' }) // TODO: This is for dev
export const apiClient = new DefaultApi(config)

function App() {
  const [inputText, setInputText] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([
    { speakerId: 0, text: 'Hello!' },
  ])
  const addMessage = useCallback(
    (speakerId: number, text: string) => {
      setMessages((ms) => [...ms, { speakerId: speakerId, text: text }])
    },
    [setMessages]
  )
  const onSubmit = useCallback(() => {
    setMessages((ms) => [...ms, { speakerId: 1, text: inputText }])
    apiClient.runDummyLlmPost({ text: inputText }).then((x) => {
      addMessage(0, x.data.text)
    })
    setInputText('')
  }, [addMessage, setInputText, inputText])

  return (
    <div className='flex flex-col h-full w-full justify-center'>
      <Header />
      <div className='flex flex-col h-full w-full items-center'>
        <div
          className={clsx(
            'flex flex-col justify-center h-full w-5/6 gap-5 p-5'
          )}
        >
          <Dialog messages={messages} />
          <div id='input_form' className={clsx('flex flex-row gap-3')}>
            <input
              className='w-full'
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <Button onClick={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
