"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'


export default function Register  ()  {
    const router = useRouter()
    const [authState, setAuthState]=useState<AuthStateType>({
        name:"",
        username:"",
        email:"",
        password:"",
        password_confirmation:""
    })

 const [errors, setErrors] = useState<AuthErrorType>({});
  const [loading, setLoading] = useState<boolean>(false);

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
    
        axios
          .post("/api/auth/register", authState)
          .then((res) => {
            setLoading(false);
            const response = res.data;
            if (response.status == 400) {
              setErrors(response.errors);
            } else if (response.status == 200) {
              router.push(`/login?message=${response.message}`);
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log("The error is", err);
          });
      };
  return (
    <div className='bg-background'>
        <div className='h-screen  w-screen flex justify-center items-center'>
            <div className='w-full md:w-1/3 mx-2 bg-muted p-6 rounded-lg'>
                <div className='flex justify-center'>
                    <Image src="/images/logo.svg"  alt='logo' width={50} height={50}/>
                </div>
            <h1 className='text-2xl font-bold'>Register</h1>
          
            <p>welcome to our own app</p>
            <form onSubmit={submit}>
            <div className='mt-5'>
            <Label htmlFor='name'>Name</Label>
            <Input type='text' placeholder='Enter your Name '  id='name' onChange={(e)=>setAuthState({...authState, name:e.target.value})}/> 
            <span className="text-red-400 font-bold">{errors.name}</span>
            </div>
            <div className='mt-5'>
            <Label htmlFor='name'>Username</Label>
            <Input type='text' placeholder='Enter your unique username '  id='username' onChange={(e)=>setAuthState({...authState, username:e.target.value})}/>  
            <span className='text-red-400 font-bold'>{errors?.username}</span>
            </div>
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
            <Label htmlFor='password'>Confirm Password</Label>
            <Input type='password' placeholder='Enter your Password ' id='cpassword' onChange={(e)=> setAuthState({...authState,password_confirmation:e.target.value})} />  
            <span className='text-red-400 font-bold'>{errors?.password}</span>
            </div>
            
            <div className='mt-5'>
                <Button className='w-full' disabled={loading} >{loading?"processing":"Register"}</Button>
            </div>
            </form>
            <div className='mt-5'>
                <span>
                    Already have an account</span>
                <Link href="/login" className='text-orange-400 font-bold ml-2'>Login</Link>
            </div>
        </div>
        </div>
    </div>
  )
}
