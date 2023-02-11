import clsx from 'clsx'
export type ButtonProps = {
  onClick?: () => void
}

export default function Button({ onClick }: ButtonProps) {
  return (
    <div>
      <button className={clsx('px-4 py-2 border')} onClick={onClick}>
        Button
      </button>
    </div>
  )
}
