'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


  
export default function Auth() {

    const router = useRouter()


    useEffect(()=>{
        const JWT = localStorage.getItem("JWT")
        if(JWT) router.push("/")
    },[])

    return <div className="w-full min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-[500px] mb-20 mt-10 space-y-2">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Get Started.</CardTitle>
                <CardDescription>Login or create an account.</CardDescription>
            </CardHeader>
            <CardContent>
            <Tabs defaultValue="register" className="w-full">
                <TabsList className="w-full grid grid-cols-2 mb-8">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <LoginForm/>
                </TabsContent>
                <TabsContent value="register"><RegisterForm/></TabsContent>
            </Tabs>

            </CardContent>
            {/* <CardFooter>
                <p>Card Footer</p>
            </CardFooter> */}
        </Card>

    </div>;
  }
  