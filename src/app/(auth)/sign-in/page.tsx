"use client"
import {zodResolver} from "@hookform/resolvers/zod"   
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import {useDebounceValue} from "usehooks-ts" 
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchemas } from "@/schemas/signUpSchema"
import axios, {AxiosError} from "axios"
import { ApiResponse } from "@/types/ApiResponse"







const page =() =>{
  const [username, setUsername]  = useState("")
  const [usernameMessage, setUsernameMessage] = useState("")
  const [ischeckingUsername, setIsCheckingUsername] = useState(false)
  const [issubmitting, setIsSubmitting] = useState(false)
  const debouncedUsername = useDebounceValue(username, 300)

  const { toast } = useToast()
  const router = useRouter()



  // zod implementation
  const form = useForm<z.infer<typeof signUpSchemas>>({resolver: zodResolver(signUpSchemas ),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  })

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if(debouncedUsername){
        setIsCheckingUsername(true)
        setUsernameMessage("")
        try {
          const response =  await axios.get(`/api/check-username-unique?username=${debouncedUsername}`)
          setUsernameMessage(response.data.message)
          
        } catch (error) {
          const   axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(axiosError.response?.data.message?? "error checking username") 
        }
        finally{
          setIsCheckingUsername(false)
        }
      }
    }
    checkUsernameUnique()
   }, [debouncedUsername])

   const onSubmit = async (data: z.infer<typeof signUpSchemas>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post("/api/sign-up", data)
      toast({title: "success"})
      router.push("/auth/sign-in")
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast(axiosError.response?.data.message ?? "error submitting form", "error")
    }
    finally{
      setIsSubmitting(false)
   }



  return (
    <div>page</div>
  )

}

export default page 