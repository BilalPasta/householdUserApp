

let distancearray=[];


const data=[{
  latitude: 24.882423,
  longitude: 67.052200
},{
  latitude: 24.881966,
  longitude: 67.051400
}]




import {connect} from 'react-redux';
import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  InteractionManager,
  PermissionsAndroid,
  Dimensions
} from "react-native";
import MapView, {
  Marker,
  
  PROVIDER_GOOGLE
} from "react-native-maps";
import firebase from 'react-native-firebase'
import {Snackbar} from  'react-native-paper'
import haversine from "haversine";
import ShoppingCartIcon from './ShoppingCartIcon';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;

class AnimatedMarkers extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
       title: 'MAP',
       headerRight: (
     
    <ShoppingCartIcon onPress={()=>navigation.navigate('CartDisplay')}/>
        )
    };
  }
   
  constructor(props) {
 super(props);
  
 if(!this.props.currentUser.location){

 }
    else{firebase.database().ref('/').child(`stripe_customers/${this.props.currentUser.uid}/location`).on('value',(defaultposition)=>{
this.setState({coordinate:{
  latitude:defaultposition.val()._latitude,
  longitude:defaultposition.val()._longitude
}})

console.log('latitute  ' +defaultposition.val()._latitude);
console.log('latitute  ' +defaultposition.val()._longitude);

console.log(this.state.coordinate);

    });
  }

    this.state = {
     
      coordinate:{
        latitude: 24.927816,
                longitude: 67.108940,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
            nearestRegion:{
        latitude:'',
        longitude:''
      },
      riderinfo:'',
      visible:false,
      showScreen:false
    };



    this.measuredifference=this.measuredifference.bind(this);


  }


   measuredifference=(yourposition,ridersdata)=>{
    ridersdata.map((riderdata)=>{
      if(!riderdata.location){

      }
     else{
  
latitude=riderdata.location._latitude;
longitude=riderdata.location._longitude;
let distance=haversine(yourposition,{latitude:latitude,longitude:longitude});
console.log(distance);
distancearray.push(distance);
     }
    });


let index=distancearray.indexOf(Math.min(...distancearray));
// console.log(distancearray);
// console.log(index);
// alert()
latitude = this.props.riders[index].location._latitude;                      //updating value
longitude=this.props.riders[index].location._longitude;  
riderinfo= this.props.riders[index];  

                        // firebase.database().ref('/').child(`stripe_customers/${this.props.currentUser.uid}/position`).set(yourposition);

let nearestRegion = Object.assign({}, this.state.nearestRegion);    //creating copy of object
nearestRegion.latitude = latitude;
nearestRegion.longitude=longitude                        //updating value
this.setState({nearestRegion:nearestRegion,riderinfo:{...riderinfo},visible:true});

  }

  










  

  componentDidMount() {


    InteractionManager.runAfterInteractions(() => {
    
      this.setState({
        showScreen: true,
      });
      this.requestCameraPermission();

    });
    
    
    navigator.geolocation.getCurrentPosition (
      (position) => {
        // const yourGeoPoint= new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude)
        
// alert('current');
      //   firebase.database().ref(`/stripe_customers/${this.props.currentUser.uid}/location`).set(yourGeoPoint);
        this.setState({
        coordinate:{
                   latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
      }) 
    
      this.measuredifference(this.state.coordinate,this.props.riders)

    },
      (error)    => { console.log(error) },
      {
        //  enableHighAccuracy: true, timeout: 20000, maximumAge: 1000

        // enableHighAccuracy: true,
        // timeout:            20000,
        // maximumAge:         1000,
        enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 
        // enableHighAccuracy: true, timeout: 25000, maximumAge: 3600000 
      }
    )
    this.watchID = navigator.geolocation.watchPosition(
      position => {

       

       
   

      
      }
      ,
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
    // this.setState({snackbar:false});
  }


  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Access Permission",
          buttonNeutral: "Ask Me Later",
          
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  render() {
 
    return (
this.state.showScreen?
      (<View style={styles.container}>
        <MapView
          style={styles.map}
          
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={{
            latitude: 24.9279,
            longitude: 67.1088,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          			zoomEnabled
			scrollEnabled
        >
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
          />


           {this.state.nearestRegion.longitude!=''&&this.state.latitude!=''?(     <Marker.Animated
             ref={marker => {
              this.marker = marker;
            }}
title="Bilal Usman"     pinColor="blue"                 coordinate={this.state.nearestRegion}
                    >
        
           
           </Marker.Animated         > ):(null)}
    
        </MapView>
    

     {this.state.riderinfo!=''&&this.state.nearestRegion.longitude!=''&&this.state.latitude!=''?(

<Snackbar
duration= {1000000}
style={{marginBottom:10}}
    visible={this.state.visible}
    onDismiss={() => this.setState({ visible: false })}
    action={{
      label: 'Ok',
      onPress: () => {
        this.props.navigation.navigate('GetCardDetails',{riderinfo:this.state.riderinfo})
      },
    }}
  >
    {this.state.riderinfo.name} is near by me click ok to confirm order
  </Snackbar>


  ):(null)}
                    </View>):(<ActivityIndicator size="large" style={{flex:1,alignItems:'center',justifyContent:'center'}}  color="#000"/>)
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
});


function mapstatetoprops(state){
  return{
currentUser:state.Appdata.CurrentUser,
riders:state.Appdata.riders
}
}

function mapdispatchtoprops(){
  return{}
}

export  default connect(mapstatetoprops,mapdispatchtoprops)(AnimatedMarkers)