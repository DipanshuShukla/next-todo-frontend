'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TodoViewer from "@/components/todoViewer/todoViewer";


export default function Home() {

  const router = useRouter()

  useEffect(()=>{
    const JWT = localStorage.getItem("JWT")
    if(!JWT) router.push("/auth")
  })

  return <>
    <div className="m-auto mt-4 mr-4">
    <Button className="" onClick={()=>{localStorage.removeItem("JWT"); router.push("/auth")}}>Log Out</Button>
    </div>

    <TodoViewer/>

  </>;
}
