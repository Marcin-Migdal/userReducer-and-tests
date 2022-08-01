import React, { useState } from "react";

import { ActionType, ListActionType } from "../reducers/listReducer";

interface IUserModal {
    closeModal: Function;
    dispatch: React.Dispatch<ListActionType>;
}

export const UserModal = ({ closeModal, dispatch }: IUserModal) => {
    const [user, setUser] = useState<string>("");
    const [age, setAge] = useState<number>(0);

    const handleSubmit = () => {
        dispatch({ type: ActionType.ADD, payload: { user, age } });
        closeModal();
    };

    return (
        <div className="modal-container">
            <form className="form" onSubmit={handleSubmit}>
                <h3>Add user</h3>

                <input type="text" placeholder="User" value={user} onChange={(e) => setUser(e.target.value)} />
                <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(parseInt(e.target.value))} />

                <div className="footer">
                    <button type="submit" disabled={!(age > 0) || user.trim().length < 4}>
                        Add
                    </button>
                    <button onClick={() => closeModal()}>Close</button>
                </div>
            </form>
        </div>
    );
};
