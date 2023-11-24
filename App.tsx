import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components'

import { Routes } from './src/routes'

import theme from './src/global/theme';

import "./src/services/firebase";

import { AuthProvider } from './src/hooks/auth';

export default function App() {

  return (
      <ThemeProvider theme={theme}>
         <StatusBar barStyle="light-content"/>
         
            <GestureHandlerRootView style={{ flex: 1 }}>
               <AuthProvider>
                   <Routes />
               </AuthProvider>
            </GestureHandlerRootView>
      </ThemeProvider>
  );
}
