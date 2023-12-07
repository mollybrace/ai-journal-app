import { auth } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Home() {
  const {userId} = await auth()
  let href = userId ? "/journal" : "/new-user";
  console.log(href)


  return (
   <div className='w-screen h-screen bg-black flex justify-center items-center text-white'>
    <div className='w-full max-w-[750px] mx-auto'>
      <h1 className='text-6xl mb-4'>Journal</h1>
      <p className='text-white/60 mb-4'>Journal what you love, what you hate, what's in your head, what's important. Journaling organizes your thoughts; allows you to see things in a concrete way that otherwise you might not see.</p>

      <Link href={href}>
      <button className='bg-blue-600 px-4 py-2 rounded-lg text-xl'>Get started</button>
      </Link>
    </div> 
  
  </div>
  )
}
