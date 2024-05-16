import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
  import { useRef, useState } from "react";
import { connect } from "socket.io-client";
import { socket } from './socket';
import Game from "./Game";

function BeginDialog(){
  const inputRef = useRef('');
  const [toggleJoin, setToggleJoin] = useState(0);
  const [room, setRoom] = useState('');
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(!open);

    function makeid(length) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      localStorage.removeItem('Room');
      console.log(result);
      setRoom(result);
      localStorage.setItem('Room', result);
      connect();
  }

  function joinGame(roomName){
    setRoom(roomName);
    localStorage.setItem('Room', roomName);
    connect();
  }
    function connect(){
      socket.connect();
      socket.emit("join-room", localStorage.getItem('Room'));
      handleOpen();
    }

    function disconnect(){
      socket.disconnect();
    }

return <>
<Dialog open={open} handler={handleOpen} className='relative h-[500px] w-[200px] text-center' style={{base:{backdrop:{backgroundColor:'white'}}}} animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}>
        <DialogHeader>
          <h2 className='text-center'>CamdenCoders Snakes and Ladders</h2>
        </DialogHeader>
        <DialogBody className="grid grid-cols-6 gap-3">
        <button onClick={()=>{makeid(5)}}
        className="col-span-6 w-1/2 justify-self-center bg-black text-white py-2 px-4 border rounded-lg block
        transition hover:scale-105">
            New Game
        </button>
        <button onClick={()=>{setToggleJoin(2)}}
        className="col-span-6 w-1/2 justify-self-center bg-black text-white py-2 px-4 border rounded-lg block
        transition hover:scale-105">
            Join Game
        </button>
        {
        toggleJoin===2 && (
            <>
            <input name="roomName" type="text" ref={inputRef} placeholder="Enter Room Name" className="col-span-6 w-1/2 p-2 justify-self-center rounded-lg border-2 border-black"/>
            <button onClick={() => joinGame(inputRef.current.value)} className="col-span-6 justify-self-end translate-y-32 bg-black text-white py-2 px-4 border rounded-lg block
        transition hover:scale-105">Start Game</button>
            </>
          )
        }
        </DialogBody>
        <DialogFooter>
        </DialogFooter>
</Dialog>
<Game/>
</>
}

export default BeginDialog;
