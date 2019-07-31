import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

class ShoppingCartIcon extends Component {
  render() {
    return (

      <View style={styles.cart_ButtonStyle}>

        <TouchableOpacity onPress={this.props.onPress}>
            <View style={styles.cartItemIndicator}>
              <Text> {this.props.cartItems.length} </Text>
            </View>
            <Icon
              name="shopping-cart"
              size={25} color={'white'}
            />
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  cart_ButtonStyle: {
    // paddingRight: 2,
    // paddingleft: 2,
    width:30,
    // backgroundColor:'#000',
    marginTop: 3,
  },
  cartItemIndicator: {
    position: 'absolute',
    height: 18,
    width: 18,
    backgroundColor: '#e6b800',
    borderRadius: 17,
    right: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});

function mapStateToProps (state) {
  return{
    cartItems: state.Appdata.selectedItems
  }
  }


  function mapdispatchtoprops(dispatch){
    return{

    }

  }
export default connect(mapStateToProps,mapdispatchtoprops)(ShoppingCartIcon);
