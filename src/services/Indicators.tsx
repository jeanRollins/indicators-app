import HttpRequest from "../libs/HttpRequest";
import IIndicators from './../interfaces/services/IIndicators';
import { AxiosResponse } from 'axios';

export default class Indicators {

    private url : string = "https://mindicador.cl/api" ;
    private request : HttpRequest ;
    private indicatorsPrincipals : Array<string> = ["uf", "dolar", "euro", "utm","bitcoin"] ;
    private indicatorsFirst      : Array<string> = ["dolar", "euro"] ;
    private indicatorsFounded : {} = {} ;

    constructor(){
        this.request = new HttpRequest();
        this.request.setRequest( this.url ) ;
        this.setIndicatorFounded() ;
    }

    private async getIndicators() : Promise<{}> {
        const indicators: AxiosResponse = await this.request.get() ;
        return indicators.data ;
    }
    public async setIndicatorFounded(): Promise<void> {
        this.indicatorsFounded = await this.getIndicators() ;
    }

    private  orderIndicators( principal : string) : Array<IIndicators> {
        
        const indic: Array<string> = (principal === "principal" )
        ? this.indicatorsPrincipals 
        : this.indicatorsFirst ;
        
        const data = indic.map( (code : string) => {
            const key    : never = code as keyof typeof this.indicatorsFounded;
            const codigo : never = "codigo" as keyof typeof this.indicatorsFounded;
            const nombre : never = "nombre" as keyof typeof this.indicatorsFounded;
            const valor  : never = "valor" as keyof typeof this.indicatorsFounded;
            
            return {
                code:  this.indicatorsFounded[key][codigo] ,
                name:  this.indicatorsFounded[key][nombre] + ` - $${this.indicatorsFounded[key][valor]}` ,
                value: this.indicatorsFounded[key][valor]
            } ; 
        });    

        return data ;
     
    }
    public getAllIndicators() : IIndicators[] {
        const indicators : IIndicators[] = this.orderIndicators( "principal") ;
        return indicators ;
    }

    public  getPrincipalIndicator() : IIndicators[] {
        const indicators : IIndicators[] = this.orderIndicators( "") ;
        return indicators ;
    }
}