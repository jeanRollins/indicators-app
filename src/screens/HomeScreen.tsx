import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { SelectedMoneyComponent } from '../components/SelectedMoneyComponent';
import { styles } from './../styles';
import Indicators from '../services/Indicators';
import IIndicators from './../interfaces/services/IIndicators';
import SelectBox, { Item } from 'react-native-multi-selectbox-typescript'
import { BACKGROUND_COLOR_PRIMARY, TEXT_COLOR_PRIMARY } from './../stylesVar';
import Helper from './../libs/Helper';

export const HomeScreen = () => {

  const [indicators, setIndicators] = useState<IIndicators[]>( [] );
  const [indicatorsPrincipals, setIndicatorsPrincipals] = useState<IIndicators[]>([]);
  const [quantity, setQuantity] = useState<string>("1");
  const [money, setMoney] = useState<any>() ;
  const [options, setOptions] = useState<Array<Item>>([]) ;
  const [peso, setPeso] = useState<number>(0) ;

  const getIndicator = async () : Promise<void> => {
    const indicator : Indicators = new Indicators() ;

    await indicator.setIndicatorFounded();
    const indicatorsFounded : IIndicators[] = await indicator.getAllIndicators();
    
    const indicatorsPrincipalsFounded_ : IIndicators[] = await indicator.getPrincipalIndicator();
    
    const options_ : Array<Item> = Helper.transformToSelect( indicatorsFounded , "name", "code" );

    setIndicatorsPrincipals( indicatorsPrincipalsFounded_ ) ;
    setIndicators( indicatorsFounded ) ; 
    setOptions( options_ ) ;
  }

  const onChanged = ( selected : Item) => {
    setMoney(selected) ;
    changeChileanPeso(selected.id.toString()) ;
  } ;

  const changeChileanPeso = ( code : string, _quantity: string = "" ) : void => {
    
    const quantity_ : number = _quantity == "" ? parseInt( quantity ) : parseInt( _quantity )  ; 
    const value : number = getPriceByValue( code ) ;
    setPeso( (value * quantity_)) ;
  } ;


  const getPriceByValue = ( code : string ) : number => {
    let value : number = 0 ;
    indicators.forEach( ( ind:IIndicators ) => {
      if( code == ind.code ) value = ind.value ;
    }) ;
    return value ;
  } ;

  const changeValues = ( quantity : string , selected : Item) : void => {
    setQuantity( quantity ) ;
    setMoney( selected ) ;
  } ;

  const actionSelectedMoneyComponent = ( quantity : number , selected : Item ) : void => {
    changeValues( quantity.toString() , selected) ;
    changeChileanPeso(selected.id.toString(), quantity.toString()) ;
  } ;

  const changeQuantity = ( textQuantity : string ) : void => {
    setQuantity( textQuantity);
    changeChileanPeso(money.id.toString(), textQuantity) ;
  } ;
  
  useEffect(() => {
    getIndicator() ;
  }, [])
  
  return indicators.length > 0 ? (
    <>
      <View  style = { styles.titleContent }>
        <Text style = { styles.title } > Change Money App </Text>
      </View>
      <View style = { styles.container }>
        <Text style = { styles.label } > Quantity </Text>
        <TextInput
        style={styles.input}
          onChangeText={ (text : string )=> changeQuantity( text )}
          value={quantity}
          placeholder=""
          keyboardType="numeric"
        />
      </View>

      <View style = { styles.container }>
        <Text style = { styles.label } > Money </Text>
          <SelectBox
            label=""
            options = { options }
            value   = { money }
            onChange= { (val : Item) => onChanged( val )}
            hideInputFilter = { true }
            searchIconColor = { TEXT_COLOR_PRIMARY }
            arrowIconColor  = { TEXT_COLOR_PRIMARY }
            optionContainerStyle = {{backgroundColor : BACKGROUND_COLOR_PRIMARY}}
          />
      </View>

      <View  style = { styles.titleContent }>
        <SelectedMoneyComponent 
          indicators = { indicatorsPrincipals }
          action = {actionSelectedMoneyComponent}
        />
      </View>

      <View  style = { styles.titleContent }>
        <Text style = { styles.titleValue } > Chilean Peso : ${ peso } </Text>
      </View>
    </>
  ): (<Text> Cargando ...</Text>)
}
