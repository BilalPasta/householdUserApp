
import React,{Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import ListCategory from './listcategory';
import {Image,TouchableOpacity,View,Text} from 'react-native'
import OrderList from './orderlist';
import Profile from './profile';
import GetCardDetails from './creditcard';
import CartDisplay from './cartitems';
import LoginScreen from './login';
import SignUpScreen from './signup';
import SplashScreen from './splash';
import CategoryRelatedItems from './categoryrelateditems';
import { Button } from 'react-native-paper';


import Mapscreen from './map';
import listcategory from './listcategory';
import profile from './profile';

 export const Stack = createStackNavigator({

SplashScreen:{
  screen:SplashScreen,
  navigationOptions:{
    header:null
  }
},
LoginScreen:{
screen:LoginScreen,
navigationOptions:{
  header:null
}
},
SignUpScreen:{
screen:SignUpScreen,
navigationOptions:{
  header:null
}
},

  ListCategory: { screen: ListCategory,
                  navigationOptions: {
                    header:null
                  },
                },
  CategoryRelatedItems: { screen: CategoryRelatedItems,
                navigationOptions: {
                  header:null
                },
              },

  CartDisplay: {
    screen: CartDisplay,
    navigationOptions: {
      header:null
    }},
    map: {
      screen: Mapscreen,
      navigationOptions: {
        drawerLabel: 'Map',
        drawerIcon: <Icon name="map" size={22} color={'black'} />,
        header:null
      }
    },
    GetCardDetails:{
      screen:GetCardDetails,
      navigationOptions:{
        header:null
      }
    } 
  ,

    myProfile: {
      screen: Profile,
      navigationOptions: {
        drawerLabel: 'My Profile',
        drawerIcon: <MaterialIcon name="face" size={22} color={'black'} />,
        header:null
      }
    },   
  
},
{
  initialRouteName: 'SplashScreen',
});



 const Drawer = createDrawerNavigator({

  home: {
    screen: Stack,
    navigationOptions: {
      // drawerLockMode: 'locked-closed',
      drawerLabel: 'Home',
      drawerIcon: <Icon name="home" size={22} color={'black'} />,
    }
  },
  
  // map: {
  //   screen: Map,
  //   navigationOptions: {
  //     drawerLabel: 'Map',
  //     drawerIcon: <Icon name="map" size={22} color={'black'} />,
  //   }
  // },

  myProfile: {
    screen: Profile,
    navigationOptions: {
      drawerLabel: 'My Profile',
      drawerIcon: <MaterialIcon name="face" size={22} color={'black'} />,
    }
  },
  OrderList:{
    screen:OrderList,
    navigationOptions:{
      drawerLabel: 'My Orders',
      drawerIcon: <MaterialIcon name="face" size={22} color={'black'} />,

    }
  }
  // ,CartDisplay: {
  //   screen: OrderList,
  //   navigationOptions: {
  //     drawerLabel: 'My Orders',
  //     drawerIcon: <MaterialIcon name="face" size={22} color={'black'} />,
  //   }},
  
  // myOrders: {
  //   screen: MyOrdersContent,
  //   navigationOptions: {
  //     drawerLabel: 'My Orders',
  //     drawerIcon: <Icon name="list-ul" size={18} color={'black'} />,
  //   }
  // },
  // wallet: {
  //   screen: WalletContent,
  //   navigationOptions: {
  //     drawerLabel: 'Wallet',
  //     drawerIcon: <EntypoIcon name="wallet" size={20} color={'black'} />,
  //   }
  // },
  // faqs: {
  //   screen: FAQsContent,
  //   navigationOptions: {
  //     drawerLabel: 'FAQs',
  //     drawerIcon: <Icon name="info-circle" size={20} color={'black'} />,
  //   }
  // },
//   signOut: {
//     screen: SignOut,
//     navigationOptions: {
//       drawerLockMode: 'locked-closed',
//       drawerLabel: 'Sign Out',
//       drawerIcon: <Icon name="sign-out" size={20} color={'black'} />,
//     }
//   },

});


export const AuthStack=createStackNavigator(
  {
      SplashScreen:SplashScreen,
      LoginScreen:LoginScreen,
      SignUpScreen:SignUpScreen
  }, {
      initialRouteName: 'SplashScreen',
      navigationOptions: {
      //   headerTintColor: '#fff',
      //   headerStyle: {
      //     backgroundColor: '#000',
      //   },
        // gesturesEnabled: true,
        // gesturesDirection: 'inverted',
        header:null,
        drawerLockMode: 'locked-closed'

      },
     
      headerMode:'screen',
      transitionConfig: () => ({
        screenInterpolator: sceneProps => {
          const { layout, position, scene } = sceneProps;
          const { index } = scene;
          const width = layout.initWidth;
    
          return {
            opacity: position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [ 0, 1, 0],
            }),
            transform: [{
              translateX: position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [-width, 0, width],
              }),
            }]
          };
        },
        headerTitleInterpolator: sceneProps => {
          const { layout, position, scene } = sceneProps;
          const { index } = scene;
    
          return {
            opacity: position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [ 0, 1, 0], 
            }),
            transform: [{
              translateX: position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [-50, 0, 50],
              }),
            }]
          };
        },
      }),
    
    }
)



  class DrawerItemList extends Component {
    render() {
      return (  
      
        <View style={{flex:1}} >

<View >
        <Image style={{width:220,height:200}} source={require('./assets/newlogo.png')} /> 
                  </View>
          
            <View >
            
            <Button style={{backgroundColor:'#000',margin:10}} icon={require('./assets/categorylist.png')} mode="contained" onPress={()=>this.props.navigation.navigate("ListCategory")}>
HOME    </Button>
<Button style={{backgroundColor:'#000',margin:10}} icon={require('./assets/profile.png')} mode="contained" onPress={()=>this.props.navigation.navigate("myProfile")}>
PROFILE </Button>

<Button style={{backgroundColor:'#000',margin:10}} icon={require('./assets/cart.png')} mode="contained" onPress={()=>this.props.navigation.navigate("CartDisplay")}>
CART    </Button>
<Button style={{backgroundColor:'#000',margin:10}} icon={require('./assets/categorylist.png')} mode="contained" onPress={()=>this.props.navigation.navigate("OrderList")}>
ORDERS  </Button>

<Button style={{backgroundColor:'#000',margin:10}} icon={require('./assets/logout.png')} mode="contained" onPress={()=>this.props.navigation.navigate("LoginScreen")}>
 SIGNOUT    </Button>

{/* <TouchableOpacity style={{flexDirection:"row"}}  activeOpacity={0.5} onPress={()=>this.props.navigation.navigate("ListCategory")}>
   
   <View style={{flex:1}}> <Image
     source={require('./assets/categorylist.png')}
     style={{ padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode: 'stretch'}}
    />
    </View>
    <View style={{   backgroundColor: '#fff',
    width: 1,
    flex:1,
    height: 40,}} >
    <Text style={{color: '#000',
    marginBottom: 4,
   }}> HOME </Text>
   </View>
</TouchableOpacity> */}
            
             {/* <TouchableOpacity   full info onPress={()=>this.props.navigation.navigate("ListCategory")}>
                 <Text  style={{marginLeft:35,color:'#fff',fontSize:18,fontWeight:"bold",height:24}}>HOME</Text>
          </TouchableOpacity>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate("myProfile")}> 
             <View style={{flexDirection:'row'}}>
             <Image style={{flex:1,width:24}} source={require('./assets/categorylist.png')}/>     
               <Text style={{marginLeft:35,color:'#000',fontSize:18,fontWeight:"bold",height:24,flex:2}}>PROFILE
                 </Text>
                 </View>
             </TouchableOpacity>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate("CartDisplay")}> 
        <Text style={{marginLeft:35,color:'#fff',fontSize:18,fontWeight:"bold",height:24}}>Cart
                 </Text>
             </TouchableOpacity>   
       */}
    
              </View>
            
          </View>
  
      );
    }
  }
  // 




