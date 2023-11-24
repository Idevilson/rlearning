import React, { useState } from 'react';

import { Image } from 'expo-image';


import {
    Container,
    Header,
    Footer,
    LoginButton,
    FormContainer,
    FormTitle,
    EmailInput,
    PasswordInput,
    ButtonText,
    BackButtonContainer,
    BackButton
} from './styles';

import ArrowBack from '../../assets/arrow-back.svg'
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';
import Toast from 'react-native-toast-message';


export function Login() {

    const navigation = useNavigation()


    const { signIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
  
    const handleLogin = async () => {
      if (!email || !password) {

        Toast.show({
            type: 'error',
            text1: 'ATENÇÃO',
            text2: 'Por favor, preencha todos os campos.⚠️'
        });
        return;
      }
  
      if (!isValidEmail(email)) {
        Toast.show({
            type: 'error',
            text1: 'ATENÇÃO',
            text2: 'Por favor, insira um e-mail válido.⚠️'
        });
        return;
      }
  
      const loginSuccess = await signIn(email, password);
  
      if (loginSuccess) {
        Toast.show({
            type: 'success',
            text1: 'ATENÇÃO',
            text2: 'LOGIN REALIZADO COM SUCESSO!'
        })
      }
    };
    


    return(
        <Container>
            <Header>
                    <BackButtonContainer>
                        <BackButton 
                            onPress={() => navigation.goBack()}
                        >
                            <ArrowBack 
                                width={40}
                                height={40}
                            />
                        </BackButton>
                    </BackButtonContainer>
                
                    <Image 
                       style={{ height: 160, width: 250, marginTop: 60 }}
                       source={require('../../assets/rLogo.png')}
                       contentFit="cover"
                       transition={1000}
                    />
            </Header>

            <Footer>
                <FormContainer>
                    <FormTitle>
                        FAÇA SEU LOGIN!
                    </FormTitle>
                    
                    <EmailInput
                        placeholder='E-MAIL'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <PasswordInput
                        placeholder='Senha'
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />

                    <LoginButton
                        onPress={() => handleLogin()}
                    >
                        <ButtonText>
                             LOGAR      
                        </ButtonText>
                    </LoginButton>
                </FormContainer>
            </Footer>
        </Container>
    );
};