import React,{Component} from 'react';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import {View,StatusBar} from 'react-native'
import { TextInput,Button,Switch ,Provider as PaperProvider} from 'react-native-paper';
import Stripe from 'react-native-stripe-api';
import Toast from 'react-native-root-toast';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux';

const apiKey = 'pk_test_kp1eyoLWmXz3xWOs6Zl4WnNH';
const client = new Stripe(apiKey);
 class CreditCard extends React.Component{
    static navigationOptions = ({ navigation }) => {
        return {
           title: 'CREDIT CARD DETAILS',
           headerRight: (null)
        };
      }
constructor(props){
    super(props);
this.state={
    number:'',
    expiry:'',
    name:'',
    cvc:'',
    address_zip:'',
    requestsend:false,
    cardvalidation:false
}

this._onChange=this._onChange.bind(this);
}



getdata(){
    console.log(this.state)
}


async  gettoken (number,expiry,cvc,address_zip,RiderInfo){
    console.log('riderinfo');
    console.log(RiderInfo);
    if(number!=''&&expiry!=''&&cvc!=''&&address_zip!=''){
        let array=expiry.split('/');

      this.setState({requestsend:true})
    
        const token=    await client.createToken({
                number: number ,
                exp_month: array[0], 
                exp_year: array[1], 
                cvc: cvc,
                address_zip: address_zip
             });
             
    if(!token.error){
      firebase.database().ref(`/stripe_customers/${this.props.currentUser.uid}/sources`).push({token: token.id}).then(()=>{
     this.setState({requestsend:false})
      //   Toast.show('Payment source has been transfered sucessfully ', {
      //     duration: 400,
      //     position: Toast.positions.BOTTOM,
      //     shadow: true,
      //     animation: true,
      //     hideOnPress: true,
      //     delay: 100,




      //     onShow: () => {
      //         // calls on toast\`s appear animation start
        
      //     },
      //     onShown: () => {
      //         // calls on toast\`s appear animation end.
        
      //     },
      //     onHide: () => {
      //         // calls on toast\`s hide animation start.
      //     },
      //     onHidden: () => {
      //         // calls on toast\`s hide animation end.
        
        
      //     }
      //   })
      
      })

      var today = new Date();
      var dd = today.getDate();
      
      var mm = today.getMonth()+1; 
      var yyyy = today.getFullYear();
let id=Math.ceil(Math.random()*100000000)
firebase.database().ref(`orders`).push({order:this.props.cartitem,customername:this.props.currentUser.name,date:`${dd}-${mm}-${yyyy}`,ridername:RiderInfo.name,customerId:this.props.currentUser.uid,riderId:RiderInfo.uid,deliverstatus:false})

    // firebase.database().ref(`/stripe_customers/${this.props.currentUser.uid}/giveorders`).push({order:this.props.cartitem,ridername:RiderInfo.name,date:`${dd}-${mm}-${yyyy}`,orderId:id})


     }
    else{
      this.setState({requestsend:false});
      Toast.show(token.error.message, {
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
      // console.log(token.error.message)
    }}
    else{
      Toast.show('All fields are required', {
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
     
_onChange = form =>
{ console.log(form);
this.setState({cardvalidation:form.valid,
    number:form.values.number,
    expiry:form.values.expiry,name:form.values.name,cvc:form.values.cvc,
    address_zip:form.values.postalCode,

})
// this.getdata();

}
    render(){
        const { params } = this.props.navigation.state;
        const RiderInfo = params ? params.riderinfo : null;   


        return(
            <View style={{marginTop:50,backgroundColor:'#fff'}}>
                    <StatusBar
          barStyle="light-content"
          backgroundColor="#0ead00"
        />
<CreditCardInput onChange={this._onChange} requiresName  requiresPostalCode 

allowScroll={true} />
<Button 
  style={{marginTop:30,backgroundColor:'#0ead00',marginLeft:10,marginRight:10}}           mode="contained"
loading={this.state.requestsend}
           onPress={()=>{
               console.log(this.props.cartitem)
               this.gettoken(this.state.number,this.state.expiry,this.state.cvc,this.state.address_zip,RiderInfo)}}>
           done
             </Button>
</View>

        )
    }
}


function mapstatetoprops(state){
    return{
  currentUser:state.Appdata.CurrentUser,
  cartitem:state.Appdata.selectedItems
    }
  }
  
  function mapdispatchtoprops(){
    return{
  
    }
  }
  
  export default connect(mapstatetoprops,mapdispatchtoprops)(CreditCard)
  
  