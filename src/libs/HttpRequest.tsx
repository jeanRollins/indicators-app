
import axios, { AxiosResponse } from 'axios' ;

export default class HttpRequest {

    
    private method : string = "" ;
    private url    : string = "" ;
    private data   : {} = {} ;

    constructor( ) {
   
    }

    private async request() : Promise<AxiosResponse> {

        const response : AxiosResponse = await axios({
            method  : this.method ,
            url     : this.url ,
            data    : this.data 
        }) ;
        return response ;
    }

    public setRequest(url : string, method? : string  , data? : {}  ) {
        this.url     = url ;
        this.method  = method === undefined ? "get" : method ;
        this.data    = data   === undefined ? {}    : data ;
    }

    public async get() : Promise<AxiosResponse> {
        const response : AxiosResponse = await this.request() ;
        return response ;
    }
    
}