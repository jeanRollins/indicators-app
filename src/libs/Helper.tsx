
import { Item } from 'react-native-multi-selectbox-typescript';
export default class Helper {


    public static transformToSelect( 
        data: Array<{}>, 
        name : string , 
        value : string 
        ) :  Array<Item> {

            console.log("data :: ", data);
            
        const items : Array<Item> = data.map( ( row: {} ) => {
            
            const item : never = name as keyof typeof row;
            const id   : never = value as keyof typeof row;

            return {
                item : row[item] , 
                id : row[id] 
            };
        }) ;

        return items ;
    }
}