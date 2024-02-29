import { UserButton } from '@clerk/nextjs'
import Link from 'next/link';
import React from 'react'
interface props {
    children: any;
}

const links = [
    {href: "/", label: "Home"},
    {href: "/journal", label: "Journal"},
    {href: "/history", label: "History"},
]

const DashboardLayout = ({children}) => {
  return (
    <div className='h-screen w-screen relative'>
        <div className='absolute w-[200px] top-0 left-0 h-full border-r border-black/10'>
            <div className='font-bold text-xl flex justify-center py-4 border'>Mood</div>
            <ul>
                {links.map(link => (
                  <li key={link.href} className='px-2 py-6 text-xl'>
                    <Link href={link.href}>
                        {link.label}
                    </Link>
                  </li>  
                ) )}
            </ul>
        </div>
        <div className='ml-[200px] h-full'>
            <header className='relative h-[60px] border-b border-black/10'>
                <div className='h-full w-full px-6 flex items-center justify-end'>
                    <UserButton />
                </div>
            </header>
            <div className='h-[calc(100vh-60px)]'>{children}</div>
        </div>
    </div>
  )
}

export default DashboardLayout