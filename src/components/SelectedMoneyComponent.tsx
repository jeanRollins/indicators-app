import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { styles } from './../styles';
import IIndicators from './../interfaces/services/IIndicators';
import { Item } from 'react-native-multi-selectbox-typescript';

interface Props {
    indicators : IIndicators[] ;
    action : ( quantity : number , selected : Item ) => void ;
}

export const SelectedMoneyComponent = ({ indicators, action } : Props ) => {

    const amounts : Array<number> = [5,10] ;
    const onPress = ( quantity : number , selected : Item ) =>{
        action( quantity, selected )  ;
    };

    return (
        <> 

            { indicators.map( (ind: IIndicators ) => (
                <TouchableOpacity
                    style={styles.selected}
                    onPress={ () => onPress( 5, { id : ind.code, item:  ind.name })}
                    key = {ind.code}
                >
                    <Text style={styles.textSelected}> 5 - {ind.name} </Text>
                </TouchableOpacity>
            ))}
        </>
    )
}
