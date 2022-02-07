import { FaEllipsisV } from 'react-icons/fa';
import { useEffect, useState } from "react";

export default function Card(props: any) {

    const [toggleDisplay, setToggleDisplay] = useState(false);
    const [toggleTitle, setToggleTitle] = useState(false);
    let cloneCard: any;



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

    function onDrag(e: any) {
        let copy: any = document.getElementById("copyCard");
        copy.style.left = (e.pageX).toString() + "px";
        copy.style.top = (e.pageY).toString() + "px";
    }

    function onDragStart(e: any) {
        e.dataTransfer.setData("card", JSON.stringify({ "id": props.id, "title": props.title, "text": props.text, "parentId": props.parentId }));
        let cardCopy = e.target.cloneNode(true);
        e.target.style.opacity = 0;
        cardCopy.setAttribute("id", "copyCard");
        cardCopy.classList.add("position-absolute");
        document.getElementsByTagName("body")[0].appendChild(cardCopy);
    }

    function dragEnd(e: any) {
        console.log(e.target);
        document.getElementById("copyCard")?.remove();
        if (e.dataTransfer.dropEffect === "copy")
            props.suppr(props.id);
        else {
            e.target.style.opacity = 1;
        }
    }

    function onDragEnter(e: any) {
    }

    function toggleInput() {
        setToggleTitle(!toggleTitle);
        if (toggleTitle) {
            props.setTitle(props.id, props.title);
        }
    }


    return (
        <div className="my-2 card" id={props.id} style={styles.card} draggable="true" onDrag={onDrag} onDragStart={onDragStart} onDragEnd={dragEnd}>
            <div className="d-flex justify-content-between">
                <input id='txt_title' className={displayInputTitle} onChange={(e) => props.setTitle(props.id, e.target.value)} onBlur={toggleInput} type="text" value={props.title} />
                <label onClick={toggleInput} className={"ms-2 mt-1 " + displayTitle} style={{ color: 'black', fontSize: "20px" }}>{props.title}</label>
                <div className="btn-group dropend ">
                </div>
                <button type="button" className="btn" onClick={changeDropDisplay} onBlur={changeDropDisplay} aria-expanded="false">
                    <FaEllipsisV />
                </button>
                <ul className={"dropdown-menu " + display}>
                    <li><a className="dropdown-item" onClick={() => props.suppr(props.id)}>Supprimer</a></li>
                    <li><a className="dropdown-item">Another action</a></li>
                    <li><a className="dropdown-item">Something else here</a></li>
                </ul>
            </div>
            <div className="d-flex">
                <textarea className="form-control card_text" value={props.text} onChange={e => props.setText(props.id, e.target.value)} style={{ height: "100px" }}>{props.text}</textarea>
            </div>
        </div>
    )

}