import { TextInput,Button,Switch } from 'react-native-paper';
import {View,Text,Image,ScrollView,InteractionManager,ActivityIndicator,TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import React,{Component} from 'react';
import firebase from 'react-native-firebase';
import Toast from 'react-native-root-toast';


export default class SignUp extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
       header: () => null
    } 
}
  constructor(props){
super(props);
    this.state = {
      ShowScreen:false,
      username:''
,   email: '',
    password:'',
   usertype:'user',
    feedbackmessage:'All fields are required',
    requestsend:false,
    contact:'',
    address:''
  };
  this.signupAccount=this.signupAccount.bind(this);
  }



  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
    
      this.setState({
        ShowScreen: true,
      });
    });
  }

  signupAccount=(username,email,password,contact,address)=>{
    
    const {requestsend}=this.state;
  
    if(username!='',email!=''&&password!=''&&contact!=''&&address!=''){
      this.setState({requestsend:!requestsend})
    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error)=> {
        var errorMessage = error.message;
        this.setState({feedbackmessage:errorMessage,requestsend:false})

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

        // console.log(errorCode);

        // ...
      }).then((result)=>{
        // console.log(result)
        if(result!=null){
        let obj=this.state;
        delete this.state.requestsend;
        delete this.state.feedbackmessage;
       
        firebase.database().ref(`stripe_customers/${result.user.uid}/`).update(obj);
        
this.setState({feedbackmessage:'Account signup Successfully',requestsend:false});

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
        <KeyboardAvoidingView behavior="padding" >
        {/* <View style={{flex:1}}>
        <View style={{flex:1}}> */}
<Image source={require('./assets/newlogo.png')} style={{height:250}}/>
          {/* </View>
        <View style={{flex:1}}> */}
     


        <TextInput 
        maxLength={15}
label='Name'
style={{marginBottom:5,backgroundColor:'#fff',marginLeft:10,marginRight:10}}
value={this.state.username}
onChangeText={username => this.setState({ username })}
type='Outlined'
keyboardAppearance='dark'
keyboardType={'default'}


/>  
      <TextInput 
              maxLength={20}

        label='Email'
        style={{marginBottom:5,backgroundColor:'#fff',marginLeft:10,marginRight:10}}
        value={this.state.email}
        onChangeText={email => this.setState({ email })}
        type='Outlined'
        keyboardAppearance='dark'
        keyboardType={'email-address'}

        // error={(this.state.feedbackmessage=='The email address is badly formatted.')?true:false}
      />
       <TextInput
        maxLength={15}

               style={{marginBottom:5,backgroundColor:'#fff',marginLeft:10,marginRight:10}}
        label='Password'
        value={this.state.password}
        onChangeText={password => this.setState({ password })}
        type='Outlined'
        secureTextEntry={true} 
      />
      <TextInput
           maxLength={11}

        label='Contact'
        style={{marginBottom:5,backgroundColor:'#fff',marginLeft:10,marginRight:10}}
        keyboardType={'phone-pad'}
        value={this.state.contact}
        onChangeText={contact => this.setState({ contact })}
        type='Outlined'
        
      />

<TextInput
multiline={true}
row={2}

               style={{marginBottom:5,backgroundColor:'#fff',marginLeft:10,marginRight:10}}
        label='Address'
        value={this.state.address}
        onChangeText={address => this.setState({ address })}
        type='Outlined'
      />



<Button
 loading={this.state.requestsend}
style={{marginTop:10,backgroundColor:'#0ead00',marginLeft:10,marginRight:10}}
mode="contained" onPress={() =>this.signupAccount(this.state.username,this.state.email,this.state.password,this.state.contact,this.state.address)}>
Sign Up  </Button> 
<View style={{flexDirection:'row',marginTop:10,marginLeft:10}}>
<Text style={{textAlign:"center",fontSize:14,color:'#000',flex:1}}>
Already have an account ?   </Text>
 <TouchableOpacity
style={{flex:1}}
 onPress={() =>this.props.navigation.goBack()}>
 <Text style={{textAlign:"left",fontSize:14,color:'#0ead00',flex:1}}>
  Sign In
    </Text>
  </TouchableOpacity>  
</View>
       {/* </View>
  
      </View> */}
      </KeyboardAvoidingView>
      </ScrollView>):
      (<ActivityIndicator size="large" style={{flex:1,alignItems:'center',justifyContent:'center'}}  color="#000"/>)
    );
  }
}




