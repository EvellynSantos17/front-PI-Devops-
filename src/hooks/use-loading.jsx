import { useState } from "react"

export default function UseLoading(){

  const [loading, setLoading] = useState(false)

  function upDateLoading(value){
    setLoading(value)
  }

  return {
    loading,
    upDateLoading
  }
}