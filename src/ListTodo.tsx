import { stringify } from "querystring";
import { useState } from "react";
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import Card from './Card';
import { ListTodoPropsType } from "./Interface/ListTodoPropsType";

export default function ListTodo(props: ListTodoPropsType) {

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

    function onDragEnter(e : React.DragEvent<HTMLDivElement>){
        let target : HTMLDivElement = (e.target as HTMLDivElement);
        if (target.classList.contains("todoList")) {
            target.style.backgroundColor = "blue";      
        }
    }

    function allowDrop(ev: React.DragEvent<HTMLDivElement>) {
        ev.preventDefault();
      }

    function onDragLeave(e: React.DragEvent<HTMLDivElement>){
        let target : HTMLDivElement = (e.target as HTMLDivElement);
        if (target.classList.contains("todoList")) {
            target.style.backgroundColor = "#8A42DC";    
        }
    }

    function suppr(id: String){
        setCards(cards.filter(e => e.id != id));
    }

    function setTitle(id: String, title: String){
        let cards2 = cards.map(e => {
            if (e.id == id) {
                e.title = title;
            }
            return e;
        });
        
        setCards(cards2);
    }

    function setText(id: String, text: String){
        let card2 = cards.map(e => {
            if (e.id == id) {
                e.text = text;
            }
            return e;
        });
        setCards(card2);
    }

    function setComplete(id: String, complete : boolean) {
        let card2 = cards.map(e => {
            if (e.id == id) {
                e.complete = complete;
            }
            return e;
        });
        setCards(card2);
    }

    function addCards(){
        setCards([...cards, {"id" : generateId(), "title" : "title", "text": "","complete": false}])
    }

    function generateId(){
        return (Math.random() + 1).toString(36).substring(2);
    }


    function onDrop(e: React.DragEvent<HTMLDivElement>){
        e.preventDefault();
        if (e.dataTransfer.getData("card")) {
            let card = JSON.parse(e.dataTransfer.getData("card"));
            setCards([...cards, {"id" : generateId(), "title" : card.title, "text": card.text, "complete" : card.complete}]);
            (e.target as HTMLDivElement).style.backgroundColor = "#8A42DC";
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
                        
                        return <Card id={card.id} suppr={suppr} setTitle={setTitle} setText={setText} setComplete={setComplete} title={card.title} text={card.text} complete={card.complete}></Card>;
                    })
                }
            </div>
        </div>
    );
}