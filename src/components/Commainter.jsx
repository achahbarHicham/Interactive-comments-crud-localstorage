import { useEffect,Fragment,useState} from "react"
import "./Commentaire.scss"

import {ReactComponent as ReplyIcon} from '../images/icon-reply.svg'
import ImageId1 from '../images/avatars/image-amyrobson.png'
import ImageId2 from '../images/avatars/image-maxblagun.png'
import ReplyComment from "./ReplyComment"
import ReplyContentComment from "./ReplyContentComment"
import DeletePage from "./DeletePage"
import Btns from "./Btns"
import Score from "./Score"

const Commainter = ({content,scrore,user,id,createdAt,score,comments,setComments,replies}) => {


    const [currentComment,setCurrentComment] = useState('')
    const [isReply,setReply] = useState(false)
    const [isDeleting,setIsDeleting] = useState(false)


    const [mainContent, setMainContnet] = useState(content)
    const [isEditing,setIsEditing] = useState(false)

    

    useEffect(() => {
        if(user.username != currentComment){
            setReply(false)
        }
    },[isReply])


    // I FOUND A PROBLEM OF RELTIVE PATH AND I CHOOSED TO MAKE THIS SOLUTION 
    const showImage = () => {
        if(id == 1){
            return <img src={ImageId1} alt={user.username} />
        }
        if(id == 2){
            return <img src={ImageId2} alt={user.username} />
        }else{
            return <img src={user.image.png} alt={user.username} />
        }


    }


    // REPLY TO COMMENT AND SET DATA ON LOCALSTORAGE
    const onReply = (content) => {
       const newReply =  comments.map(com => {
            if(com.id == id){
                com.replies.push(content)
            }
            return com
        })

        localStorage.setItem('comments', JSON.stringify(newReply))
        setComments(newReply)
        setReply(false)
    }

    // SHOW JSX INPUT'S REPLY
    const replyComment = () => {
        setCurrentComment(user.username)
        setReply(!isReply)
    }

    // DELETA CURRENT USER'S COMMENT
    const deleteComment = () => { 
        const removeComment = comments.filter(com => com.id !== id)
        localStorage.setItem('comments', JSON.stringify(removeComment))
        setComments(removeComment)
        setIsDeleting(false)      
    }

    // CANCEL DELETING COMMENT AND HIDE CUSTOM MODAL
    const cancelFn = () => {
        setIsDeleting(d =>  d = false)
    }

    // SHOW MODAL PAGE
    const showDeletePage = () => {
        setIsDeleting(true)
    }

    // SET EDIT JSX TRUE
    const editeComment = () => {
        setIsEditing(true)
    }


    // UPDATE CURRENT USER COMMENT
    const updateComment = () => {
    const updatedComment =  comments.map(com => com.id == id ? {...com,content:mainContent}: com )
    localStorage.setItem('comments', JSON.stringify(updatedComment))
    setComments(updatedComment)
    setIsEditing(false)

    }

    // UPDATE REPLY COMMENT
    const updateReplyComment = (replyId,replyContent) => {
        const updateReplyContent = replies.map(reply => reply.id == replyId ? {...reply,content:replyContent} : reply)
        const updateRepliesComment = comments.map(com => {
            if(com.id == id){
                com.replies = updateReplyContent
            }
            return com
        })

        localStorage.setItem('comments', JSON.stringify(updateRepliesComment))

        setComments(updateRepliesComment)

    }




    // REMOVE CURRENT USER REPLY COMMENT
    const removeReplyCommentData = (replyId) => {
        const removeReply = replies.filter(reply => reply.id !== replyId && reply)
        const removedReplyComment = comments.map(com => {
            if(com.id == id){
                com.replies = removeReply
            }
            return com
        })


        localStorage.setItem('comments', JSON.stringify(removedReplyComment))

        setComments(removedReplyComment)


    }




  return (
    <Fragment>

    {isDeleting && <DeletePage deleteComment={deleteComment} cancelFn={cancelFn} />}

        <div className="coment">
            <div className="coment-content">
                
                <div className="coment-content--header">
                    {showImage()}
                    <h4>{user.username}</h4>
                    {user.username == 'juliusomo' && <span>You</span>}
                    <p>{createdAt}</p>
                </div>

                {
                     isEditing ? 
                    <textarea type='text' 
                    className="update-comment-input" 
                    onChange={e => setMainContnet(e.target.value)} value={mainContent}
                    autoFocus
                    ></textarea> 
                    : 
                    <p className="content">{user.username == "juliusomo" ? mainContent : content }</p>
                }

                

            </div>
            <div className="score">
                
                   {
                    !isEditing && <Score score={score} />
                   }
            </div>

            <div className={`${user.username == "juliusomo" ? `edit-comment ${isEditing && 'justify-end'}`  :  'reply'}`}>

                {user.username != "juliusomo" &&  <h6 onClick={replyComment}><ReplyIcon /> Reply</h6>}
                
                {
                    user.username == 'juliusomo' && !isEditing  && <Btns deleteComment={showDeletePage} editeComment={editeComment} />
                }

                {isEditing && user.username == "juliusomo"  && <button className="update-btn" onClick={updateComment}>Update</button>}
                
            </div>
        </div>

        <div className="reply-container">
        {replies && replies.map(reply => <ReplyContentComment 
        key={reply.id} {...reply} 
        onReply={onReply} 
        removeReplyCommentData={removeReplyCommentData}
        updateReplyComment={updateReplyComment}
         />)
         }
        </div>
        

        
        {isReply && <ReplyComment userTextName={user.username} onReply={onReply} />}
    </Fragment>
  )
}

export default Commainter