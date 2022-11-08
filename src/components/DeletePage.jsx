import "./DeletePage.scss"

const DeletePage = ({cancelFn,deleteComment}) => {
  return (
    <div className="delete-page">
        <div className="delete-box">
            <h2>Delete Comment</h2>
            <p>Are you sure you want to delete this cooment? This will remove the comment and can't be undone</p>
            <div className="btns">
                <button className="btn btn-cancel" onClick={cancelFn}>NO,CANCEL</button>
                <button className="btn delete-btn" onClick={deleteComment}>YES,DELETE</button>
            </div>
        </div>
    </div>
  )
}

export default DeletePage