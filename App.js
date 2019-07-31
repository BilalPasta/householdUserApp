import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src/components/store/index';
import {AppDrawer} from './src/components/Navigation';
import Map from './src/components/Map1';
export default class App extends React.Component {

  render() {
    console.disableYellowBox = true
    return (
      <Provider store={store}>
      
 <AppDrawer/> 
 {/* <Map/> */}
        </Provider>
    );
  }
}
