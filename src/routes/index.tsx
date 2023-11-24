import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

import { useAuth } from '../hooks/auth';
import Toast from 'react-native-toast-message';

export function Routes(){
    const { user } = useAuth();


    return(
        <NavigationContainer>
          {user === undefined ?  <AuthRoutes /> : <AppRoutes /> }
          <Toast 
                topOffset={70}
          />
        </NavigationContainer>
    );
}   