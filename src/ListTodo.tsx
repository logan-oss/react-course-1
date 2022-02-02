import { useState } from "react";
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import Card from './Card';

export default function ListTodo(props: any) {

    const [cards, setCards] = useState(new Array());

    const styles = {
        list: {
            width: '400px',
            padding: '5px 5px 10px 5px',
            backgroundColor: '#8A42DC',
            color: 'white',
            borderRadius: "5px",
            title: {
                fontSize: "20px"
            }
        }
    }

    function onDragEnter(e : any){
        if (e.target.classList.contains("todoList")) {
            e.target.style.backgroundColor = "blue";      
        }
    }

    function allowDrop(ev: any) {
        ev.preventDefault();
      }

    function onDragLeave(e: any){
        if (e.target.classList.contains("todoList")) {
            e.target.style.backgroundColor = "#8A42DC";    
        }
    }

    function suppr(test: any){
        alert(test);
    }

    function addCards(){
        setCards([...cards,<Card id={cards.length} suppr={suppr} title="title" description="dqzdqzd"></Card>])
    }
    function onDrop(e : any){
        e.preventDefault();
        if (e.target.classList.contains("card")) {
            console.log(e.dataTransfer.getData("id"));
        }
        
        
    }

    return (
        <div className='d-inline-block m-3 align-top todoList' onDragOver={allowDrop} onDragLeave={onDragLeave} onDrop={onDrop} onDragEnter={onDragEnter} style={styles.list}>
            <div className='w-100 px-3 d-flex justify-content-between'>
                <label style={styles.list.title}>{props.title}</label>
                <div>
                    <button className="btn" onClick={addCards} style={{fontSize: "20px",color: "white"}}>
                        <FaPlusCircle />
                    </button>
                    <button className="btn" onClick={ () => {props.supprList(props.id)}} style={{fontSize: "20px",color: "white"}}>
                        <FaTrashAlt />
                    </button>
                </div>
            </div>
            <div>
                {
                    cards.map((card, index) => {
                        return card;
                    })
                }
            </div>
        </div>
    );
}