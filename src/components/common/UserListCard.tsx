"use client"
import React from 'react'
import UserAvatar from './UserAvatar'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function UserListCard() {
  return (
    <div className='w-full shadow-sm p-4 rounded-md mb-3'>
        <div className='flex'>
        <UserAvatar name='Tushar' image=""/>
        <div className='flex justify-between items-start w-full'>
            <div className='flex flex-col'>
                <strong className='text-md font-bold ml-2'>Tushar</strong>
                <span className='ml-2 font-light text-xs'>@Tush</span>
            </div>
            <Link href="#" >
                <Button size="sm">view</Button>
            </Link>
        </div>

        </div>
    </div>
  )
}
