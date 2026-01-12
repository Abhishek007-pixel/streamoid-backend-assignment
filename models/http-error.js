class HttpError extends Error {
    constructor(mesaage , errorCode){

        //this.message = this.message;

          super(mesaage);
            this.code = errorCode;
        }
    }


    module.exports = HttpError;
