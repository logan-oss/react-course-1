import { FaEllipsisV } from 'react-icons/fa';
import React, { useEffect, useState } from "react";
import {CardPropsType} from './Interface/CardPropsType';

export default function Card(props: CardPropsType) {
    
    const [toggleDisplay, setToggleDisplay] = useState(false);
    const [toggleTitle, setToggleTitle] = useState(false);



    const styles = {
        card: {
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "white",
            borderRadius: "5px",
            border: "1px solid black",
            zIndex: "1000",
        },
    }

    let display = ' d-none';
    let displayTitle = "d-block";
    let displayInputTitle = "d-none";

    if (toggleDisplay) {
        display = ' d-block'
    }

    if (toggleTitle) {
        displayTitle = "d-none";
        displayInputTitle = "d-block";
    }

    function changeDropDisplay() {
        setTimeout(() => { setToggleDisplay(!toggleDisplay) }, 100);
    }

    function changeDropDisplayNone() {
        setTimeout(() => { setToggleDisplay(false) }, 100);
    }

    function onDrag(e: React.DragEvent<HTMLDivElement>) {
        let copy: HTMLDivElement = document.getElementById("copyCard") as HTMLDivElement;
        copy.style.left = (e.pageX).toString() + "px";
        copy.style.top = (e.pageY).toString() + "px";
    }

    function onDragStart(e: React.DragEvent<HTMLDivElement>): void{
        let target : HTMLDivElement = (e.target as HTMLDivElement);
        let cardCopy : HTMLDivElement = target.cloneNode(true) as HTMLDivElement;
        e.dataTransfer.setData("card", JSON.stringify({ "id": props.id, "title": props.title, "text": props.text, "complete": props.complete}));   
        target.style.opacity = "0";
        cardCopy.setAttribute("id", "copyCard");
        cardCopy.classList.add("position-absolute");
        document.getElementsByTagName("body")[0].appendChild(cardCopy);
    }

    function dragEnd(e: React.DragEvent<HTMLDivElement>) {
        (e.target as HTMLDivElement).style.opacity = "1";
        document.getElementById("copyCard")?.remove();
        if (e.dataTransfer.dropEffect === "copy")
            props.suppr(props.id);
    }

    function toggleInput() {
        setToggleTitle(!toggleTitle);
        if (toggleTitle) {
            props.setTitle(props.id, props.title);
        }
    }


    return (
        <div className="my-2 card" id={props.id} style={styles.card} draggable="true" onDrag={onDrag} onDragStart={onDragStart} onDragEnd={dragEnd}>
            <div className="d-flex justify-content-between" style={props.complete ? {backgroundColor : "rgb(76, 192, 96)"} :  {backgroundColor : "rgb(216, 80, 62)"}}>
                <input id='txt_title' className={displayInputTitle} onChange={(e) => props.setTitle(props.id, e.target.value)} onBlur={() => setToggleTitle(false)} type="text" value={props.title} />
                <label onClick={toggleInput} className={"ms-2 mt-1 " + displayTitle} style={{ color: 'black', fontSize: "20px" }}>{props.title}</label>
                <div className="btn-group dropend ">
                </div>
                <button type="button" className="btn" onClick={changeDropDisplay} onBlur={changeDropDisplayNone} aria-expanded="false">
                    <FaEllipsisV />
                </button>
                <ul className={"dropdown-menu float-right position-absolute " + display}>
                    <li><a className="dropdown-item" onMouseDown={() => props.suppr(props.id)}>Supprimer</a></li>
                    <li><a className="dropdown-item" onMouseDown={() => props.setComplete(props.id, !props.complete)}>{props.complete ? 'Uncomplete' : 'Complete'}</a></li>
                </ul>
            </div>
            <div className="d-flex">
                <textarea className="form-control card_text" value={props.text} onChange={e => props.setText(props.id, e.target.value)} style={{ height: "100px" }}>{props.text}</textarea>
            </div>
        </div>
    )

}