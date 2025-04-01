"use client"
import { useRouter } from 'next/navigation'


export default function Page() {
  const router = useRouter()
  console.log(router)
  return <p>Post: </p>
}