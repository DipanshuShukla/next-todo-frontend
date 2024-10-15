'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LockIcon, MailIcon, User } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function RegisterForm(){

    const API_URI = process.env.BACKEND_API_URI
    const registerEndpoint = "/user/register"

    const router = useRouter()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    function handleRegister(e: React.FormEvent){
        e.preventDefault()

        if (password !== confirmPassword) return alert("Passwords do not Match!");
        
        const payload = {
            name, 
            email,
            password
        }

        axios.post(API_URI + registerEndpoint, payload).then(res=>{
          localStorage.setItem("JWT", res.data.token)
          router.push("/")
        })

    }

    return <form onSubmit={handleRegister} className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700">
                Name
            </Label>
            <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                id="name" 
                type="text" 
                placeholder="Enter your Name" 
                value={name} 
                onChange={e=>setName(e.target.value)}
                required
                className="pl-10"
                />
            </div>
        </div>
        <div className="space-y-2">
      <Label htmlFor="loginEmail" className="text-gray-700">Email</Label>
      <div className="relative">
        <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input
          id="loginEmail"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="pl-10"
        />
      </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="loginPassword" className="text-gray-700">Password</Label>
      <div className="relative">
        <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input
          id="loginPassword"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="pl-10"
        />
      </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="confirmPassword" className="text-gray-700">Password</Label>
      <div className="relative">
        <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="pl-10"
        />
      </div>
    </div>
    <Button className="w-full text-lg py-6" type="submit">
      Register
    </Button>
    </form>
}

