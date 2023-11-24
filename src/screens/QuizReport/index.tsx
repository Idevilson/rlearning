import React, { useState } from 'react';

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

export function QuizReport() {
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

                <LottieView
                    autoPlay
                    style={{
                        width:  210,
                        height: 210,
                        marginTop: -20
                    }}
                    source={require('./report.json')}
                />
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
            </Footer>
        </Container>
    );
};