import Data from '../data.json'
import { useEffect, useRef, useState } from "react"
import "./ReplyComment.scss"

import CurrentUser from '../images/avatars/image-juliusomo.png'

const ReplyComment = ({onReply,userTextName,onSend}) => {

  const [currentUser,setCurrentUser] = useState(Data.currentUser.username)
  const TextAreaRef = useRef()
  const [textAreaValue,setTextAreaValue] = useState('')

  useEffect(() => {

    TextAreaRef.current.focus()

  },[])

  const submitReply = (e) => {
    e.preventDefault()

    const date = Date.now()
    const currnetDay = new Date(date).toLocaleDateString()


    const newReply = {
      id:Math.floor(date.toFixed(4)),
      content:textAreaValue,
      createdAt:currnetDay,
      replyingTo:userTextName,
      score:0,
      user:{
        image:{
          png: CurrentUser
        },
        username:currentUser
      }
    }


    if(onSend){
      onSend(() => false)
    }

    onReply(newReply)


  }


  

  const change = (e) => {
      setTextAreaValue(e.target.value)
  }

  return (
    <form onSubmit={submitReply}>
        <textarea placeholder="Reply Comment" onChange={change} ref={TextAreaRef} 
        value={textAreaValue}>
        </textarea>
        <img src={CurrentUser} alt="juliusomo" />
        <button type="submit" className="btn-submit-reply">Reply</button>
    </form>
  )
}

export default ReplyComment