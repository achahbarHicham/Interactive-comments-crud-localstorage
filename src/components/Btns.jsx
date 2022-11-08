import {Fragment} from 'react'
import "./Btns.scss"
import {ReactComponent as DeleteIcon} from '../images/icon-delete.svg'
import {ReactComponent as EditIcon} from '../images/icon-edit.svg'

const Btns = ({deleteComment,editeComment}) => {
  return (
        <Fragment>
                <button className="btn-delete" onClick={deleteComment}>
                    <DeleteIcon />
                    Delete
                </button>
                <button className="btn-edite" onClick={editeComment}>
                    <EditIcon />
                    Edit
                </button>
        </Fragment>
  )
}

export default Btns