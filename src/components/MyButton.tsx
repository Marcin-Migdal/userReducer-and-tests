import { ButtonHTMLAttributes } from "react";

interface IMyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

export const MyButton = (props: IMyButtonProps) => {
    return <button {...props}>{props.text}</button>;
};
