import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button,TouchableOpacity,StatusBar, ScrollView ,ActivityIndicator,InteractionManager} from 'react-native';
import CardSection from './cartsection'
import Card from './card';
import {connect} from 'react-redux';
import {AddItemToCart} from './store/action/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import ShoppingCartIcon from './ShoppingCartIcon';



class ListCategory extends Component {

static navigationOptions = ({ navigation }) => {
  return {
     title: 'CATEGORIES',
     headerLeft: (
      <TouchableOpacity style={{marginLeft:5}} onPress={() => navigation.openDrawer()}>
            <Icon name="navicon" size={30} color={'white'} />
        </TouchableOpacity>
      ),
      headerRight: (
   
    <ShoppingCartIcon onPress={()=>navigation.navigate('CartDisplay')}/>
        )
  };
}


  constructor(props){
    super(props);
    this.state={
      ShowScreen: true,


    }
    this.props.navigation.closeDrawer();
  }
  render() {
    return (
      <View style={{backgroundColor:'#fff',flex:1}}>
              <StatusBar
          barStyle="light-content"
          backgroundColor="#0ead00"
        />
     { this.state.ShowScreen?(
        <View  >

      <ScrollView>
{this.props.Appdata.CategoryWithMenu.map((categoryObject,categoryindex)=>
<TouchableOpacity 
  key={categoryindex}
onPress={() =>{
 this.props.navigation.navigate('CategoryRelatedItems',{Menu:categoryObject,CategoryIndex:categoryindex,title:categoryObject.categoryname})


}
 }>
<Card>
  <CardSection>
    <View style={styles.thumbnailStyle}>
      <Image source={{uri:categoryObject.imageUrl}} style={styles.thumbnailImage} />
      
    </View>

    <View style={styles.infoStyle}>
      <Text style={styles.infoTextStyle}> {categoryObject.categoryname} </Text>
      <Text style={styles.infoTextStyle}> {categoryObject.description} </Text>
    </View>
  </CardSection>
</Card>
</TouchableOpacity>)}
        


      </ScrollView>
      </View>):
      (<ActivityIndicator size="large" style={{flex:1,alignItems:'center',justifyContent:'center'}}  color="#000"/>)
        } 
        </View> );
  }



  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
    
      this.setState({
        ShowScreen: true,
      });
    });
   }
}

const styles = StyleSheet.create({
  thumbnailImage: {
    // width: 60,
    // height: 95,
    width:90,
    height:90,
    borderRadius:45,
    borderWidth:2,
    borderColor:"#ebf0f7"
  },
  thumbnailStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 15,
  },
  infoStyle: {
    marginTop: 25,
    flexDirection: 'column',
  },
  infoTextStyle: {
    color: '#000000',
    fontSize: 15,
    fontFamily: 'serif',
  },
});


function mapstatetoprops(state){
  return{
Appdata:state.Appdata
  }
}

function mapdispatchtoprops(){
  return{
    AddItemToCart:(itemobj,categoryname)=>{
      dispatch(AddItemToCart(itemobj,categoryname));

    }

  }
}


export default connect(mapstatetoprops,mapdispatchtoprops)(ListCategory)