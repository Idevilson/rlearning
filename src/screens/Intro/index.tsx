import React from 'react';

import { Image } from 'expo-image';
import SignInSVG  from '../../assets/signIn.svg'
import SignUpSVG from '../../assets/signUp.svg'

import {
    Container,
    Header,
    Footer,
    ButtonsContainer,
    Button,
    IconContainer,
    ButtonText,
    ButtonTextContainer
} from './styles';

import { useNavigation } from '@react-navigation/native';



export function Intro() {
    const { navigate } = useNavigation();




    return(
        <Container>
            <Header>
                    <Image 
                       style={{ height: 160, width: 250, marginTop: 60 }}
                       source={require('../../assets/rLogo.png')}
                       contentFit="cover"
                       transition={1000}
                    />
            </Header>

            <Footer>
                <ButtonsContainer>
                    <Button
                    onPress={() => navigate('Login')}
                    >
                        <IconContainer>
                            <SignInSVG height={40} width={40}/>
                        </IconContainer>
                        <ButtonTextContainer>
                            <ButtonText>
                                Fazer Login
                            </ButtonText>    
                        </ButtonTextContainer>
                    </Button>

                    <Button
                        onPress={() => navigate('SignUp')}
                    >
                        <IconContainer>
                            <SignUpSVG height={40} width={40}/>
                        </IconContainer>
                        <ButtonTextContainer>
                            <ButtonText>
                                Criar Conta
                            </ButtonText>    
                        </ButtonTextContainer>
                    </Button>
                </ButtonsContainer>
            </Footer>
        </Container>
    );
};