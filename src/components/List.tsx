import { IFullListItem, IListProps } from "../utils/interfaces";
import { ActionType } from "../reducers/listReducer";

export const List = ({ dataSet, dispatch }: IListProps) => (
    <ul>
        {dataSet.map((item: IFullListItem) => (
            <li
                className={`${item.selected ? "selected" : ""} no-select`}
                key={item.id}
                onClick={() => dispatch({ type: ActionType.SELECT, payload: { id: item.id } })}
            >
                <p>User: {item.user}</p>
                <p>Age: {item.age}</p>
            </li>
        ))}
    </ul>
);
