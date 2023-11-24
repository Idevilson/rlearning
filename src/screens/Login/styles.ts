import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: white;
`;

export const Header = styled.View`
    width: 100%;
    height: 30%;


    justify-content: center;
    align-items: center;
`;

export const BackButtonContainer = styled.View`
    width: 100%;
    height: ${RFValue(40)}px;

    align-items: center;
    flex-direction: row;
`;

export const BackButton = styled.TouchableOpacity``;

export const BackButtonText = styled.Text`
    font-size: 25px;
    color: #000;

    margin-left: 10px;
`;



export const Footer = styled.View`
    width: 100%;
    height: 70%;
`;

export const FormContainer = styled.View`
  padding: 10px;

  align-items: center;

  margin-top: 30px;
`;

export const FormTitle = styled.Text`
    font-size: 25px;
`;

export const EmailInput = styled.TextInput`
    height: ${RFValue(56)}px;
    width: 100%;
    background-color: white;

    flex-direction: row;
    border-radius: 10px;

    margin-top: 10px;

    padding-left: 10px;

    font-size: 20px;

    border-width: 0.5px;
`;

export const PasswordInput = styled.TextInput`
    height: ${RFValue(56)}px;
    width: 100%;
    background-color: white;

    flex-direction: row;
    border-radius: 10px;

    margin-top: 10px;
    padding-left: 10px;
    font-size: 20px;

    border-width: 0.5px;
`;

export const SignInButton = styled.TouchableOpacity``;

export const SignInButtonText = styled.Text``;

export const LoginButton = styled.TouchableOpacity`
    height: ${RFValue(56)}px;
    width: 100%;
    background-color: white;

    flex-direction: row;
    border-radius: 10px;

    margin-top: 10px;

    align-items: center;
    justify-content: center;

    background-color: #B843F2;
`;


export const ButtonText = styled.Text`
    align-items: center;
    justify-content: center;

    font-size: ${RFValue(22)}px;
    color: white;
    font-weight: bold;
`;