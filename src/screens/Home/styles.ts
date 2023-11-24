import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
    background-color: white;
`;

export const Header = styled.View`
    width: 100%;
    height: 40%;

    /* background-color: ${({ theme }) => theme.colors.primary}; */

    justify-content: center;
    align-items: center;
`;



export const Footer = styled.View`
    width: 100%;
    height: 60%;

    align-items: center;
`;

export const ButtonsContainer = styled.View`
    padding: 12px;

    background-color: #B843F2;
    justify-content: space-between;
    margin: 20px;

    border-radius: 10px;
`;

export const Button = styled.TouchableOpacity`
    height: ${RFValue(76)}px;
    width: 100%;
    background-color: white;

    flex-direction: row;
    border-radius: 10px;

    margin-top: 10px;
`;
export const IconContainer = styled.View`
    height: 100%;
    width: 20%;

    align-items: center;
    justify-content: center;
`;

export const ButtonTextContainer = styled.View`
    width: 80%;
    height: 100%;

    align-items: center;
    justify-content: center;

    border-left-width: 0.2px;
`;

export const ButtonText = styled.Text`
    align-items: center;
    justify-content: center;

    font-size: ${RFValue(22)}px;
`;

export const ButtonsConfigContainer = styled.View`
    width: 70%;
    height: 100px;

    flex-direction: row;

    align-items: center;
    /* justify-content: space-between; */
    justify-content: center;

    padding-left: 50px;
    padding-right: 50px;
`;


export const RankingButton = styled.TouchableOpacity`
    height: 60px;
    width: 60px;

    border-width: 1px;

    border-radius: 10px;

    align-items: center;
    justify-content: center;
`;

export const SettingsButton = styled.TouchableOpacity`
    height: 60px;
    width: 60px;

    border-width: 1px;

    border-radius: 10px;

    align-items: center;
    justify-content: center;
`;
