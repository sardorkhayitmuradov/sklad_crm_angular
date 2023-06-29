export interface SuperAdminLoginRequest {
    email: string;
    password: string;
}

export interface SuperAdminLoginResponse {
    message: string,
    token: string;
    error: {
        error: string
    };
}