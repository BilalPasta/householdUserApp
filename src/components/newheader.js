import React, { Component } from 'react';

import {
    View,
    Text
} from 'react-native';



class HomeViewTitle extends Component {

    render() {

        return (

            <View style={{height: 64, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center', paddingTop: 20}}>
                <Text style={{color: '#FFFFFF', fontSize: 17, fontWeight: 'bold'}}>{this.props.title}</Text>
            </View>

        );

    }

}


export default HomeViewTitle;
