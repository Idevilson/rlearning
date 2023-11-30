import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { Learning } from '../screens/Learning';
import { Game } from '../screens/Game';
import { QuizReport } from '../screens/QuizReport';

interface userAnswersProps {
    compNumber: number; 
    isCorrect: boolean;
    answered: boolean;
    chosenOption: number | null;
    description: string;
}

export type AppStackParamList = {
    Home: undefined;
    Game: undefined;
    Learning: undefined;
    QuizReport: {
      questoesCorretas: number;
      questoesIncorretas: number;
      tempoDecorridoEmSegundos: number;
      quantQuestoes: number;
      userAnswers: userAnswersProps[];
    };
};
  
const { Navigator, Screen } = createStackNavigator<AppStackParamList>();

export function AppRoutes() {

    
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen name="Home" component={Home} />
            <Screen name="Learning" component={Learning} />
            <Screen name="Game" component={Game} />
            <Screen name="QuizReport" component={QuizReport} options={{ gestureEnabled: false }} />
        </Navigator>
    )
}