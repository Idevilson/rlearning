import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.SafeAreaView`
    flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    height: 15%;

    background-color: #B843F2; 

    justify-content: center;
`;

export const HeaderTitle = styled.Text`
    color: #fff;

    margin-left: 15px;
`;

export const HeaderContainer = styled.View`
    height: 32px;
    flex-direction: row;

    align-items: center;

    justify-content: space-between;

    padding-left: 20px;
    padding-right: 20px;

    margin-top: -20px;
`;

export const BackButtonContainer = styled.View`
    flex-direction: row;

    align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const Footer = styled.View`
    width: 100%;
    height: 90%;

    margin-top: -25px;

    border-top-right-radius: 30px;
    border-top-left-radius: 30px;

    background-color: #fff;

    padding-left: 20px;
    padding-right: 20px;
`;

export const ProgressIndicatorContainer = styled.View`
    width: 100%;
    height: ${RFValue(48)}px;

    margin-top: 15px;
`;


interface questionIncatorProps {
    isActive: boolean;
    isCorrect: boolean;
    isAnswerd: boolean;
}

export const QuestionIncator = styled.View<questionIncatorProps>`
    width: 32px;
    height: 32px;

    background-color: ${(props) => 
        props.isActive ? '#B843F2' : 
            props.isAnswerd === false || props.isAnswerd === undefined ? '#D4D4D4':  
                props.isCorrect ? 'green' : 'red'} ;

    align-items: center;
    justify-content: center;
    
    border-radius: 16px;

    margin-left: 10px;
`;

export const QuestionIncatorText = styled.Text`
    font-size: 16px;
    color: #fff;
`;

export const QuizContainer = styled.View`
    flex: 1;
`;

export const QuestionText = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;

interface quizOptionProps {
    isActive: boolean;
}

export const QuizOption = styled.View<quizOptionProps>`
    width: ${RFValue(40)}px;
    height: ${RFValue(40)}px;;

    background-color: ${(props) => props.isActive ? '#B843F2' : '#D4D4D4' } ;

    align-items: center;
    justify-content: center;
    
    border-radius: ${RFValue(20)}px;
`;

export const QuizAlternativeContainer = styled.TouchableOpacity`
    width: 100%;

    flex-direction: row;

    margin-top: 20px;

    align-items: center;
`;

export const AlternativesContainer = styled.ScrollView`

`;

export const QuizOptionText = styled.Text`
    font-size: ${RFValue(18)}px;;
    color: #fff;
`;

export const QuizAlternative = styled.Text<quizOptionProps>`
    font-size: 16px;

    color: ${(props) => props.isActive ? '#B843F2' : '#333333' };
    margin-left: 10px;

    flex-wrap: wrap;
    width: 80%;
`;

export const FooterQuiz = styled.View`
    height: ${RFValue(65)}px;

    justify-content: flex-end;
`;

export const FooterButtonsContainer = styled.View`
    width: 100%;

    flex-direction: row;
    justify-content: space-between;

    margin-bottom: 10px;
`;

export const FooterQuizButton = styled.TouchableOpacity`
    width: ${RFValue(50)}px;
    height: ${RFValue(50)}px;

    border-radius: ${RFValue(25)}px;

    background-color: #B843F2;

    align-items: center;
    justify-content: center;
`;

export const SubmitQuizButton = styled.TouchableOpacity`
    height: ${RFValue(50)}px;
    width: ${RFValue(115)}px;

    border-width: 1px;

    border-color: #B843F2;

    align-items: center;
    justify-content: center;
    border-radius: 10px;
`;

export const SubmitQuizButtonTitle = styled.Text`
    color: #B843F2;
`;

export const OpemModalPhotoButton = styled.TouchableOpacity`
    width: ${RFValue(200)}px;
    height: ${RFValue(30)}px;

    background-color: #ffc300;

    align-items: center;
    justify-content: center;

    align-self: center; 
    
    border-radius: 10px;
    margin-top: 10px;
`;

export const TextPhotoModal = styled.Text`
    font-size: ${RFValue(20)}px;
    font-weight: bold;
`;