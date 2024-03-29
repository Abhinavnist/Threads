"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import {signIn} from "next-auth/react"
import { useSession } from 'next-auth/react'

export default function Login  ()  {
    const router = useRouter()
    const params = useSearchParams()
    const {status} = useSession()
    const [authState, setAuthState]=useState<AuthStateType>({
        email:"",
        password:""
    })
    const [errors, setErrors] = useState<AuthErrorType>({})
    const [loading, setLoading] =  useState<boolean>(false)

    useEffect(()=>{
        if(status=="authenticated"){
            router.push("/")
        }
    },[status])

    const submit =(event:React.FormEvent)=>{
        event.preventDefault()
        axios.post("/api/auth/login",authState)
        .then((res)=>{
            setLoading(false)
            const response = res.data;
            if(response.status == 200){
                signIn("credentials",{
                    email:authState.email,
                    password:authState.password,
                    callbackUrl:"/",
                    redirect:true,
                })
            }
            else if(response.status == 400){
                setErrors(response.errors)
            }
        })
        .catch((err)=>{
            setLoading(false)
            console.log("The error is ", err)
        })
    }
  return (
    <div className='bg-background'>
        <div className='h-screen  w-screen flex justify-center items-center'>
            <div className='w-full md:w-1/3 mx-2 bg-muted p-6 rounded-lg'>
                <div className='flex justify-center'>
                    <Image src="/images/logo.svg"  alt='logo' width={50} height={50}/>
                </div>
                {params.get("message") ? (
            <div className="bg-green-300 p-5 rounded-lg font-bold my-4 text-black">
              <strong>Success!</strong> {params.get("message")}
            </div>
          ) : (
            <></>
          )}
            <h1 className='text-2xl font-bold'>Login</h1>
          
            <p>welcome Back</p>
            <form onSubmit={submit}>
            <div className='mt-5'>
            <Label htmlFor='email'>Email</Label>
            <Input type='email' placeholder='Enter your Email '  id='email' onChange={(e)=>setAuthState({...authState, email:e.target.value})}/>  
            <span className='text-red-400 font-bold'>{errors?.email}</span>
            </div>
            <div className='mt-5'>
            <Label htmlFor='password'>Password</Label>
            <Input type='password' placeholder='Enter your Password ' id='password' onChange={(e)=> setAuthState({...authState,password:e.target.value})} />  
            <span className='text-red-400 font-bold'>{errors?.password}</span>
            </div>
            <div className='mt-5'>
                <Button className='w-full' disabled={loading} >{loading?"processing...." : "Login"}</Button>
            </div>
            </form>
            <div className='mt-5'>
                <span>Don't have an account</span>
                <Link href="/register" className='text-orange-400 font-bold ml-2'>Register</Link>
            </div>
        </div>
        </div>
    </div>
  )
}
