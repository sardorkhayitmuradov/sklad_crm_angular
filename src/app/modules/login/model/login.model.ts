export interface LoginRequest {
    phone_number: string;
    password: string;
}

export interface LoginResponse {
    message: string,
    token: string;
}

export interface LoginError {
    error: string;
}