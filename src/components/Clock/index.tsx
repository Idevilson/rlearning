import { useEffect, useState } from "react";
import { ClockContainer, ClockTime } from "./styles";


import ClockIcon from '../../assets/timeIcon.svg';

export function Clock() {
    const [totalSeconds, setTotalSeconds] = useState(0);

    useEffect(() => {
      const updateTimer = () => {
        setTotalSeconds((prevSeconds) => prevSeconds + 1);
      };
  
      // Inicia o cronômetro
      const timerId = setInterval(updateTimer, 1000);
  
      // Retorna uma função de limpeza para interromper o cronômetro quando o componente for desmontado
      return () => clearInterval(timerId);
    }, []); // O segundo argumento vazio [] faz com que o useEffect seja executado apenas uma vez, semelhante ao componentDidMount
  
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
    return(
        <ClockContainer>
            <ClockIcon 
                width={16}
                height={16}
            />

            <ClockTime>
                {formattedTime}
            </ClockTime>
        </ClockContainer>
    )
}