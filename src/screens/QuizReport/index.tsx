import React, { useState } from 'react';
import { Platform, View, TouchableOpacity, Text } from "react-native";

import {
    Container,
    Header,
    Footer,
    HeaderContainer,
    BackButton,
    HeaderTitle,
    BackButtonContainer,
    DashboardCardContainer,
    QuestionsInfoContainer,
    CorrectQuestionsInfo,
    DotCorrectQuiestionsInfo,
    LabelCorrectInfo,
    CountAndBalelContainer,
    CorrectContainer,
    WorngContainer,
    DotWrongQuiestionsInfo,
    WorngCountAndBalelContainer,
    WorngQuestionsInfo,
    LabelWrongInfo,
    GenericContainer,
    DotGenericQuiestionsInfo,
    GenericCountAndBalelContainer,
    LabelInfo,
    LabelQuestionsInfo,
    CompetencyContainer,
    CompetencyLabel,
    Competency,
} from './styles';


import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import ArrowBack from '../../assets/arrow-back-white.svg'

import LottieView from 'lottie-react-native';
import Check from '../../assets/check.svg';
import Error from '../../assets/error.svg';
import { AppStackParamList } from '../../routes/app.routes';

import { Image } from 'expo-image';
import Modal from 'react-native-modal/dist/modal';
import { RFValue } from 'react-native-responsive-fontsize';
export function QuizReport() {
    const [isModalDescriptonVisible, setModalDescriptionVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const navigation = useNavigation();

    const route = useRoute<RouteProp<AppStackParamList, 'QuizReport'>>();
    
    const { 
        questoesCorretas, 
        questoesIncorretas, 
        tempoDecorridoEmSegundos, 
        quantQuestoes, 
        userAnswers 
    } = route.params;

    const formatarTempo = (tempoEmSegundos: number): string => {
        const minutos = Math.floor(tempoEmSegundos / 60);
        const segundos = tempoEmSegundos % 60;
      
        const minutosFormatados = minutos > 0 ? `${minutos}min` : '';
        const segundosFormatados = segundos > 0 ? `${segundos}s` : '';
      
        return minutosFormatados + (minutosFormatados && segundosFormatados ? ' e ' : '') + segundosFormatados;
    };
 
    return(
        <Container>
            <Header>
                <HeaderContainer>
                    <BackButtonContainer>
                        <BackButton 
                                onPress={() => navigation.navigate('Home')}
                        >
                            <ArrowBack 
                                width={35}
                                height={35}
                            />
                        </BackButton>

                        <HeaderTitle>
                            HOME
                        </HeaderTitle>
                    </BackButtonContainer>
                </HeaderContainer>

                {Platform.OS === 'ios' ? (
                    <LottieView
                    autoPlay
                    style={{
                        width: 210,
                        height: 210,
                        marginTop: -20,
                    }}
                    source={require('./report.json')}
                    />
                ) : (
                    <Image
                    source={require('./dash.png')}
                    style={{
                        width: 170,
                        height: 170,
                        marginTop: -20,
                    }}
                    />
                )}
            </Header>

            <Footer>
                <DashboardCardContainer>
                    <QuestionsInfoContainer>
                        <GenericContainer>
                            <DotGenericQuiestionsInfo />

                            <GenericCountAndBalelContainer>
                                <LabelQuestionsInfo>
                                    {formatarTempo(tempoDecorridoEmSegundos)}
                                </LabelQuestionsInfo>

                                <LabelCorrectInfo>
                                    TEMPO GASTO
                                </LabelCorrectInfo>
                            </GenericCountAndBalelContainer>
                        </GenericContainer>

                        <GenericContainer>
                            <DotGenericQuiestionsInfo />

                            <GenericCountAndBalelContainer>
                                <LabelQuestionsInfo>
                                    {quantQuestoes}
                                </LabelQuestionsInfo>

                                <LabelInfo>
                                    TOTAL DE QUESTÕES
                                </LabelInfo>
                            </GenericCountAndBalelContainer>
                        </GenericContainer>
                    </QuestionsInfoContainer>

                    <QuestionsInfoContainer>
                        <CorrectContainer>
                            <DotCorrectQuiestionsInfo />

                            <CountAndBalelContainer>
                                <CorrectQuestionsInfo>
                                    {questoesCorretas}
                                </CorrectQuestionsInfo>

                                <LabelCorrectInfo>
                                    Corretas
                                </LabelCorrectInfo>
                            </CountAndBalelContainer>
                        </CorrectContainer>

                        <WorngContainer>
                            <DotWrongQuiestionsInfo />

                            <WorngCountAndBalelContainer>
                                <WorngQuestionsInfo>
                                    {questoesIncorretas}
                                </WorngQuestionsInfo>

                                <LabelWrongInfo>
                                    Incorretas
                                </LabelWrongInfo>
                            </WorngCountAndBalelContainer>
                        </WorngContainer>
                    </QuestionsInfoContainer> 
                </DashboardCardContainer>

                <CompetencyContainer> 

                    {
                        userAnswers.map((item, index) => (
                            <Competency
                                key={index}
                                onPress={() => {
                                    setCurrentIndex(index)
                                    setModalDescriptionVisible(!isModalDescriptonVisible)
                                }}
                            >
                                <CompetencyLabel>
                                    COMPETÊNCIA {index + 1}
                                </CompetencyLabel>

                                {
                                    item.isCorrect === true ? 
                                        <Check 
                                            width={30}
                                            height={30}
                                        />
                                    :   
                                        <Error 
                                            width={30}
                                            height={30}
                                        />
                                }
                                
                            </Competency>
                        ))
                    }  
                    
                </CompetencyContainer> 

                        <Modal 
                            isVisible={isModalDescriptonVisible}
                            style={{
                                alignItems: 'center'
                            }}
                        >
                        
                                <View style={{ 
                                    width: RFValue(250),
                                    borderRadius: 10,
                                    backgroundColor: '#fff',
                                    padding: 20,
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>

                                <View
                                    style={{
                                        width: '100%',
                                        height: 60,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text 
                                        style={{
                                            fontWeight: `bold`,
                                            fontSize: 18,
                                            textAlign: 'center'
                                        }}
                                    >
                                        OBJETIVO DA COMPETÊNCIA {currentIndex + 1}
                                    </Text>
                                </View>    

                                <Text
                                    style={{
                                        textAlign: 'justify',
                                        fontSize: 20
                                    }}
                                >
                                    {userAnswers[currentIndex].description}
                                </Text>



                                <TouchableOpacity 
                                    onPress={() => setModalDescriptionVisible(!isModalDescriptonVisible)}
                                    style={{
                                        width: 200,
                                        height: 45,
                                        borderRadius: 10,
                                        backgroundColor: '#B843F2',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: 10
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