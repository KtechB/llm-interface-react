import useWhisper from '@chengsokdara/use-whisper'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { DefaultApi, Configuration } from './api-client'
import Button from './components/Button'
import Dialog from './components/Dialog'
import Header from './components/Header'
import { useChatSocket } from './useChatSocket'

const config = new Configuration({ basePath: 'http://localhost:8000' }) // TODO: This is for dev
export const apiClient = new DefaultApi(config)

function App() {
  // const { inputText, setInputText, messages, onSubmit } = useChat(apiClient)
  const { inputText, setInputText, messages, onSubmit } = useChatSocket()
  const [apiKey, setApiKey] = useState<string>('')

  const key = apiKey === '' ? 'noapikey' : apiKey
  console.log(key)
  const {
    recording,
    speaking,
    transcribing,
    transcript,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: key, // YOUR_OPEN_AI_TOKEN
    // streaming: true,
    // timeSlice: 1_000, // 1 second
    whisperConfig: {
      language: 'ja',
    },
  })
  useEffect(() => setInputText(transcript.text ?? inputText), [transcript.text])

  return (
    <div className='flex flex-col h-full w-full justify-center'>
      <Header />
      <div className='flex flex-col h-full w-full items-center'>
        <div
          className={clsx(
            'flex flex-col justify-center h-full w-5/6 max-w-screen-md gap-5 p-5'
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
          <div>
            <p>Recording: {recording}</p>
            <p>Speaking: {speaking}</p>
            <p>Transcribing: {transcribing}</p>
            <p>Transcribed Text: {transcript.text}</p>
            <button
              className={clsx('active:bg-red-700')}
              onMouseDown={startRecording}
              onMouseUp={() => {
                stopRecording().then(() => onSubmit())
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z'
                />
              </svg>
            </button>
            <input
              type='password'
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
