"use client"
import Image from 'next/image'
import React,{useRef, useState} from 'react'
import UserAvatar from '../common/UserAvatar'
import { LucideImage } from 'lucide-react'
import { Button } from '../ui/button'
import ImagePreviewCard from '../common/ImagePreviewCard'

export default function AddThreads() {
    const imageRef = useRef<HTMLInputElement|null>(null)
    const [image, setImage] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] =  useState<String| undefined>()
    const [content,setContent] = useState<string>("")

    const handleClick = ()=>{
        imageRef.current?.click()
    }

    const handleImageChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        const selectedFile = event.target.files?.[0]
        if(selectedFile){
            setImage(selectedFile)
            const imgaeUrl = URL.createObjectURL(selectedFile)
            setPreviewUrl(imgaeUrl)
        }
    }
    const removePreviewImg =()=>{
        setImage(null)
        setPreviewUrl(undefined)
    }
  return (
    <div className='mt-5'>
        {previewUrl ? <ImagePreviewCard image={previewUrl} callback={removePreviewImg}/> : <></>}
        <div className='flex justify-start items-start space-x-4'>
        <UserAvatar name='Tu' image=''/>
        <textarea className='w-full h-24 text-md p-2 bg-muted outline-none resize-none rounded-lg placeholder:font-normal ' onChange={(e)=>setContent(e.target.value)}></textarea>
        </div>
        <div className='mt-3 ml-14 flex justify-between items-center'>
            <input type="file" ref={imageRef} onChange={handleImageChange} className='hidden' />
            <LucideImage height={20} width={20} className='cursor-pointer' onClick={handleClick}/>
            <Button size="sm" disabled={content?.length<3 ? true : false}>Post</Button>
        </div>
    </div>
  )
}
