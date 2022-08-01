import { v4 as uuidv4 } from "uuid";

import { IFullListItem, IListItem } from "../utils/interfaces";

export enum ActionType {
    ADD = "ADD",
    DELETE = "DELETE",
    CLEARAll = "CLEARAll",
    SELECT = "SELECT",
}

export type ListActionType =
    | { type: ActionType.ADD; payload: IListItem }
    | { type: ActionType.DELETE }
    | { type: ActionType.CLEARAll }
    | { type: ActionType.SELECT; payload: { id: string } };

export const initDataSet: IFullListItem[] = [];

export const listReducer = (dataSet: IFullListItem[], action: ListActionType): IFullListItem[] => {
    switch (action.type) {
        case ActionType.ADD:
            return [...dataSet, { id: uuidv4(), ...action.payload }];
        case ActionType.DELETE:
            const selectedItemId = dataSet.find((item) => item.selected)?.id;
            return dataSet.filter((item) => item.id !== selectedItemId);
        case ActionType.SELECT:
            const shallowCopy = [...dataSet];
            return shallowCopy.map((item) => ({ ...item, selected: item.id === action.payload.id ? !item.selected : false }));
        case ActionType.CLEARAll:
            return [];
        default:
            return dataSet;
    }
};
