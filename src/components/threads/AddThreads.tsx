"use client"
import Image from 'next/image'
import React,{useRef, useState} from 'react'
import UserAvatar from '../common/UserAvatar'
import { LucideImage } from 'lucide-react'
import { Button } from '../ui/button'
import ImagePreviewCard from '../common/ImagePreviewCard'
import axios from 'axios'
import { useToast } from "@/components/ui/use-toast";
import {useRouter} from "next/navigation"


export default function AddThreads() {
    const router = useRouter()
    const { toast } = useToast();
    const imageRef = useRef<HTMLInputElement|null>(null)
    const [image, setImage] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

    const [content,setContent] = useState<string>("")
    const [loading, setLoading] =  useState<boolean>(false)
    const [errors, setErrors] = useState<PostErrorType>({})

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


    const submit = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("content", content);
        if (image) formData.append("image", image);
    
        axios
          .post("/api/post", formData)
          .then((res) => {
            setLoading(false);
            const response = res.data;
            if (response.status == 400) {
              setErrors(response.errors);
            } else if (response.status == 200) {
              setContent("");
            //   setimage(null);
              setPreviewUrl(undefined);
              setErrors({});
              toast({
                title: "Success",
                description: response.message,
                className: "bg-green-500",
              });
              router.refresh();
            } else if (response.status == 500) {
              toast({
                title: "Error",
                description: response.message,
                className: "bg-red-300",
              });
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log("The error is", err);
          });
      };
  return (
    <div className='mt-5'>
        {previewUrl ? <ImagePreviewCard image={previewUrl} callback={removePreviewImg}/> : <></>}
        <div className='flex justify-start items-start space-x-4'>
        <UserAvatar name='Tu' image=''/>
        <textarea className='w-full h-24 text-md p-2 bg-muted outline-none resize-none rounded-lg placeholder:font-normal ' onChange={(e)=>setContent(e.target.value)}></textarea>
        </div>
        <span className='text-red-400 font-bold ml-14'>{errors.content}</span>
        <div className='mt-3 ml-14 flex justify-between items-center'>
            <input type="file" ref={imageRef} onChange={handleImageChange} className='hidden' />
            <LucideImage height={20} width={20} className='cursor-pointer' onClick={handleClick}/>
            <Button size="sm" disabled={content?.length<3 || loading ? true : false} onClick={submit}>Post</Button>
        </div>
    </div>
  )
}