export const AppStack=createStackNavigator(
  {
      AuthStack:AuthStack,
      ListCategory:listcategory,
      CategoryRelatedItems:CategoryRelatedItems,
      CartDisplay:CartDisplay,
      Map:Mapscreen,
      GetCardDetails:GetCardDetails,
      myProfile:Profile,
      OrderList:OrderList



  }, {
      initialRouteName: 'AuthStack',
      // navigationOptions: {
      // //   headerTintColor: '#fff',
      // //   headerStyle: {
      // //     backgroundColor: '#000',
      // //   },
      //   // gesturesEnabled: true,
      //   // gesturesDirection: 'inverted',
      //   // header:null
      // },
      navigationOptions: {
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#0ead00',
        },
        // gesturesEnabled: true,
        // gesturesDirection: 'inverted',
      },
     
      headerMode:'screen',
      transitionConfig: () => ({
        screenInterpolator: sceneProps => {
          const { layout, position, scene } = sceneProps;
          const { index } = scene;
          const width = layout.initWidth;
    
          return {
            opacity: position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [ 0, 1, 0],
            }),
            transform: [{
              translateX: position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [-width, 0, width],
              }),
            }]
          };
        },
        headerTitleInterpolator: sceneProps => {
          const { layout, position, scene } = sceneProps;
          const { index } = scene;
    
          return {
            opacity: position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [ 0, 1, 0],
            }),
            transform: [{
              translateX: position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [-50, 0, 50],
              }),
            }]
          };
        },
      }),
    
    }
)




export const AppDrawer = createDrawerNavigator({
AuthStack:AuthStack,
AppStack:AppStack,
myProfile:Profile,
OrderList:OrderList
},{
  initialRouteName: 'AuthStack',
  navigationOptions: {
  //   headerTintColor: '#fff',
  //   headerStyle: {
  //     backgroundColor: '#000',
  //   },
    // gesturesEnabled: true,
    // gesturesDirection: 'inverted',
    // header:null
  },
 drawerLockMode:'locked-closed',
  headerMode:'screen',
  transitionConfig: () => ({
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;
      const width = layout.initWidth;

      return {
        opacity: position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [ 0, 1, 0],
        }),
        transform: [{
          translateX: position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [-width, 0, width],
          }),
        }]
      };
    },
    headerTitleInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;

      return {
        opacity: position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [ 0, 1, 0],
        }),
        transform: [{
          translateX: position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [-50, 0, 50],
          }),
        }]
      };
    },
  }),

    drawerPosition:'left',
  drawerWidth:220,
  contentComponent:DrawerItemList,
  contentOptions:{
      activeTintColor:'white'
  }
 
});