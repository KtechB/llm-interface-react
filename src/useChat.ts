import { useCallback, useState } from 'react'

import { DefaultApi } from './api-client'
import { Message } from './components/Dialog'

export const useChat = (apiClient: DefaultApi) => {
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onSubmit = useCallback(() => {
    setMessages((ms) => [...ms, { speakerId: 1, text: inputText }])
    apiClient.runDummyLlmPost({ text: inputText }).then((x) => {
      addMessage(0, x.data.text)
    })
    setInputText('')
  }, [addMessage, setInputText, inputText])
  return { inputText, setInputText, messages, onSubmit }
}
