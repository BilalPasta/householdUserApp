// import React ,{Component} from 'react'
// import {connect} from 'react-redux';

// class OrderList extends React.Component{


//     render(){
// return(
//     <View>
//     <Header     opendrawer={()=>this.props.navigation.openDrawer()} title={'Order List'} opencart={()=>this.props.navigation.navigate('CartDisplay')}/>
// </View>
// )
//     }
// }








import {connect} from 'react-redux';

import * as React from 'react';
import { List, Checkbox ,Button,Dialog,Portal,Provider as PaperProvider,Paragraph} from 'react-native-paper';
import {View,Text,ActivityIndicator,InteractionManager,ScrollView,TouchableOpacity,StatusBar} from 'react-native'
import Header from './header';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

class OrderList extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
       title: 'Orders',
       headerLeft: (
    
        <TouchableOpacity style={{marginLeft:5}} onPress={() => navigation.openDrawer()}>
              <Icon name="navicon" size={30} color={'white'} />
          </TouchableOpacity>
        ),
       
    };
  }
  constructor(props){
    super(props);
    this.state = {
      expanded: false,
      ShowScreen: false,
      orderlist:null,
    }


    this._handlePress=this._handlePress.bind(this);
    this.GetOrders=this.GetOrders.bind(this);
    this.changedeliverstatus=this.changedeliverstatus.bind(this);
    this.confirmdelivery=this.confirmdelivery.bind(this);
    this.cancelDelivery=this.cancelDelivery.bind(this);
    // this._hideDialog=this._hideDialog.bind(this);

  }
 
  // _hideDialog(index){
  //   orderlist=this.state.orderlist;
  //   orderlist[index].deliverstatus=!orderlist[index].deliverstatus


  //   this.setState({orderlist:[...orderlist]})
  // }

  cancelDelivery(index){
    orderlist=this.state.orderlist;
    orderlist[index].confirmdeliverystatus=false;


    this.setState({orderlist:[...orderlist]})
  }

  confirmdelivery(index){
    orderlist=this.state.orderlist;
    orderlist[index].confirmdeliverystatus=true;


    this.setState({orderlist:[...orderlist]})
  }
  _handlePress = (index) =>
  {
    orderlist=this.state.orderlist;
    orderlist[index].expand=!orderlist[index].expand
    // alert(orderlist[index].expand=!orderlist[index].confirmdeliverystatus);


    this.setState({orderlist:[...orderlist]})
  }
    // this.setState({
    //   expanded: !this.state.expanded
    // });



    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
        
          this.setState({
            ShowScreen: true,
          });
        });
       }
    


       changedeliverstatus(id,status,index){
        firebase.database().ref('/').child(`orders/${id}/deliverstatus`).set(true);
        obj=this.state.orderlist;
        obj[index].deliverstatus=true;
        obj[index].confirmdeliverystatus=false;
        // console.log(state);

        this.setState({
         orderlist:obj
        })

       }

    GetOrders(){
      let orderslist=[];
        console.log(this.props.currentUser.uid);
firebase.database().ref('/').child(`orders`).on('child_added',(data)=>{
// alert();
// if(data.exists()){
//   data.forEach((orderdetails)=>{
//     let order=orderdetails.val();
//     order.id=orderdetails.key;
//     order.expand=false;
//     orderslist.push(order)
//   })
var obj=data.val();
obj.id=data.key
// if(obj.deliverstatus==false){
// obj.confirmdeliverystatus=obj.deliverstatus;}
// else{

//   obj.confirmdeliverystatus=false;
obj.confirmdeliverystatus=false;
// }
    orderslist.push(obj)

  this.setState({orderlist:orderslist});
  // console.log('orderslist');
  // console.log(orderslist);
  // var sessionsRef = firebase.database().ref("sessions");

  // sessionsRef.push({
  //   startedAt: firebase.database.ServerValue.TIMESTAMP
  // }).then((data)=>{
  //   console.log(data.val())
  // });

  // fb=firebase.database.ServerValue.TIMESTAMP;
  // console.log(fb);
// }
// else{
// this.setState({orderlist:'No Order'})

// }

// console.log(orders);
// data.exists()?console.log('exits'):console.log('not exist');
})

    }
    componentWillMount(){
        this.GetOrders()
    }
    

  render() {
    return (
    this.state.ShowScreen&&this.state.orderlist!=null?(
      <PaperProvider>
             <StatusBar
          barStyle="light-content"
          backgroundColor="#0ead00"
        />
      <ScrollView>
    <View>
        
            {/* <Header     opendrawer={()=>this.props.navigation.openDrawer()} title={'Order List'} opencart={()=>this.props.navigation.navigate('CartDisplay')}/> */}
      <List.Section title="Orders">
   {this.state.orderlist.map((data,index)=>{
return(
  <List.Accordion
      title={`${data.ridername}`}
      description={`${data.date}`}
      expanded={data.expand}
      onPress={()=>this._handlePress(index)}
    >
         <View style={{flexDirection:'row'}}>

     <List.Subheader style={{flex:2}}>{`ID  ${data.id}`}</List.Subheader>
     <View style={{flex:1}}>
     {(data.deliverstatus==true)?<Text style={{fontSize:15,color:'#db0000',textAlign:"center",alignItems:'center',fontWeight:'bold'}}>Delivered</Text>:
    <TouchableOpacity   style={{margin:5,backgroundColor:'#db0000',flex:1,borderRadius:10,paddingTop:5}}  onPress={( ) => {
      
      this.confirmdelivery(index);
      }}>
    <Text style={{fontSize:15,color:'#fff',textAlign:"center",alignItems:'center',fontWeight:'bold'}}>Deliver</Text>
    </TouchableOpacity> }
     
<Portal>
  <Dialog
    visible={data.confirmdeliverystatus}
    onDismiss={()=>this.cancelDelivery(index)}>
         <Dialog.Content>
              <Paragraph>Click ok to confirm order</Paragraph>
            </Dialog.Content>
    <Dialog.Actions>
      <Button onPress={() => this.cancelDelivery(index)}>Cancel</Button>
      <Button onPress={() => this.changedeliverstatus(data.id,data.deliverstatus,index)}>Ok</Button>
    </Dialog.Actions>
  </Dialog>
</Portal>



  </View>

     </View>
     <List.Subheader style={{flex:1}}>{data.address}</List.Subheader>

     <View style={{flexDirection:'row'}}>

     <List.Subheader style={{flex:1}}>Item name</List.Subheader>
     <List.Subheader  style={{flex:1}}>Price X Quantity</List.Subheader>
</View>
     
{data.order.map((orders)=>
  <View style={{flexDirection:'row'}}>

  <List.Item style={{flex:1}} title={`${orders.itemdetails.itemname}`} />
  <List.Item style={{flex:1}}  title={`${orders.itemdetails.itemprice} X ${orders.count}`} />
  </View>)}
     

      {/* <View style={{flexDirection:'row'}}>

<List.Item style={{flex:1}} title="Total " />
<List.Item style={{flex:1}}  titleEllipsizeMode={'head'} title="800" />
</View> */}

    </List.Accordion>
)
   })}
      
 
        {/* <List.Accordion
          title="Controlled Accordion"
          description="Item description"
          left={props => <List.Icon {...props} icon="folder" />}
          expanded={this.state.expanded}
          onPress={this._handlePress}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion> */}
      </List.Section>
      </View>
      </ScrollView>
      </PaperProvider>):(<ActivityIndicator size="large" style={{flex:1,alignItems:'center',justifyContent:'center'}}  color="#000"/>)
    );
  }
}

function mapstatetoprops(state){
    return{
Orderlist:state.Appdata,
currentUser:state.Appdata.CurrentUser,

    }
}

function mapdispatchtoprops(){
return{

}    
}

export default connect(mapstatetoprops,mapdispatchtoprops) (OrderList);