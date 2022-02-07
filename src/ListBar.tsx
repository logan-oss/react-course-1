import { useState } from "react";
import ListTodo from "./ListTodo";

export default function ListBar(props: any) {
    const [toggleDisplay, setToggleDisplay] = useState(false);
    const [input_listName, setName] = useState("");

    const styles = {
        dropdownSize: {
            width: '400px'
        }
    }

    let display = ' d-none';

    if (toggleDisplay) {
        display = ' d-block'
    }

    function changeDropDisplay() {
        setToggleDisplay(!toggleDisplay);
    }

    function keyPressAddList(e: any) {
        if (e.key == "Enter")
            addList();
    }

    function addList() {
        props.listTodo.push();
        props.setListTodo(new Array(...props.listTodo, input_listName));
        changeDropDisplay();
        setName("");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand">TODO Lists</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <button className="btn btn-success" onClick={changeDropDisplay}> + Créer une liste </button>
                            <ul className={"dropdown-menu " + display} style={styles.dropdownSize} aria-labelledby="navbarDropdown">
                                <li>
                                    <div className="dropdown-item">
                                        <div className="input-group">
                                            <input type="text" value={input_listName} className="form-control" onKeyPress={keyPressAddList} onChange={e => setName(e.target.value)} placeholder="Nom de la liste" />
                                            <button className="btn btn-primary" type="button" onClick={addList}>Ajouter</button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}