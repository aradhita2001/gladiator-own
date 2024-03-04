export class ExceptionResponse {
    exceptionTime: Date;
    exceptionMessage: string;
    requestDescription: string;

    constructor(data: any) {
        this.exceptionTime = data.exceptionTime;
        this.exceptionMessage = data.exceptionMessage;
        this.requestDescription = data.requestDescription;
    }
}