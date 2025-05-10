zimport React from 'react'
import { useParams } from 'react-router-dom'
const Routeous = () => {
  let myparams = useParams()
  return (
    <div>
      <h1>My name is {myparams.name} and in live in {myparams.area}</h1>
    </div>
  )
}

export default Routeous