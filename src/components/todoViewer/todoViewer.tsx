import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter
  } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
  
import { CirclePlus, X } from "lucide-react"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

import axios from "axios"
import { Input } from "../ui/input";

  
export default function TodoViewer(){

    const API_URI = process.env.BACKEND_API_URI
    const todosEndpoint = "/todos"

    const [newTodoCollectionName, setNewTodoCollectionName] = useState("")

    const [todos, setTodos] = useState([])

    useEffect(getAllTodos,[])

    function getAllTodos(){
        
        axios.get(API_URI + todosEndpoint, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("JWT")||""
            }
        }).then(res => {
            
            setTodos(res.data)
        })
    }

    function creteTodoCollection(title:string){
        axios.post(API_URI + todosEndpoint, {
            title
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("JWT") || ""
            }
        }).then((res)=>{
            setTodos([...todos, res.data])

            console.log(todos.length)
        })
    }

    function handleCreateTodoCollectionFormSubmit(e:React.FormEvent){
        e.preventDefault()

        creteTodoCollection(newTodoCollectionName)

    }

    function deleteTodoCollection(todoCollectionId:string){
        axios.delete(API_URI + todosEndpoint + `/${todoCollectionId}`, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("JWT")||""
            }
        }).then(res => {
            
            setTodos(todos.filter(tdc=> tdc._id!==res.data._id))
        })

    }

    function deleteTodo(todoCollectionId: string, todoId: string){
        setTodos(todos.map(tdc =>{
            if (tdc._id === todoCollectionId){
                tdc.todoList = tdc.todoList.filter(td => td._id !== todoId)
            }
            return tdc
        }))
    }

    function flipTodoCompletion(todoCollectionId: string, todoId: string, checked: boolean){
        axios.put(API_URI + todosEndpoint + `/${todoCollectionId}/${todoId}`, {
            isCompleted: checked
        }, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("JWT")||""
            }
        }).then(res => {

            setTodos(todos.map(tdc => {
                if (tdc._id===res.data._id){
                    tdc = res.data
                }
                return tdc
            }))

        })

        setTodos(todos.map(tdc => {
            if (tdc._id===todoCollectionId){
                tdc.todoList.map(td => {
                    if (td._id === todoId) td.isCompleted = checked
                    return td
                })
            }
            return tdc
        }))
    }

    return <>

    <div className="w-screen flex items-center justify-center">
        <form onSubmit={handleCreateTodoCollectionFormSubmit} className="flex w-full max-w-md items-center space-x-2 mt-10">
            <Input 
                type="test"
                placeholder="Enter new todo collection name"
                value={newTodoCollectionName}
                onChange={e => setNewTodoCollectionName(e.target.value)}
                className="text-lg py-5 px-2"
            />
            <Button type="submit" className="text-lg py-5 px-4">
            {/* <PlusCircle className="mr-2 h-5 w-5" /> */}
            Create
            </Button>
        </form>
    </div>

    <div className="m-8 flex flex-row justify-around flex-wrap">

        {todos.map(todoCollection => (
        <Card key={todoCollection._id} className="max-w-[360px] w-full h-[25rem] m-4 mt-10 mb-0 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl">{todoCollection.title}
            </CardTitle>
            <CirclePlus className="mb-1 hover:cursor-pointer hover:text-gray-300" size={32} />

            </CardHeader>
            <CardContent className="flex flex-col overflow-x-hidden overflow-y-auto flex-grow">
            {
                todoCollection.todoList.map(td => <div key={td._id} className="group relative flex items-center space-x-2  w-full h-10">
                <Checkbox id={td._id} className="mr-3" checked={td.isCompleted} onCheckedChange={(checked)=>{flipTodoCompletion(todoCollection._id, td._id, checked)}} />
                <Label className="overflow-hidden whitespace-nowrap text-ellipsis max-w-full" htmlFor={td._id}>{td.content}</Label>
                <X onClick={()=>{deleteTodo(todoCollection._id, td._id)}} className="absolute opacity-0 right-1 ml-auto rounded-md bg-neutral-950 text-neutral-700 hover:bg-neutral-700 hover:text-white p-[2px] group-hover:opacity-100" size={25}/>
                </div>
                )
            }
            </CardContent>
            <CardFooter className="flex flex-row items-center justify-between">
            <Button variant="ghost" onClick={()=>{deleteTodoCollection(todoCollection._id)}} className="text-red-500">Delete</Button>
            <Button >View All</Button>
            </CardFooter>
        </Card>
        
        ))}

        <div className="m-auto"></div>

    </div>


    </>;
}