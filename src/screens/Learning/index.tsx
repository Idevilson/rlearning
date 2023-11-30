import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, ActivityIndicator, Platform } from 'react-native';

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
    FooterContainer,
    FooterButton,
    FooterButtonText,
} from './styles';

import { useNavigation } from '@react-navigation/native';
import ArrowBack from '../../assets/arrow-back-white.svg'

import { ScrollView } from 'react-native';

import { CardDB, getRandomCards } from '../../hooks/cards';
import { Clock } from '../../components/Clock';
import { StackNavigationProp } from '@react-navigation/stack';

import { Image } from 'expo-image';
import { RFValue } from 'react-native-responsive-fontsize';
import Toast from 'react-native-toast-message';

import LottieView from 'lottie-react-native';

export function Learning() {
    const [isLoadingQuestions, setLoadingQuestions] = useState(true);
    const [cardsDB, setNewCards] = useState<CardDB>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timestamp, setTimestamp] = useState(0);
    const [isModalImageVisible, setModalImageVisible] = useState(false);

    const [isFlipped, setIsFlipped] = useState(false);
    const rotation = useSharedValue(0);
    
    const navigation = useNavigation<StackNavigationProp<any>>();

    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
          const newCards = getRandomCards();
          setNewCards(newCards);
          setLoadingQuestions(false);
        };
      
        fetchQuestions();
    }, []);


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

    const handlePressCorrectAnswer = () => {
        // Sortear um índice aleatório com base no tamanho atual de cardsDB
        const randomIndex = Math.floor(Math.random() * (cardsDB.length -1));
    
        // Atualizar o estado com o índice sorteado
        setNewCards((prevCards) => prevCards.slice(1));
        setCurrentIndex(randomIndex);
        handlePress();
    };

    const setCurrentIndexRandom = () => {
        const randomIndex = Math.floor(Math.random() * (cardsDB.length -1));
        setCurrentIndex(randomIndex);
    }

    console.log(cardsDB.length)

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

            {isLoadingQuestions ? (
                // Renderize um indicador de carregamento aqui
                <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Footer>
                        { cardsDB.length !== 0 ?   
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
                            : null
                        }

                    { cardsDB.length !== 0 ?   
                        <>
                            <FlashCardContainer>   
                                <TouchableOpacity style={styles.container} onPress={handlePress}>
                                    <Animated.View style={[styles.card, frontCardStyle]}>
                                        <View style={{
                                            width: '100%',
                                            height: RFValue(50),
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            paddingLeft: 5,
                                            paddingRight: 5
                                        }}>
                                            <Text style={{ fontWeight: '900', color: "#fff", fontSize: RFValue(15) }}>PERGUNTA</Text>

                                            <View style={{
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: RFValue(40),
                                                width: RFValue(40),
                                                backgroundColor: '#fff',
                                                borderRadius: RFValue(20)
                                            }}>
                                                
                                                <Image 
                                                    style={{
                                                        width: RFValue(30),
                                                        height: RFValue(30),
                                                        borderRadius: RFValue(25)
                                                    }}
                                                    source={require('../../assets/logoGrey.png')}
                                                />
                                            </View>
                                        </View>

                                        <View style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Text style={styles.cardText}>{cardsDB[currentIndex].frente}</Text>  

                                            {
                                                cardsDB[currentIndex].imagePath === null ? null :
                                                    isFlipped === false ? 
                                                        <Image 
                                                            transition={1000}
                                                            style={{
                                                                width: RFValue(200),
                                                                height: RFValue(200),
                                                                marginTop: 20
                                                            }}
                                                            source={cardsDB[currentIndex].imagePath}
                                                        />
                                                    : null
                                            
                                            }

                                        </View>
                                    </Animated.View>


                                    {
                                            isFlipped === true ? 

                                        <Animated.View style={[styles.card, styles.backCard, backCardStyle]}>
                                                <View style={{
                                                    width: '100%',
                                                    height: RFValue(50),
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    paddingLeft: 5,
                                                    paddingRight: 5
                                                }}>
                                                    <View style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        height: RFValue(40),
                                                        width: RFValue(40),
                                                        backgroundColor: '#fff',
                                                        borderRadius: RFValue(20)
                                                    }}>
                                                        
                                                        <Image 
                                                            style={{
                                                                width: RFValue(30),
                                                                height: RFValue(30),
                                                                borderRadius: RFValue(25)
                                                            }}
                                                            source={require('../../assets/logoGrey.png')}
                                                        />
                                                    </View>
                                                <Text style={{ fontWeight: '900', color: "#000", fontSize: RFValue(15) }}>RESPOSTA</Text>
                                            </View>

                                            <View style={{
                                                flex: 1,
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Text style={styles.cardTextBack}>{cardsDB[currentIndex].verso}</Text>  
                                            </View>

                                            
                                            <View style={{
                                                width: '100%',
                                                height: RFValue(50),
                                                flexDirection: 'row',
                                                paddingLeft: 5,
                                                paddingRight: 5,
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Image 
                                                    style={{
                                                        width: RFValue(15),
                                                        height: RFValue(15),
                                                        marginRight: 10
                                                    }}
                                                    source={require('../../assets/refresh-arrow.png')}
                                                />
                                                <Text
                                                    style={{
                                                        fontWeight: '600',
                                                        marginRight: 10
                                                    }}
                                                >
                                                    REVER PERGUNTA
                                                </Text>
                                            </View>
                                        </Animated.View>
                                        : null
                                    }                    
                                </TouchableOpacity>
                            </FlashCardContainer>

                            <FooterContainer>
                                <FooterButton
                                    onPress={() => {
                                        if(!isFlipped) {
                                            Toast.show({
                                                type: 'error',
                                                text1: 'ATENÇÃO',
                                                text2: 'O CARD PRECISA ESTAR VIRADO'
                                            })
                                        } else if (isFlipped) {
                                            handlePressCorrectAnswer()
                                        }
                                    }}
                                >
                                    <FooterButtonText>
                                        Acertei
                                    </FooterButtonText>
                                </FooterButton>

                                <FooterButton
                                    onPress={() => {
                                        if(cardsDB.length === currentIndex + 1){
                                            Toast.show({
                                                type: 'success',
                                                text1: 'ATENÇÃO',
                                                text2: 'FINALIZADO! TOQUE NO BOTÃO HOME PARA VOLTAR'
                                            })
                                        } else if (!isFlipped) {
                                            Toast.show({
                                                type: 'error',
                                                text1: 'ATENÇÃO',
                                                text2: 'O CARD PRECISA ESTAR VIRADO'
                                            })
                                        } else if (isFlipped) {
                                            setCurrentIndexRandom();
                                            handlePress();
                                        }
                                    }}
                                >
                                    <FooterButtonText>
                                        Parcial
                                    </FooterButtonText>
                                </FooterButton>

                                <FooterButton
                                    onPress={() => {
                                        if(cardsDB.length === currentIndex + 1){
                                            Toast.show({
                                                type: 'success',
                                                text1: 'ATENÇÃO',
                                                text2: 'FINALIZADO! TOQUE NO BOTÃO HOME PARA VOLTAR'
                                            })
                                        } else if (!isFlipped) {
                                            Toast.show({
                                                type: 'error',
                                                text1: 'ATENÇÃO',
                                                text2: 'O CARD PRECISA ESTAR VIRADO'
                                            })
                                        } else if (isFlipped) {
                                            setCurrentIndexRandom();
                                            handlePress();
                                        }
                                    }}
                                >
                                    <FooterButtonText>
                                        Errei
                                    </FooterButtonText>
                                </FooterButton>
                            </FooterContainer>
                        </>
                        : <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{ fontSize: 25, textAlign: 'center', fontWeight: 'bold' }}>{`PARABÉNS \nVOCÊ CHEGOU AO FINAL!`}</Text>

                            {
                                Platform.OS === "android" ? null : 
                                <LottieView
                                    autoPlay
                                    style={{
                                        width: RFValue(250),
                                        height: RFValue(250),
                                    }}
                                    source={require('./green.json')}
                                />
                            }
                           
                         </View>
                    }
                    </Footer> 
            )}
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
        backgroundColor: '#c77dff',
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
        justifyContent: 'space-between'
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
    },
    cardTextBack: {
        color: '#000',
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
      },
});
  