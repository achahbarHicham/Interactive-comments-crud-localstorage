import "./AddComment.scss"
import {useState,Fragment} from 'react'








const AddComment = ({currentUserName,imageSrc,insertComment}) => {

  const [textValue,setTextValue] = useState('')

  const typeText = (e) => {
      setTextValue(e.target.value)
  }


  const onSubmitComment = (e) => {
    
    e.preventDefault()


    if(textValue.length < 10){
      alert('Please Enter Valid Comment')
      return
    }


    const date = Date.now()
    const currnetDay = new Date(date).toLocaleDateString()


    const newComment = {
      id:  Math.floor(date.toFixed(4)),
      name:currentUserName,
      content:textValue,
      createdAt:currnetDay,
      score:0,
      user:{
        image:{
          png:imageSrc
        },
        username:currentUserName
      }
    }
    
    insertComment(newComment)

    setTextValue('')

  }

  return (
    <Fragment>
      <form className='add-comment' onSubmit={onSubmitComment}>
        <textarea placeholder='Add Comment' onChange={typeText} value={textValue}></textarea>
        <img src={imageSrc} alt={currentUserName} />
        <input type='submit' className='btn-send' value='Send' />
      </form>
    </Fragment>
  )
}

export default AddComment