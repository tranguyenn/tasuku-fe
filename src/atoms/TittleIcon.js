import React from 'react'
import "./TitleIcon.css"
function TittleIcon({icon,content}) {
  return (
    <div className='tittle-container'>
        <i id="icon"> {icon}</i>
        <span>{content}</span>
    </div>
  )
}

export default TittleIcon