export function HeaderLink({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <a href={href} className="block px-4 hover:text-zinc-400">
        <span className="capitalize">{text}</span>
      </a>
    </li>
  )
}
