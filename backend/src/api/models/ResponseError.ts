export default interface ResponseError{
    status: number;
    message: string;
    stack?: string;
}