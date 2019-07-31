import { TextInput,Button,Switch ,Provider as PaperProvider} from 'react-native-paper';
import {View,Text,Image,ScrollView,InteractionManager,ActivityIndicator,TouchableWithoutFeedback,Keyboard,KeyboardAvoidingView} from 'react-native';
import React,{Component} from 'react';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux';
import {LoginUserData,getallusers,getriders} from '../components/store/action/index';
import Toast from 'react-native-root-toast';




const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
class Login extends React.Component {


  static navigationOptions = ({ navigation }) => {
    return {
       header: () => null

    } 
}
  constructor(props){
    super(props);
    this.state = {
      ShowScreen:false,
      email: '',
      password:'',
      requestsend:false,
      feedbackmessage:'All fields are required'

    };
    this.loginAccount=this.loginAccount.bind(this);
    this.props.getallusers();
    this.props.getriders();

  }

 
 
componentDidMount(){
  InteractionManager.runAfterInteractions(() => {
    
    this.setState({
      ShowScreen: true,
    });
  });
}

  loginAccount=(email,password)=>{
    const {requestsend}=this.state;
  
    if(email!=''&&password!=''){
      //request true
      this.setState({requestsend:!requestsend});
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      this.setState({feedbackmessage:errorMessage,requestsend:false})
      Toast.show(this.state.feedbackmessage, {
        duration: 1400,
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
      
      // ...
    }).then((user)=>{


    if(user!=null){
      let userexist=false;
            this.props.allusers.map((objec)=>{
              if(objec.usertype=='user' &&objec.uid==user.user.uid){
                userexist=true;
                this.props.LoginUserData(objec);
                this.setState({requestsend:false,email:'',password:''})
      
            this.props.navigation.navigate('ListCategory');
              }
             
            })
            if(userexist!=true){
              this.setState({feedbackmessage:'Account not valid',requestsend:false});
      
      
            Toast.show(this.state.feedbackmessage, {
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
    })
  }
  else{
    Toast.show(this.state.feedbackmessage, {
     duration: 1300,
     position: Toast.positions.BOTTOM,
     shadow: true,
     animation: true,
     hideOnPress: true,
     delay: 0,
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




  // _scrollToInput() {
  //   const scrollResponder = this.refs.myScrollView.getScrollResponder();
  //   const inputHandle = React.findNodeHandle(this.refs.myInput)
  
  //   scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
  //     inputHandle, // The TextInput node handle
  //     0, // The scroll view's bottom "contentInset" (default 0)
  //     true // Prevent negative scrolling
  //   );
  // }
  render(){
    return (
      this.state.ShowScreen?
      (
        <ScrollView style={{backgroundColor:'#fff'}}>

        <KeyboardAvoidingView
        style={{backgroundColor:'#fff'}}
      behavior="padding"
    >

 <Image source={require('./assets/newlogo.png')} /> 



          <TextInput
              maxLength={20}

          style={{marginBottom:10,backgroundColor:'#fff',color:'black',marginLeft:10,marginRight:10}}
              keyboardType={'email-address'}
             
        label='Email'
        value={this.state.email}
        onChangeText={email => this.setState({ email })}
        type='outlined'
       />
 
         <TextInput
               maxLength={15}

        label='Password'        
          style={{marginBottom:10,backgroundColor:'#fff',marginLeft:10,marginRight:10}}

          

        value={this.state.password}
        onChangeText={password => this.setState({ password })}
        type='outlined'
        secureTextEntry={true} 
      />


 <View style={{flexDirection:'row'}}>
 <Button
  loading={this.state.requestsend}
  style={{marginTop:30,backgroundColor:'#0ead00',flex:1,marginRight:10,marginLeft:10}}
mode="contained" onPress={() => this.loginAccount(this.state.email,this.state.password)}>
Login  </Button> 

<Button
 
  
  style={{marginTop:30,backgroundColor:'#0ead00',flex:1,marginLeft:10,marginRight:10}}
mode="contained" onPress={() =>
 this.props.navigation.navigate('SignUpScreen')
}
 >
Sign Up  </Button>
</View> 

      <View style={{ height: 60 }} />
    </KeyboardAvoidingView>
    </ScrollView>
//         <DismissKeyboard>
//       <ScrollView ref="myScrollView" style={{backgroundColor:'#fff'}}>
// <PaperProvider>
//         <View style={{flex:1}}>
//         <View style={{flex:1}}>
// <Image source={require('./assets/newlogo.png')} /> 
//           </View>
//           <View style={{flex:1}}>
//       <TextInput
//               maxLength={20}

//           style={{marginBottom:10,backgroundColor:'#fff',color:'black',marginLeft:10,marginRight:10}}
//               keyboardType={'email-address'}
             
//         label='Email'
//         value={this.state.email}
//         onChangeText={email => this.setState({ email })}
//         type='outlined'
//       />
//        <TextInput
//                maxLength={15}

//         label='Password'        
//           style={{marginBottom:10,backgroundColor:'#fff',marginLeft:10,marginRight:10}}

          

//         value={this.state.password}
//         onChangeText={password => this.setState({ password })}
//         type='outlined'
//         secureTextEntry={true} 
//       />


// <View style={{flexDirection:'row'}}>
//  <Button
//   loading={this.state.requestsend}
//   style={{marginTop:30,backgroundColor:'#0ead00',flex:1,marginRight:10,marginLeft:10}}
// mode="contained" onPress={() => this.loginAccount(this.state.email,this.state.password)}>
// Login  </Button> 

// <Button
 
  
//   style={{marginTop:30,backgroundColor:'#0ead00',flex:1,marginLeft:10,marginRight:10}}
// mode="contained" onPress={() =>
//  this.props.navigation.navigate('SignUpScreen')
// }
//  >
// Sign Up  </Button> 
// </View>

//       </View>
//       </View>
//       </PaperProvider>
//       </ScrollView>
//       </DismissKeyboard>
):
      (<ActivityIndicator size="large" style={{flex:1,alignItems:'center',justifyContent:'center'}}  color="#000"/>)
    );
  }
}

function mapstatetoprops(state){
  return{
    allusers:state.Appdata.users

  }
}


function mapdispatchtoprops(dispatch){
return{
  LoginUserData:(obj)=>{
    dispatch(LoginUserData(obj))
  },
  getallusers:()=>{
    dispatch(getallusers())
  },
  getriders:()=>{
    dispatch(getriders())
  }
}
}

export default connect(mapstatetoprops,mapdispatchtoprops)(Login)




