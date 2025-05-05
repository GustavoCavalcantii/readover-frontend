import 'axios';

declare module 'axios' {
    interface AxiosRequestConfig{
        noAuth?: boolean;
    }
}