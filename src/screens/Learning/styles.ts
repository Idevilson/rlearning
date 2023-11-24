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
    isCorrect?: boolean;
    isAnswerd?: boolean;
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

export const FlashCardContainer = styled.View`
    flex: 1;

    align-items: center;
    justify-content: center;

    padding: 20px;
`;

export const FooterWarning = styled.View`
    width: 100%;
    height: ${RFValue(40)}px;

    align-items: center;
    justify-content: center;
`;

export const WarningText = styled.Text`
    font-size: 25px;
    color: red;
`;

export const NextCardbutton = styled.TouchableOpacity`
    width: ${RFValue(150)}px;
    height: ${RFValue(40)}px;

    background-color: #B843F2;

    align-items: center;
    justify-content: center;

    border-radius: 10px;

    bottom: -38%;
`;

export const NextCardButtonText = styled.Text`
    font-size: ${RFValue(15)}px;

    color: #fff;
    font-weight: bold;
`;

export const OpemModalPhotoButton = styled.TouchableOpacity`
    width: ${RFValue(200)}px;
    height: ${RFValue(30)}px;

    background-color: #ffc300;

    align-items: center;
    justify-content: center;

    align-self: center; 
    
    border-radius: 10px;
    margin-top: ${RFValue(300)}px;

`;

export const TextPhotoModal = styled.Text`
    font-size: ${RFValue(20)}px;
    font-weight: bold;
`;