
class ApiResponce{
    constructor(
        statuscode,
        data,
        message = "Success",
        success = false
    ){
        this.statuscode = statuscode
        this.data = data
        this.message = message
        this.success = success < 500
    }
}

export { ApiResponce }
