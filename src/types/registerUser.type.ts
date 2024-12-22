export interface RegisterUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
}

export type RegisterUserResponse = {
    username: string;
    email: string;
}