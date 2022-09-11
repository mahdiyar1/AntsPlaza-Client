export  interface User {
    username: string;
    email: string;
    id: string;
}

export interface Token {
    access: string
}

export interface UserFromValues {
    username: string;
    password: string;
}