import { Fragment} from 'react'
import "./Score.scss";
import {ReactComponent as IncIcon} from '../images/icon-plus.svg'
import {ReactComponent as DecIcon} from '../images/icon-minus.svg'

const Score = ({score}) => {

  return (
    <Fragment>
      <div className="score--btns">
      <div className="inc-score">
          <IncIcon />
      </div>
          <p>{score}</p>
      <div className="dec-score">
          <DecIcon />
      </div>
      </div>
    </Fragment>
    
  )
}


export default Score