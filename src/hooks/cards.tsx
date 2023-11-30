import { comp1 } from "../../db/cards/comp1";
import { comp2 } from "../../db/cards/comp2";
import { comp3 } from "../../db/cards/comp3";
import { comp4 } from "../../db/cards/comp4";
import { comp5 } from "../../db/cards/comp5";
import { comp6 } from "../../db/cards/comp6";
import { comp7 } from "../../db/cards/comp7";
import { comp8 } from "../../db/cards/comp8";
import { comp9 } from "../../db/cards/comp9";
import { comp10 } from "../../db/cards/comp10";
import { comp11 } from "../../db/cards/comp11";
import { comp12 } from "../../db/cards/comp12";
import { comp13 } from "../../db/cards/comp13";
import { comp14 } from "../../db/cards/comp14";
import { comp15 } from "../../db/cards/comp15";
import { comp16 } from "../../db/cards/comp16";
import { comp17 } from "../../db/cards/comp17";

interface Card {
  frente: string;
  imagePath: null | any; 
  verso: string;
}

interface CardCompetence {
  lioto: Card[];
}

export type CardDB = Card[];

const cardCompetences: CardCompetence[] = [
  comp1,
  comp2,
  comp3,
  comp4,
  comp5,
  comp6,
  comp7,
  comp8,
  comp9,
  comp10,
  comp11,
  comp12,
  comp13,
  comp14,
  comp15,
  comp16,
  comp17
];

const getRandomIndex = (maxIndex: number) => Math.floor(Math.random() * maxIndex);


export const getRandomCards: () => CardDB = () => {
    const numCards = cardCompetences.length;
    const randomCards: CardDB = [];

    for (let i = 0; i < numCards; i++) {
        const randomCompetenceIndex = getRandomIndex(cardCompetences.length);
        const selectedCompetence = cardCompetences[randomCompetenceIndex];
        const randomQuestionIndex = getRandomIndex(selectedCompetence.lioto.length);
        const selectedCard = selectedCompetence.lioto[randomQuestionIndex];

        randomCards.push(selectedCard)
    }
  
    return randomCards;
};