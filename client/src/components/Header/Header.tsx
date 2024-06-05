import Link from 'next/link';

export default function Header() {
  return (
    <header className='bg-slate-400 text-white p-4 flex justify-between'>
      <Link href="/" className="logo">To-do</Link>
      <nav>
        <ul>
          <li>
            <Link href="#">Settings</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}