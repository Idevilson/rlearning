import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.SafeAreaView`
    flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    height: 15%;

    background-color: #c77dff; 

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
    height: 87%;

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

export const FooterContainer = styled.View`
    width: 100%;
    height: ${RFValue(40)}px;

    flex-direction: row;

    align-items: center;
    justify-content: center;

    justify-content: space-between;
`;

export const FooterButton = styled.TouchableOpacity`
    width: ${RFValue(85)}px;
    height: ${RFValue(35)}px;

    border-color: #B843F2;
    border-width: 2px;

    border-radius: 20px;

    align-items: center;
    justify-content: center;
`;

export const FooterButtonText = styled.Text`
    font-size: 20px;
    color: #B843F2;
`;