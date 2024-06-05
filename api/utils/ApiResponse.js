class ApiResponse {
    constructor(
        statusCode,
        data = null,
        message = "Something Went Wrong",
        success = false
    ){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = success < 500;
    }
}

export  { ApiResponse }