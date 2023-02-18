import clsx from 'clsx'

import { DefaultApi, Configuration } from './api-client'
import Button from './components/Button'
import Dialog from './components/Dialog'
import Header from './components/Header'
import { useChat } from './useChat'

const config = new Configuration({ basePath: 'http://localhost:8000' }) // TODO: This is for dev
export const apiClient = new DefaultApi(config)

function App() {
  const { inputText, setInputText, messages, onSubmit } = useChat(apiClient)
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
        </div>
      </div>
    </div>
  )
}

export default App
