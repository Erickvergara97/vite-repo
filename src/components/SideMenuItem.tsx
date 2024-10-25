interface Props {
  href?: string
  children: React.ReactNode
}

export default function SideMenuItem({ href, children }: Props) {
  return (
    <li>
      <a
        className='flex gap-4 text-zinc-400 hover:text-zinc-100 items-center'
        href={href}
      >
        {children}
      </a>
    </li>
  )
}
