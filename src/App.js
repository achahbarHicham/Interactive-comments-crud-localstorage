import { useState,useEffect } from "react";
import Data from './data.json'
import Commainter from "./components/Commainter";
import AddComment from "./components/AddComment";
import currentUserImage from './images/avatars/image-juliusomo.png'

function App() {

  const [comments,setComments] = useState([])

useEffect(() => {

const getComments = () => {

  if(localStorage.getItem('comments')){
    setComments(JSON.parse(localStorage.getItem('comments')))
  }else{
    localStorage.setItem('comments', JSON.stringify(Data.comments))
    setComments(Data.comments)
  }
}
 getComments()
},[])




  const insertComment = (comment) => {

    const newComments = comments.map(com => com )

    newComments.push(comment)

    localStorage.setItem('comments', JSON.stringify(newComments))

    setComments(com => [...com,comment])

  }



  return (
    <div className="container">

      {comments && comments.map(comment => 
      <Commainter 
      key={comment.id} 
      {...comment}
      comments={comments && comments}
      setComments={setComments}
       />)}
       <AddComment 
       currentUserName={Data.currentUser.username} 
       imageSrc={currentUserImage} 
       insertComment={insertComment}
       />
       
    </div>
  );
}

export default App;
