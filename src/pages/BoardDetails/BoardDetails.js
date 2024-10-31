import React from 'react'
import SubBar from '../../organisms/SubBar/SubBar'
import Board from '../../organisms/Board/Board'
import { useParams } from 'react-router-dom';

function BoardDetails() {
  const params = useParams();
  const boardId = params.boardId;
  return (
    <div>
        <SubBar boardId={boardId}/>
        <Board boardId={boardId}/>
    </div>
  )
}

export default BoardDetails