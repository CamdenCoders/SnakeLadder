import Person from './Person';
import Ladder from './Ladder';
import { playerContext, ladderContext } from './Game';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useContext } from 'react';



function Square({ val }){
    const playerPos = useContext(playerContext);
    return (
    <div id = {val} className="w-9 h-9 sm:w-20 sm:h-20 border-1 border-red-500 float-left text-white">
        <p className="text-xs sm:text-base sm:pl-12">{val}</p>
      <Person pos = {val} position={playerPos}/>
    </div>  
    );
  }
  
  function Rows({ j, flag }){
    let row = [];
    for(let i=0; i<10; i++)
    {
      if(flag)
        row.push(<Square val = {(i+1) + j} />);
      else row.push(<Square val = {(10 - i) + j} />);
    }
    return(
      <div className="rows" style={{display: "flex"}}>
       {row}
      </div>
    );
  }
  
function Board(){
    const ladderCoords = useContext(ladderContext).ladders;
    const snakeCoords = useContext(ladderContext).snakes;
    const [ladderPositions, setLadderPositions] = useState(null);
    let flag = false;
    let row1 = [];
    let ladders = new Map();
  
    //To create board.
    for(let i=0; i<10; i++){
      row1.push(<Rows j = {(9-i)*10} flag = {flag} />);
      flag = !flag;
    }
  //To Locate the ladder start and end posiitons
  useEffect(() => {
      for(let [end, start] of ladderCoords){
        const startCell = document.getElementById(start);
        const endCell = document.getElementById(end);
        if(startCell && endCell){
          const startCellRect = startCell.getBoundingClientRect();
          const endCellRect = endCell.getBoundingClientRect();
          ladders.set(start, <Ladder startCellPosition={startCellRect} endCellPosition={endCellRect} itemType={"Ladder"}/>);
          setLadderPositions([...ladders.values()]);
        }
      }

      for(let [start, end] of snakeCoords){
        const startCell = document.getElementById(start);
        const endCell = document.getElementById(end);
        if(startCell && endCell){
          const startCellRect = startCell.getBoundingClientRect();
          const endCellRect = endCell.getBoundingClientRect();
          ladders.set(start, <Ladder startCellPosition={startCellRect} endCellPosition={endCellRect}/>);
          setLadderPositions([...ladders.values()]);
        }
      }
  }, []);
    return (
        <div className="p-2 ">
          <div className="board">
            {row1}
          </div>
          {ladderPositions}
        </div>
    );
  }


export default Board;