import { useCallback, useEffect, useRef, useState } from 'react'

import { Message } from './components/Dialog'

export const useChatSocket = () => {
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

  const socketRef = useRef<WebSocket>()
  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8000/chat')
    socketRef.current = websocket

    const onMessage = (event: MessageEvent<string>) => {
      const text = JSON.parse(event.data).text ?? ''
      addMessage(0, text)
    }
    websocket.addEventListener('message', onMessage)

    return () => {
      websocket.close()
      websocket.removeEventListener('message', onMessage)
    }
  }, [])
  const onSubmit = useCallback(() => {
    setMessages((ms) => [...ms, { speakerId: 1, text: inputText }])
    socketRef.current?.send(inputText)
    setInputText('')
  }, [addMessage, setInputText, inputText])
  return { inputText, setInputText, messages, onSubmit }
}
