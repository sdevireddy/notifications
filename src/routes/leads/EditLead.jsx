import React from 'react'
import { useLocation } from 'react-router-dom'

const EditLead = () => {
    const location=useLocation()
    console.log(location)
  return (
    <div>EditLead</div>
  )
}

export default EditLead