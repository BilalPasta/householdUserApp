import React from 'react';
import { Text, View, ScrollView,InteractionManager ,ActivityIndicator,Button,StatusBar} from 'react-native';
import Items from './items';

import ShoppingCartIcon from './ShoppingCartIcon';



export default class CategoryRelatedItemsPage extends React.Component {

static navigationOptions = ({ navigation }) => {
  return {
     title: navigation.getParam('title'),
     headerRight: (

  <ShoppingCartIcon onPress={()=>navigation.navigate('CartDisplay')}/>
      )
  };
}

  constructor(props) {
    super(props);
    this.state = {
      ShowScreen: true,

    
    }

  }


  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
    
      this.setState({
        ShowScreen: true,
      });
    });
   }


  render() {
    const { params } = this.props.navigation.state;
    const RelatedMenu = params ? params.Menu : null;   
    const RelatedMenuIndex=params?params.CategoryIndex:null;
     return (
       <View style={{backgroundColor:'#fff',flex:1}}>
                <StatusBar
          barStyle="light-content"
          backgroundColor="#0ead00"
        />
     { this.state.ShowScreen?(

      <View >
        <ScrollView>
          {RelatedMenu.subcategoryitemlist.map((SubcategoryObject,SubcategoryIndex) =>
            <View key={SubcategoryIndex} style={{ marginTop: 20 }}>
              <Text
                style={{
                  marginLeft: 7,
                  marginBottom: 7,
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
              > {SubcategoryObject.subcategoryname} </Text>

              <ScrollView horizontal>

                <Items itemlist={SubcategoryObject.itemlist} Categoryname={RelatedMenu.categoryname} Subcategoryname={SubcategoryObject.subcategoryname} CategoryIndex={RelatedMenuIndex} SubcategoryIndex={SubcategoryIndex} />

              </ScrollView>
            </View>)}



        </ScrollView>
      </View>
    ):(<ActivityIndicator size="large" style={{flex:1,alignItems:'center',justifyContent:'center'}}  color="#000"/>)
                 } 
                 </View>  ) }
  
}



