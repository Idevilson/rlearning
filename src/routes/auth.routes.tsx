import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Intro }  from '../screens/Intro';
import { Login } from '../screens/Login';
import { SignUp } from '../screens/SignUp';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes(){
    return(
        <Navigator 
            initialRouteName='Intro'
            screenOptions={{ headerShown: false }}
        >
        
            <Screen 
                name="Intro"
                component={Intro}
            />
            <Screen 
                name="Login"
                component={Login}
            />

            <Screen 
                name="SignUp"
                component={SignUp}
            />

        </Navigator>
    )
}