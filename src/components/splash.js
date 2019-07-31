import React,{Component} from 'react';
import {View,ActivityIndicator,Dimensions,ImageBackground,Text} from 'react-native';
import {connect} from 'react-redux';
import {Getdata} from './store/action/index';
let {width} = Dimensions.get('window');

class SplashScreen extends React.Component{
    static navigationOptions = {
        header: null,
        headerhide:true
    }
    constructor(props){
        super(props);


        if(this.props.currentUser==null){
            this.props.Getdata();
            setTimeout(()=>{
                if(this.props.Appdata!=null)
{
                this.props.navigation.navigate('LoginScreen')
}
        
                } ,4000);

    
             
      }
    else{
        this.props.navigation.navigate('ListCategory')
    
    }
       

    }


    componentDidMount(){
      
        if(this.props.currentUser!=null&&this.props.Appdata!=null){
            this.props.navigation.navigate('ListCategory')

        }
}



    render() {
     
    return (
         <View style={{flex:1}}> 
      
 <ImageBackground style={{flex:1,width:width}}   source={require('./assets/splash.jpeg')}  resizeMode="contain"> 
  <ActivityIndicator animating={true} size="large" style={{flex:1,alignItems:'center',justifyContent:'center'}}  color="#fff"/> 

 </ImageBackground>  


  
     </View>
     
  
     ) 
    
}}

function mapstatetoprops(state){
    return{
      Appdata:state.Appdata,
      currentUser:state.Appdata.CurrentUser
    }
}

function mapdispatchtoprops(dispatch){
    return{
        Getdata:()=>{
            dispatch(Getdata());
        }
}
}

export default connect(mapstatetoprops,mapdispatchtoprops)(SplashScreen);