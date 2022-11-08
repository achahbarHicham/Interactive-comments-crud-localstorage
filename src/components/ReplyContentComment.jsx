import { useState,Fragment } from "react"
import "./ReplyContentComment.scss"
import CurrentAvatar from '../images/avatars/image-juliusomo.png'
import ReplyAvatar from '../images/avatars/image-ramsesmiron.png'
import {ReactComponent as ReplyIcon} from "../images/icon-reply.svg"
import Score from "./Score"
import ReplyComment from "./ReplyComment"
import Btns from "./Btns";
import DeletePage from './DeletePage'


const ReplyContentComment = ({id,content,createdAt,replyingTo,user,score,onReply,removeReplyCommentData,updateReplyComment}) => {



  const [isDelete,setIsDelete] = useState(false)
  const [isReplying,setIsReplying] = useState(false)
  const curentUserName = "juliusomo"

  const [replyContent,setReplyContent] = useState(content)

  const [isEditing,setIdEditing] = useState(false)


  const handleReply = () => {
      setIsReplying(!isReplying)
  }


  const deleteComment = () => {
    setIsDelete(true)
  }


  const deleteDataComment = () => {
      removeReplyCommentData(id)
  }


  const editReplyComment = () => {
    setIdEditing(!isEditing)
  }


  const handleUpdate = () => {
    updateReplyComment(id,replyContent)
    setIdEditing(!isEditing)
  }


  const cancelFn = () => {
    setIsDelete(false)
  }

  return (
    <Fragment>

   {isDelete && <DeletePage deleteComment={deleteDataComment} cancelFn={cancelFn} />} 


        <div className="reply-to-comment">
            <div className="reply-content">
              <div className="reply-content--header">
                <img src={id == 3 ? ReplyAvatar : CurrentAvatar} alt={user.username} />
                <h4>{user.username}</h4>
                {user.username == curentUserName && <span>You</span>}
                <p>{createdAt}</p>
              </div>
              {
                !isEditing 
                ?
                <div className="reply-content--text">
                  <span>@{replyingTo}</span> {content}
                </div>
                : 
                <textarea className="update-reply-comment" 
                onChange={e => setReplyContent(e.target.value)}
                value={replyContent} autoFocus></textarea>
              }
           
              

                    {!isEditing && <div className="reply-buttons"><Score score={score} /></div>}

              

              {user.username != curentUserName && <h4 onClick={handleReply}><ReplyIcon /> Reply</h4>}

                    
                    {user.username == curentUserName && !isEditing && <div className="reply-buttons--btns">
                      <Btns deleteComment={deleteComment} editeComment={editReplyComment} />
                      </div>}
                    


                    {isEditing && <button className="update-on-reply-comment" onClick={handleUpdate}>Update</button>}
              
            </div>
        </div>
        {isReplying && <ReplyComment 
        onReply={onReply} 
        userTextName={user.username} 
        onSend={setIsReplying}
          />}
    </Fragment>
  )
}

export default ReplyContentComment