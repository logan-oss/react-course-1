import { useState } from "react";
import ListBar from "./ListBar";
import ListTodo from "./ListTodo";

export default function TodoListPage() {
    const [listTodo , setListTodo] = useState(new Array);

    function supprList(id : number) {
        const newListTodo = [...listTodo];
        newListTodo.splice(id, 1);
        setListTodo(newListTodo);
    }
    
    return (
        <div>
            <ListBar listTodo={listTodo} setListTodo={setListTodo} />
            <div style={{whiteSpace: 'nowrap', overflow: 'auto'}} className="position-relative" id="listTodo">
                {listTodo.map((item, index) =>{
                    return <ListTodo key={index} title={item} id={index} supprList={supprList} ></ListTodo>
                })}
            </div>
        </div>
    )
}