import { useReducer, useState } from "react";

import { ActionType, initDataSet, listReducer } from "./reducers/listReducer";
import { MyButton } from "./components/MyButton";
import { UserModal } from "./components/Modal";
import { List } from "./components/List";

import "./App.css";

const App = () => {
    const [dataSet, dispatch] = useReducer(listReducer, initDataSet);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <div className="App">
            {modalOpen && <UserModal closeModal={() => setModalOpen(false)} dispatch={dispatch} />}
            <div className="list-container">
                <div className="button-container">
                    <MyButton text="Add" onClick={() => setModalOpen(true)} />
                    <MyButton
                        disabled={!dataSet.find((item) => item.selected)}
                        text="Delete"
                        onClick={() => dispatch({ type: ActionType.DELETE })}
                    />
                    <MyButton disabled={dataSet.length < 1} text="Clear all" onClick={() => dispatch({ type: ActionType.CLEARAll })} />
                </div>

                {dataSet.length > 0 && <List dataSet={dataSet} dispatch={dispatch} />}
            </div>
        </div>
    );
};

export default App;
