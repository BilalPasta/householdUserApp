


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  InteractionManager,
  ActivityIndicator,
  Image,
  TouchableOpacity

  
} from 'react-native';
import Toast from 'react-native-root-toast';

import {Button} from 'react-native-paper';
import {IncrementCartItemCount,DecrementCartItemCount} from './store/action/index'
import {connect} from 'react-redux';

class CardView extends Component {



  static navigationOptions = ({ navigation }) => {
    return {
       title: 'Cart',
 
    };
  }
  constructor(props) {
    super(props);

    this.state={
      ShowScreen:false,
      
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
    return (
      this.state.ShowScreen?
      (
        <View style={{backgroundColor:'#fff',flex:1}}>
                    <StatusBar
          barStyle="light-content"
          backgroundColor="#0ead00"
        />

          <View style={{flexDirection:'row',marginTop:12}}>
          <Text style={{flex:1,textAlign:'center',fontSize:15,color:'#003366',borderWidth:2,borderColor:'#000'}}>Total
            </Text>
            <Text style={{flex:1,textAlign:'center',fontSize:15,color:'#003366',borderWidth:2,borderColor:'#000'}}>{this.props.CartItems.TotalAmount}
            </Text>
            </View>

       
      <ScrollView style={{flex:10}}>
        {
      this.props.CartItems.selectedItems.map((obj,index)=>
      <View key={index} style={styles.box}>
              <Image style={styles.image} source={{uri: obj.itemdetails.imageUrl}} />
              <View style={styles.boxContent}>
                <Text style={styles.title}>{obj.categoryname}</Text>
                <Text style={styles.description}>{obj.subcategoryname}: {obj.itemdetails.itemname} </Text>
                <Text style={styles.description}>({obj.itemdetails.itemquantity})</Text>
                <View style={styles.buttons}>
                  <TouchableOpacity style={[styles.button, styles.view]} onPress={()=>this.props.DecrementCartItemCount(index)} >
                    <Image style={styles.icon} source={require('./assets/delete.png')}/>
                    
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.button, styles.profile]} >
                    {/* <Image  source={{uri: 'https://png.icons8.com/male-user/win8/30/ffffff'}}/> */}
                    <Text style={styles.itemcount}>
                    {obj.count}
                      </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.button, styles.message
                  
                  ]}   onPress={()=>this.props.IncrementCartItemCount(index)} >
                    <Image style={styles.icon} source={require('./assets/plus.png')}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>)}
      
    </ScrollView>
    <View  style={{marginTop:5}}>
 <Button
 style={{backgroundColor:'#0ead00'}}
  
  
mode="contained" onPress={() => {
if(this.props.CartItems.TotalAmount>150){
 
this.props.navigation.navigate('Map')}
else{
  Toast.show('Order should be greater than 150', {
    duration: 1300,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 100,
    onShow: () => {
        // calls on toast\`s appear animation start
  
    },
    onShown: () => {
        // calls on toast\`s appear animation end.
  
    },
    onHide: () => {
        // calls on toast\`s hide animation start.
    },
    onHidden: () => {
        // calls on toast\`s hide animation end.
  
  
    }
  })
}
}

}>
Online Payment  </Button>
</View> 

    </View>):(<ActivityIndicator size="large" style={{flex:1,alignItems:'center',justifyContent:'center'}}  color="#000"/>)
    );
  }
}

function mapstatetoprops(state){
  return{
CartItems:state.Appdata

  }
}



function mapdispatchtoprops(dispatch){
  return{
    IncrementCartItemCount:(index)=>{
      dispatch(IncrementCartItemCount(index))
    },
    DecrementCartItemCount:(index)=>{
dispatch(DecrementCartItemCount(index))
}  }
}


export default connect(mapstatetoprops,mapdispatchtoprops)(CardView);
const styles = StyleSheet.create({
  image: {
    // width: 100,
    // height:100,
    width:90,
    height:90,
    borderRadius:45,
    borderWidth:2,
    borderColor:"#ebf0f7"
  },
  box: {
    padding:20,
    // marginTop:5,
    // marginBottom:5,
    backgroundColor: '#fff',
    flexDirection: 'row',
     borderBottomWidth:2,
    borderColor:"#ebf0f7"

    
  },
  boxContent: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft:10,
  },
  title:{
    fontSize:18,
    // color:"#151515",
  },
  description:{
    fontSize:15,
    // color: "#646464",
  },
  buttons:{
    flexDirection: 'row',
  },
  button: {
    height:35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent:'center',
    borderRadius:10,
    width:50,
    marginRight:5,
    marginTop:5,
  },
  icon:{
    width:20,
    height:20,
  },
  itemcount:{
    width:20,
    height:20,
    alignItems:'center'
  },
  view: {
    // backgroundColor: "#FF1493",
  },
  profile: {
    // backgroundColor: "#1E90FF",
  },
  message: {
    // backgroundColor: "#228B22",
  },
});


