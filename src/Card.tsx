import { FaEllipsisV } from 'react-icons/fa';
import { useState } from "react";

export default function Card(props: any) {

    const [toggleDisplay, setToggleDisplay] = useState(false);
    let cloneCard : any;

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

    if (toggleDisplay) {
        display = ' d-block'
    }

    function changeDropDisplay() {
        setTimeout(() => {  setToggleDisplay(!toggleDisplay) }, 100);
    }

    function suppr(e : any){
        e.target.parentNode.parentNode.parentNode.parentNode.remove();
    }

    function onDrag(e : any){
        
    }

    function onDragStart(e : any){
        e.dataTransfer.setData("title", "props.title");
        e.dataTrasfer.setData("text", "props.description");
    }

    function onDragEnter(e : any){         
    }

    return (
        <div className="my-2 card" id={props.id} style={styles.card} draggable="true" onDrag={onDrag} onDragStart={onDragStart}>
            <div className="d-flex justify-content-between">
                <label className="ms-2 mt-1" style={{color: 'black',fontSize: "20px"}}>{props.title}</label>
                <div className="btn-group dropend ">
            </div>
                <button type="button" className="btn" onClick={changeDropDisplay} onBlur={changeDropDisplay} aria-expanded="false">
                 <FaEllipsisV />
                </button>
                <ul className={"dropdown-menu " + display}>
                <li><a className="dropdown-item" onClick={suppr}>Supprimer</a></li>
                <li><a className="dropdown-item">Another action</a></li>
                <li><a className="dropdown-item">Something else here</a></li>
                </ul>
            </div>
            <div className="d-flex">
                <textarea className="form-control card_text" style={{height: "100px"}}>{props.description}</textarea>
            </div>
        </div>
    )

}