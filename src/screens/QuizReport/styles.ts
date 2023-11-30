import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Platform } from 'react-native';

export const Container = styled.SafeAreaView`
    flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    height: 35%;

    background-color: #B843F2; 

    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;

    align-items: center;
`;

export const HeaderTitle = styled.Text`
    color: #fff;

    font-size: 20px;
    margin-left: 15px;
`;

export const HeaderContainer = styled.View`
    width: 100%;
    height: 32px;
    flex-direction: row;

    align-items: center;

    padding-left: 20px;
    padding-right: 20px;

    margin-top: 20px;
`;

export const BackButtonContainer = styled.View`
    flex-direction: row;

    align-items: center;
`;

export const AnimationContainer = styled.View`
    width: ${RFValue(100)}px;
    height: ${RFValue(100)}px;

    background-color: white;

    border-top-right-radius: 20px;
    border-top-left-radius: 20px;

    margin-top: 20px;
`;


export const BackButton = styled.TouchableOpacity``;

export const Footer = styled.View`
    height: 67%;

    padding-left: 20px;
    padding-right: 20px;

`;

export const DashboardCardContainer = styled.View`
    width: 100%;   
    height: 170px;

    background-color: #fff;

    border-radius: 20px;

    padding-top: 20px;
    padding-bottom: 20px;
    margin-top: -${RFValue(80)}px;


    justify-content: space-between;


    ${Platform.OS === 'android'
    ? 'elevation: 5;'
    : `
      shadow-color: #000;
      shadow-offset: 0 2px;
      shadow-opacity: 0.3;
      shadow-radius: 2px;
    `}
`;

export const DotGenericQuiestionsInfo = styled.View`
    width: 12px;
    height: 12px;

    background-color: #B843F2;
    border-radius: 6px;

    margin-top: 6px;
`;

export const GenericContainer = styled.View`
    flex-direction: row;

    width: 125px;
`;

export const QuiestionsInfo = styled.View`
    width: 12px;
    height: 12px;

    background-color: #FA3939;
    border-radius: 6px;

    margin-top: 6px;
`;

export const GenericCountAndBalelContainer = styled.View`
    margin-left: 5px;
`;

export const LabelQuestionsInfo = styled.Text`
    color: #B843F2;
    font-size: 21px;
`;


export const LabelInfo = styled.Text`
    font-size: 16px;
`;

export const QuestionsInfoContainer = styled.View`
    height: ${RFValue(40)}px;
    width: 100%;

    flex-direction: row;
    justify-content: space-around;
`;


export const CorrectContainer = styled.View`
    flex-direction: row;
    width: 125px;
`;

export const DotCorrectQuiestionsInfo = styled.View`
    width: 12px;
    height: 12px;

    background-color: #1F8435;
    border-radius: 6px;

    margin-top: 6px;
`;

export const CountAndBalelContainer = styled.View`
    margin-left: 5px;
`;

export const CorrectQuestionsInfo = styled.Text`
    color: #1F8435;
    font-size: 20px;

`;

export const LabelCorrectInfo = styled.Text`
    font-size: 16px;
`;


export const IncorrectQuestionsInfo = styled.Text`
    color: #FA3939;
    font-size: 20px;
`;

export const WorngContainer = styled.View`
    flex-direction: row;

    width: 125px;
`;

export const DotWrongQuiestionsInfo = styled.View`
    width: 12px;
    height: 12px;

    background-color: #FA3939;
    border-radius: 6px;

    margin-top: 6px;
`;

export const WorngCountAndBalelContainer = styled.View`
    margin-left: 5px;
`;

export const WorngQuestionsInfo = styled.Text`
    color: #FA3939;
    font-size: 20px;

`;

export const LabelWrongInfo = styled.Text`
    font-size: 16px;
`;


export const WrongQuestionsInfo = styled.Text`
    color: #FA3939;
    font-size: 20px;
`;

// Componente de competência

export const CompetencyContainer = styled.ScrollView`
    width: 100%;

    margin-top: 10px;
    margin-bottom: 10px;
`;


export const Competency = styled.TouchableOpacity`
    height: ${RFValue(50)}px;
    width: 100%;

    border-width: 1px;

    border-color: #B843F2;

    border-radius: ${RFValue(15)}px;

    padding: ${RFValue(15)}px;

    justify-content: space-between;

    flex-direction: row;
    align-items: center;

    margin-top: 10px;
`;

export const CompetencyLabel = styled.Text`
    font-size: 20px;
`;