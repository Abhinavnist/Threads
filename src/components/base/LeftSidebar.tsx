import { Bell, Home, Search, User2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function LeftSidebar() {
  return (
    <div className='h-screen border-r-2 md:w-1/4 lg:p-10 md:pt-5 hidden md:block'>
        <div className='flex justify-start itmes-center'>
            <Image src="/images/logo.svg" width={50} height={50} alt='logo'/>
            <h1 className='font-bold text-xl ml-2'>Threads</h1>
        </div>
        <ul className='mt-10'>
            <li>
               <Link href="/" className='flex items-center justify-start space-x-4'><Home height={25} width={25}/><h3 className='text-lg lg:text-lg'>Home</h3></Link> 
            </li>
            <li>
               <Link href="/" className='flex items-center justify-start space-x-4'><Search height={25} width={25}/><h3 className='text-lg lg:text-lg'>Explore</h3></Link> 
            </li>
            <li>
               <Link href="/" className='flex items-center justify-start space-x-4'><Bell height={25} width={25}/><h3 className='text-lg lg:text-lg'>Notification</h3></Link> 
            </li>
            <li>
               <Link href="/" className='flex items-center justify-start space-x-4'><User2 height={25} width={25}/><h3 className='text-lg lg:text-lg'>Profile</h3></Link> 
            </li>
        </ul>
    </div>
  )
}
