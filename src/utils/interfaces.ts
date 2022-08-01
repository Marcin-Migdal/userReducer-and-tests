export interface IListItem {
    user: string;
    age: number;
}

export interface IFullListItem extends IListItem {
    id: string;
    selected?: boolean;
}

export interface IListProps {
    dataSet: IFullListItem[];
    dispatch: Function;
}
