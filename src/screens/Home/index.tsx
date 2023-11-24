import React, { useEffect, useState } from 'react';
import { Text } from "react-native";

import { Image } from 'expo-image';

import GameIcon from '../../assets/gameIcon.svg'
import LearningIcon from '../../assets/learningIcon.svg'

import {
    Container,
    Header,
    Footer,
    ButtonsContainer,
    Button,
    IconContainer,
    ButtonText,
    ButtonTextContainer,
    ButtonsConfigContainer,
    RankingButton,
} from './styles';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import Modal from 'react-native-modal/dist/modal';
import { TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export function Home() {
    const [isModalLogoutVisible, setModalLogoutVisible] = useState(false);

    const { user, signOut } = useAuth();

    useEffect(() => {
        console.log("renderizou", user)
    }, [user])

    const { navigate } = useNavigation();

    const navigation = useNavigation();
    
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => null, // Configura o botão de voltar para null
        });
    }, [navigation]);

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
                        onPress={() => navigate('Game')}
                    >
                        <IconContainer>
                            <GameIcon height={40} width={40}/>
                        </IconContainer>
                        <ButtonTextContainer>
                            <ButtonText>
                                JOGAR
                            </ButtonText>    
                        </ButtonTextContainer>
                    </Button>

                    <Button
                        onPress={() => navigate('Learning')}
                    >
                        <IconContainer>
                            <LearningIcon height={40} width={40}/>
                        </IconContainer>
                        <ButtonTextContainer>
                            <ButtonText>
                                ESTUDAR
                            </ButtonText>    
                        </ButtonTextContainer>
                    </Button>
                </ButtonsContainer>

                <ButtonsConfigContainer>
                    <RankingButton
                        onPress={()=> setModalLogoutVisible(!isModalLogoutVisible)}
                    >
                        <Image 
                            style={{ height: 40, width: 40 }}
                            source={require('../../assets/exit.png')}
                            contentFit="cover"
                            transition={1000}
                        />
                    </RankingButton>
                    
                    {/* <SettingsButton>
                        <Image 
                            style={{ height: 40, width: 40 }}
                            source={require('../../assets/setting.png')}
                            contentFit="cover"
                            transition={1000}
                        />
                    </SettingsButton> */}
                </ButtonsConfigContainer>

                <Modal 
                    isVisible={isModalLogoutVisible}
                    style={{
                        alignItems: 'center'
                    }}
                >
                   
                        <View style={{ 
                            width: RFValue(250),
                            height: RFValue(100), 
                            borderRadius: 10,
                            backgroundColor: '#fff',
                            padding: 20,
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>


                        <Text
                            style={{
                                fontSize: 20
                            }}
                        >
                            FAZER LOGOUT?
                        </Text>
                

                        <View
                            style={{
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: "space-between"
                            }}
                        >
                            <TouchableOpacity 
                                onPress={() => signOut()}
                                style={{
                                    width: 100,
                                    height: 45,
                                    borderRadius: 10,
                                    backgroundColor: 'red',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginLeft: 20
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    SIM
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={() => setModalLogoutVisible(!isModalLogoutVisible)}
                                style={{
                                    width: 100,
                                    height: 45,
                                    borderRadius: 10,
                                    backgroundColor: 'green',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 20
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    NÃO
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal> 
            </Footer>
        </Container>
    );
};