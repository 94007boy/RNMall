import React from 'react'
import { StackNavigator } from 'react-navigation';
import MallIndex from '../containers/MallIndexContainer.js';


const Nav = StackNavigator(
    {
        Index: { screen: MallIndex },
    }
);

export default Nav;
