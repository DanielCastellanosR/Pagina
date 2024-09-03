export interface CustomerEntry {
    code:string;
    first_name: string;
    last_name: string;
    gener:string;
    facultad:string;
    carrera:string;
    email: string;
    password: string;

}

export interface CustomerData extends CustomerEntry {
    id: number;
}

export type Post = {
    id: number;
    description: string;
    image: string;
    name: string;
};
