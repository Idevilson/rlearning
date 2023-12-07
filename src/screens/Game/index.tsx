import React, { useEffect, useRef, useState } from 'react';

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
    QuizContainer,
    QuestionText,
    QuizOption,
    QuizOptionText,
    QuizAlternative,
    QuizAlternativeContainer,
    FooterQuiz,
    FooterQuizButton,
    FooterButtonsContainer,
    SubmitQuizButton,
    SubmitQuizButtonTitle,
    AlternativesContainer,
    OpemModalPhotoButton,
    TextPhotoModal
} from './styles';

import { useNavigation } from '@react-navigation/native';
import ArrowBack from '../../assets/arrow-back-white.svg'

import BackArrow from '../../assets/backArrow.svg'
import NextArrow from '../../assets/nextArrow.svg'
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';

import Modal from "react-native-modal";
import LottieView from 'lottie-react-native';

interface feedbackModalProps {
    status: 'correct' | 'incorrect'
}
import { QuestionWithDevolutiva, getRandomQuestions } from '../../hooks/questions';
import Toast from 'react-native-toast-message';
import { Clock } from '../../components/Clock';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../hooks/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { app } from '../../services/firebase';
import { RFValue } from 'react-native-responsive-fontsize';

import Error from '../../assets/error.svg';

interface userAnswersProps {
    compNumber: number; 
    isCorrect: boolean;
    answered: boolean;
    chosenOption: number | null;
    description: string;
}


