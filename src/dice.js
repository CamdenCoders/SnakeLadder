import './dice.css';
import gsap from "gsap";
import { useContext, useRef } from 'react';
import { diceRefContext, imageRefContext } from './Game';
import one from './one.png';
import two from './two.png';
import three from './three.png';
import four from './four.png';
import five from './five.png';
import six from './six.png';
import red from './red.png';
export default function Dice({onDiceClick, number}){
    const diceRef = useContext(diceRefContext);
    const imageRef = useContext(imageRefContext);
    let image;
    // console.log(number);
    switch(number)
    {
        case 1: image = one; break;
        case 2: image = two; break;
        case 3: image = three; break;
        case 4: image = four; break;
        case 5: image = five; break;
        case 6: image = six; break;
        default: image = red;
    }
    return (
        <>
        <div ref = {diceRef} onClick={onDiceClick} className="cube">
            <div className="cubeFace">{
            number && (
                <img src={image} ref={imageRef} onClick={onDiceClick} className={`border-red-500`} />
            )
            }
            </div>
            <div className="cubeFace face2">{
            (
                <img src={six} ref={imageRef} onClick={onDiceClick} className={`transition-opacity duration-1000 opacity-0 border-red-500`} />
            )
            }
            </div>
        </div>

        {/* <div ref = {diceRef} onClick={onDiceClick}  class="dice">
            <div class="face front"></div>
            <div class="face back"></div>
            <div class="face top"></div>
            <div class="face bottom"></div>
            <div class="face right"></div>
            <div class="face left"></div>
        </div> */}

    </>
    );
}

