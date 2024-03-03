export class LoginResponse {
    token: string;
    role: string;
    userId: number;

    constructor(data: any) {
        this.token = data.token;
        this.role = data.role;
        this.userId = data.userId;
    }
}