export function Game() {
    const [isLoadingQuestions, setLoadingQuestions] = useState(true);
    const [questionsDB, setQuestions] = useState<QuestionWithDevolutiva[]>([]);

    const [chosenOption, setChosenOption] = useState<number | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<userAnswersProps[]>([]);
    const [timestamp, setTimestamp] = useState(0);
    
    const [isModalVisible, setModalVisible] = useState(false);
    const [feedbackModalData, setFeedbackModalData] = useState<feedbackModalProps>({ status: 'correct'})

    const [isModalImageVisible, setModalImageVisible] = useState(false);
    const navigation = useNavigation<StackNavigationProp<any>>();

    const optionsLetters = ['A', 'B', 'C', 'D', 'E'];

    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
          const newQuestions = getRandomQuestions();
          setQuestions(newQuestions);
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

    const devolutivasPositivas = [
        "Isso, Você vai longe!",
        "Sim. Sabemos do seu potencial!",
        "Acredite, o melhor está por vir!",
        "Brilhou!",
        "Parabéns! Continue buscando superar-se..."
    ];

    
    const devolutivasNegativas = [
        "Boa tentativa!",
        "Continue, você vai conseguir!" ,
        "Essa foi dificil...",
        "Valeu seu esforço!",
        "Sacode a poeira. Você ainda vai longe!",
        "Quase lá...",
    ]

    const handleOptionPress = (index: number) => {
        const currentQuestion = userAnswers[currentIndex];

        if (currentQuestion?.answered) {
            Toast.show({
                type: 'error',
                text1: 'ATENÇÃO',
                text2: 'SÓ É POSSÍVEL RESPONDER CADA QUESTÃO UMA VEZ.⚠️'
            });
            return;
        }
      
        setChosenOption(index);
      
        const isAnswerCorrect = questionsDB[currentIndex].question.alternatives[index].isTrue;
      
        setUserAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[currentIndex] = {
              compNumber: currentIndex + 1,
              isCorrect: isAnswerCorrect,
              answered: true,
              chosenOption: index,
              description: questionsDB[currentIndex].description
            };
            return updatedAnswers;
        });

        if(isAnswerCorrect) {
            setFeedbackModalData({ status: 'correct' })
            setModalVisible(!isModalVisible);
        }

        if(!isAnswerCorrect) {
            setFeedbackModalData({ status: 'incorrect' })
            setModalVisible(!isModalVisible);
        }
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }
    
    const randomDevolutivasPositivas = devolutivasPositivas[Math.floor(Math.random() * devolutivasPositivas.length)];
    const randomDevolutivasNegativas = devolutivasNegativas[Math.floor(Math.random() * devolutivasNegativas.length)];

    useEffect(() => {
        const obterTimestamp = () => {
          const novoTimestamp = new Date().getTime();
          setTimestamp(novoTimestamp);
        };
    
        obterTimestamp();
    
        return () => {};
    }, []);

    const { user } = useAuth();

    const db = getFirestore(app);

    const calcularResultados = async () => {
        const todasQuestoesRespondidas = userAnswers.every(
            (resposta) => resposta?.answered === true
        );
    
        const tamanhoValido = userAnswers.length === questionsDB.length;

        if (!todasQuestoesRespondidas || !tamanhoValido) {
            Toast.show({
                type: 'error',
                text1: 'ATENÇÃO',
                text2: 'POR FAVOR, RESPONDA TODAS AS QUESTÕES ANTES DE FINALIZAR.⚠️'
            });
            return;
        }

        let questoesCorretas = 0;
        let questoesIncorretas = 0;
      
     
        userAnswers.forEach((resposta) => {
          if (resposta?.answered && resposta?.isCorrect) {
            
            questoesCorretas++;
          } else if (resposta?.answered && !resposta?.isCorrect) {
       
            questoesIncorretas++;
          }
         
        });
      
        const tempoDecorridoEmSegundos = timestamp ? Math.floor((new Date().getTime() - timestamp) / 1000) : 0;

        try {

            await setDoc(doc(db, "relatorios", String(user?.email)), {
                email: user?.email,
                questoesCorretas: questoesCorretas,
                questoesIncorretas: questoesIncorretas,
                timeInSecound: tempoDecorridoEmSegundos,
                userAnswers: userAnswers,
                uid: user?.uid
            });

            Toast.show({
                type: 'success',
                text1: 'ATENÇÃO',
                text2: 'OS DADOS FORAM ENVIADOS PARA O SERVIDOR'
            })

            console.log("ir para outra tela")

            setTimeout(() => {
                navigation.push('QuizReport', {
                    questoesCorretas,
                    questoesIncorretas,
                    tempoDecorridoEmSegundos,
                    quantQuestoes: questionsDB.length,
                    userAnswers: userAnswers
                });
            }, 3000)
            
        } catch(error) {
            console.log({ error })
        }    
    };

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
                        <ProgressIndicatorContainer>
                            <ScrollView
                                horizontal
                                contentContainerStyle={{
                                    alignItems: 'center',
                                }}
                                ref={scrollViewRef}
                            >
                                {questionsDB.map((item, index) => {
                                    const userAnswer = userAnswers[index];

                                    return (
                                        <QuestionIncator
                                            key={index}
                                            isActive={index === currentIndex}
                                            isCorrect={userAnswer?.isCorrect}
                                            isAnswerd={userAnswer?.answered}
                                        >
                                        <QuestionIncatorText>
                                            {index + 1}
                                        </QuestionIncatorText>
                                        </QuestionIncator>
                                    );
                                })}
                            </ScrollView>
                        </ProgressIndicatorContainer>

                        <QuizContainer>        
                            <QuestionText>
                                {  questionsDB[currentIndex].question.title }
                            </QuestionText>

                            { 
                                questionsDB[currentIndex].question.imagePath === null ? null : 
                                                <OpemModalPhotoButton
                                                    onPress={() => setModalImageVisible(!isModalImageVisible)}
                                                >
                                                    <TextPhotoModal>
                                                        ABRIR IMAGEM
                                                    </TextPhotoModal>
                                                </OpemModalPhotoButton>
                            }  
                            <AlternativesContainer>
                                {
                                    questionsDB[currentIndex].question.alternatives.map((item, index) => (
                                        <QuizAlternativeContainer
                                            key={index}
                                            onPress={() => handleOptionPress(index)}
                                        >
                                            <QuizOption 
                                                isActive={userAnswers[currentIndex]?.chosenOption === index} 
                                                isCorrect={!userAnswers[currentIndex]?.isCorrect === item.isTrue}
                                                isAnswered={userAnswers[currentIndex]?.answered}
                                            >
                                                <QuizOptionText>
                                                    {optionsLetters[index]} 
                                                </QuizOptionText>
                                            </QuizOption>

                                            

                                            <QuizAlternative
                                                isActive={chosenOption === index}
                                                ellipsizeMode='tail'
                                                numberOfLines={10}
                                            >
                                                {item.option}
                                            </QuizAlternative>
                                        </QuizAlternativeContainer>
                                    ))
                                }
                            </AlternativesContainer>

                            <FooterQuiz>
                                <FooterButtonsContainer>
                                    <FooterQuizButton
                                        onPress={ () => {
                                            if (currentIndex > 0) {
                                                setCurrentIndex(currentIndex - 1);
                                                setChosenOption(null); //
                                            }
                                        }}
                                    >
                                        <BackArrow 
                                            width={28}
                                            height={28}
                                            />
                                    </FooterQuizButton>

                                    <SubmitQuizButton
                                        onPress={() => calcularResultados()}
                                    >
                                        <SubmitQuizButtonTitle>
                                            FINALIZAR
                                        </SubmitQuizButtonTitle>
                                        
                                    </SubmitQuizButton>

                                    <FooterQuizButton
                                        onPress={ () => {
                                            if (currentIndex < questionsDB.length - 1) {
                                                setCurrentIndex(currentIndex + 1);
                                                setChosenOption(null); //
                                            }
                                        }}       
                                    >
                                        <NextArrow 
                                            width={28}
                                            height={28}
                                        />
                                    </FooterQuizButton>
                                </FooterButtonsContainer>
                            </FooterQuiz>
            
                        </QuizContainer>

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
                                source={questionsDB[currentIndex].question.imagePath}
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

                        <Modal 
                            isVisible={isModalVisible}
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
                                    justifyContent: 'center',
                                
                                    flexDirection: 'column'
                                }}>
                                {
                                    feedbackModalData.status === 'correct' ?  
                                        <Text style={{ fontSize: 23, textAlign: 'center' }}>{randomDevolutivasPositivas}</Text> : 
                                        <View
                                            style={{
                                                width: '100%',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Error 
                                                width={30}
                                                height={30}
                                            />

                                            <Text style={{ fontSize: 23, textAlign: 'center' }}>{randomDevolutivasNegativas}</Text>

                                            <Error 
                                                width={30}
                                                height={30}
                                            />
                                        </View>
                                }   

                                    <View
                                        style={{
                                            width: 150,
                                            height: 150,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: 25,
                                            marginTop: 25
                                        }}
                                    >
                                    
                                        <Image 
                                            source={require('../../assets/avatares/1.png')}
                                            style={{
                                                height: 150,
                                                width: 150,
                                            }}
                                            transition={1000}
                                        />
                                        
                                    </View>
                                    {
                                        feedbackModalData.status === 'correct' ?  null : 
                                            <Text style={{
                                                fontSize: 17,
                                                textAlign: 'center',
                                                marginBottom: 20
                                            }}>
                                                {questionsDB[currentIndex].devolutiva}
                                            </Text>
                                    }       


                                {
                                    feedbackModalData.status === 'correct' ? 
                                            <LottieView
                                                autoPlay
                                                style={{
                                                    width: 250,
                                                    height: 250,
                                                    position: 'absolute',
                                                }}
                                                source={require('./correct.json')}
                                            />
                                    :
                                        null
                                }

                                {
                                    currentIndex === questionsDB.length - 1 ? 
                                        <TouchableOpacity 
                                            onPress={() => {
                                                calcularResultados()
                                                setModalVisible(!isModalVisible)
                                            }}
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
                                            FINALIZAR QUIZ!
                                        </Text>
                                        </TouchableOpacity>
                                    :
                                        <TouchableOpacity 
                                            onPress={ () => {
                                                    if (currentIndex < questionsDB.length - 1) {
                                                        setCurrentIndex(currentIndex + 1);
                                                        setChosenOption(null); //
                                                    }
                                                    toggleModal()
                                            }} 
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
                                            PRÓXIMA PERGUNTA
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </Modal>  
                    </Footer>
            )}
        </Container>
    );
};