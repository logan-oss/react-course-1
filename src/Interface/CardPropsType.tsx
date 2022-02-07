export type CardPropsType = {
    id: string;
    title: string;
    text: string;
    complete: boolean;
    suppr: (id: String) => void;
    setTitle: (id: String, title: String) => void;
    setText: (id: String, text: String) => void;
    setComplete: (id: String, complete : boolean) => void;
};