export type ListTodoPropsType = {
    id : number;
    title : String; 
    supprList: (id: number) => void;
};