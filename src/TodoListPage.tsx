import { useState } from "react";
import ListBar from "./ListBar";

export default function TodoListPage() {
    const [listTodo , setListTodo] = useState(new Array);

    console.log(listTodo);
    

    return (
        <div>
            <ListBar listTodo={listTodo} setListTodo={setListTodo} />
        </div>
    )
}