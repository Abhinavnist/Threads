import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { Bell, Home, Search, User2 } from 'lucide-react'
import { Button } from '../ui/button'
import { ThemeToggleBtn } from './ThemeToggleBtn'
import SignOutBtn from './SignOUtBtn'

export default function Sidebarlinks() {
    const pathName = usePathname()
  return (
    <div>
        <ul className='mt-10'>
            <li>
               <Link href="/" className={`flex items-center justify-start space-x-4 mt-6 hover:font-bold ${pathName == "/"? "font-bold" : ""}`}><Home height={25} width={25}/><h3 className='text-lg lg:text-lg'>Home</h3></Link> 
            </li>
            <li>
               <Link href="/" className={`flex items-center justify-start space-x-4 mt-6 hover:font-bold ${pathName == "/explore"? "font-bold" : ""}`}><Search height={25} width={25}/><h3 className='text-lg lg:text-lg'>Explore</h3></Link> 
            </li>
            <li>
               <Link href="/" className={`flex items-center justify-start space-x-4 mt-6 hover:font-bold ${pathName == "/notification"? "font-bold" : ""}`}><Bell height={25} width={25}/><h3 className='text-lg lg:text-lg'>Notification</h3></Link> 
            </li>
            <li>
               <Link href="/" className={`flex items-center justify-start space-x-4 mt-6 hover:font-bold ${pathName == "/profile"? "font-bold" : ""}`}><User2 height={25} width={25}/><h3 className='text-lg lg:text-lg'>Profile</h3></Link> 
            </li>
            <li className='flex  items-center absolute bottom-10'>
               <SignOutBtn/>
               <ThemeToggleBtn/>
            </li>
        </ul>
    </div>
  )
}
