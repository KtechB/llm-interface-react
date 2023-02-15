import clsx from 'clsx'

export type DialogProps = {
  messages: Message[]
}
export type Message = {
  speakerId: number
  text: string
}

export default function Dialog({ messages }: DialogProps) {
  return (
    <ul className=' flex flex-col h-full w-full gap-2'>
      {messages.map((message) => (
        <li
          className={clsx(
            'flex ',
            message.speakerId === 0 ? 'justify-start' : 'justify-end'
          )}
          key={message.text}
        >
          <div
            className={clsx(
              'relative max-w-[80%] px-4 py-2  rounded shadow dark:bg-gray-800'
            )}
          >
            <span className='block'>{message.text}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
