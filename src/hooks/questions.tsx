import { comp1 } from "../../db/questions/comp1";
import { comp2 } from "../../db/questions/comp2";
import { comp3 } from "../../db/questions/comp3";
import { comp4 } from "../../db/questions/comp4";
import { comp5 } from "../../db/questions/comp5";
import { comp6 } from "../../db/questions/comp6";
import { comp7 } from "../../db/questions/comp7";
import { comp8 } from "../../db/questions/comp8";
import { comp9 } from "../../db/questions/comp9";
import { comp10 } from "../../db/questions/comp10";
import { comp11 } from "../../db/questions/comp11";
import { comp12 } from "../../db/questions/comp12";
import { comp13 } from "../../db/questions/comp13";
import { comp14 } from "../../db/questions/comp14";
import { comp15 } from "../../db/questions/comp15";
import { comp16 } from "../../db/questions/comp16";
import { comp17 } from "../../db/questions/comp17";

interface Question {
    title: string;
    imagePath: null | any; 
    alternatives: {
      option: string;
      isTrue: boolean;
    }[];
  }
  
  interface Competence {
    lioto: Question[];
    devolutiva: string;
    description: string;
  }
  
  export type QuestionWithDevolutiva = {
    question: Question;
    devolutiva: string;
    description: string;
  };
  
const getRandomIndex = (maxIndex: number) => Math.floor(Math.random() * maxIndex);

const competences: Competence[] = [comp1, comp2, comp3, comp4, comp5, comp6, comp7, comp8, comp9, comp10, comp11, comp12, comp13, comp14, comp15, comp16, comp17 ];

type GetRandomQuestions = () => QuestionWithDevolutiva[];
  
  const getRandomQuestions: GetRandomQuestions = () => {
    const numQuestions = competences.length; 
    const randomQuestions: QuestionWithDevolutiva[] = [];
  
    for (let i = 0; i < numQuestions; i++) {
      const randomCompetenceIndex = getRandomIndex(competences.length);
      const selectedCompetence = competences[randomCompetenceIndex];
      const randomQuestionIndex = getRandomIndex(selectedCompetence.lioto.length);
      const selectedQuestion = selectedCompetence.lioto[randomQuestionIndex];
  
      randomQuestions.push({
        question: {
          title: selectedQuestion.title,
          imagePath: selectedQuestion.imagePath,
          alternatives: selectedQuestion.alternatives,
        },
        description: selectedCompetence.description,
        devolutiva: selectedCompetence.devolutiva,
      });
    }
  
    return randomQuestions;
  };
  
export { getRandomQuestions };