import React from 'react'
import Navbar from '../../organisms/Navbar/Navbar'
import { Outlet, useParams } from 'react-router-dom'

function MainLayout() {
  const { boardId } = useParams();
  return (
    <div>
        <Navbar boardId={boardId}/>
        <Outlet/>
    </div>
  )
}

export default MainLayout