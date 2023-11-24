import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    runOnJS,
    withTiming,
    Easing,
} from 'react-native-reanimated';

import {
    Container,
    Header,
    Footer,
    HeaderContainer,
    BackButton,
    HeaderTitle,
    BackButtonContainer,
    ProgressIndicatorContainer,
    QuestionIncatorText,
    QuestionIncator,
    FlashCardContainer,
    FooterWarning,
    WarningText,
    NextCardbutton,
    NextCardButtonText,
    OpemModalPhotoButton,
    TextPhotoModal,
} from './styles';

import { useNavigation } from '@react-navigation/native';
import ArrowBack from '../../assets/arrow-back-white.svg'

import { ScrollView } from 'react-native';

import { cardsDB } from '../../hooks/cards';
import { Clock } from '../../components/Clock';
import { StackNavigationProp } from '@react-navigation/stack';

import { Image } from 'expo-image';
import { RFValue } from 'react-native-responsive-fontsize';
import Modal from 'react-native-modal/dist/modal';
import Toast from 'react-native-toast-message';


export function Learning() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timestamp, setTimestamp] = useState(0);
    const [isModalImageVisible, setModalImageVisible] = useState(false);

    const [isFlipped, setIsFlipped] = useState(false);
    const rotation = useSharedValue(0);
    
    const navigation = useNavigation<StackNavigationProp<any>>();

    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        if (scrollViewRef.current) {
          const indicatorWidth = 32;
          const scrollToX = currentIndex * indicatorWidth;
    
          scrollViewRef.current.scrollTo({ x: scrollToX, animated: true });
        }
    }, [currentIndex]);


    useEffect(() => {
        const obterTimestamp = () => {
          const novoTimestamp = new Date().getTime();
          setTimestamp(novoTimestamp);
        };
    
        obterTimestamp();
    
        return () => {};
    }, []);

    const handlePress = () => {
        rotation.value = withTiming(isFlipped ? 0 : 180, {
          duration: 300,
          easing: Easing.linear,
        }, (isFinished) => {
          if (isFinished) {
            runOnJS(setIsFlipped)(!isFlipped);
          }
        });
    };
    
    const frontCardStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 180], [0, Math.PI]);
        return {
            transform: [{ perspective: 1000 }, { rotateY: `${rotateY}rad` }],
        };
    });

    const backCardStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 180], [0, Math.PI]);
        return {
            transform: [
            { perspective: 1000 },
            { rotateY: `${rotateY + Math.PI}rad` },
            ],
        };
    });

    return(
        <Container>
            <Header>
                <HeaderContainer>
                    <BackButtonContainer>
                        <BackButton 
                                onPress={() => navigation.goBack()}
                        >
                            <ArrowBack 
                                width={25}
                                height={25}
                            />
                        </BackButton>

                        <HeaderTitle>
                            HOME
                        </HeaderTitle>
                    </BackButtonContainer>
                   

                    <Clock />
                </HeaderContainer>
            </Header>

            <Footer>
                <ProgressIndicatorContainer>
                    <ScrollView
                        horizontal
                        contentContainerStyle={{
                            alignItems: 'center',
                        }}
                        ref={scrollViewRef}
                    >
                        {cardsDB.map((item, index) => {

                            return (
                                <QuestionIncator
                                    key={index}
                                    isActive={index === currentIndex}
                                >
                                <QuestionIncatorText>
                                    {index + 1}
                                </QuestionIncatorText>
                                </QuestionIncator>
                            );
                        })}
                    </ScrollView>
                </ProgressIndicatorContainer>

                <FlashCardContainer>   
                    <TouchableOpacity style={styles.container} onPress={handlePress}>
                        <Animated.View style={[styles.card, frontCardStyle]}>
                            <Image 
                                style={{
                                    width: RFValue(180),
                                    height: RFValue(180),
                                    opacity: 0.6,
                                    position: 'absolute'
                                }}
                                source={require('../../assets/logoGrey.png')}
                            />
                            <Text style={styles.cardText}>{cardsDB[currentIndex].frente}</Text>  

                            <View>
                            { 
                                cardsDB[currentIndex].imagePath === null ? null : 
                                        <OpemModalPhotoButton
                                            onPress={() => setModalImageVisible(!isModalImageVisible)}
                                        >
                                            <TextPhotoModal>
                                                 ABRIR IMAGEM
                                            </TextPhotoModal>
                                        </OpemModalPhotoButton>
                            }  
                            </View>
                            
                        </Animated.View>


                        {
                                isFlipped === true ? 

                                <Animated.View style={[styles.card, styles.backCard, backCardStyle]}>
                                <Image 
                                    style={{
                                        width: RFValue(180),
                                        height: RFValue(180),
                                        opacity: 0.2,
                                        position: 'absolute'
                                    }}
                                    source={require('../../assets/logoPurple.png')}
                                />
                                <Text style={[styles.cardText, { color: '#000' }]}>{cardsDB[currentIndex].verso}</Text>
                                <Text style={{ bottom: '38%' }}>VERSO</Text>

                                <NextCardbutton
                                    onPress={() => {
                                        if(cardsDB.length === currentIndex + 1){
                                            Toast.show({
                                                type: 'success',
                                                text1: 'ATENÇÃO',
                                                text2: 'FINALIZADO! TOQUE NO BOTÃO HOME PARA VOLTAR'
                                            })
                                        } else if (isFlipped) {
                                        setCurrentIndex(currentIndex + 1);
                                            handlePress();
                                        }

                                    }}
                                >
                                    <NextCardButtonText>
                                        Próximo
                                    </NextCardButtonText>
                                </NextCardbutton>
                            </Animated.View>
                            : null
                        }

                        
                    </TouchableOpacity>
                </FlashCardContainer>

                <FooterWarning>
                    <WarningText>
                        TOQUE NO CARD
                    </WarningText>
                </FooterWarning>

                <Modal 
                    isVisible={isModalImageVisible}
                    style={{
                        alignItems: 'center'
                    }}
                >
                   
                        <View style={{ 
                            width: RFValue(250),
                            height: RFValue(300), 
                            borderRadius: 10,
                            backgroundColor: '#fff',
                            padding: 20,
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>

                    <Image 
                        style={{
                            width: RFValue(200),
                            height: RFValue(200)
                        }}
                        source={cardsDB[currentIndex].imagePath}
                    />


                        <TouchableOpacity 
                            onPress={() => setModalImageVisible(!isModalImageVisible)}
                            style={{
                                width: 200,
                                height: 45,
                                borderRadius: 10,
                                backgroundColor: '#B843F2',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    color: '#fff',
                                    fontWeight: 'bold'
                                }}
                            >
                                FECHAR
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal> 
            </Footer>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
        width: '100%',
        aspectRatio: 0.6,
        backgroundColor: '#B843F2',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backfaceVisibility: 'hidden',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 5, 
    },
    backCard: {
      backgroundColor: '#fff',
      position: 'absolute',
    },
    cardText: {
      color: 'white',
      fontSize: 22,
      fontWeight: '700',
      textAlign: 'center',
      position: 'absolute'
    },
});
  