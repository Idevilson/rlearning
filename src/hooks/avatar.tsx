import React from 'react';

interface AvatarHook {
  getRandomAvatar: () => string; // Altere o tipo para corresponder ao tipo de seu caminho de imagem
}

const avatares = {
  imagens: [
    require('../assets/avatares/1.png'),
    require('../assets/avatares/2.png'),
    require('../assets/avatares/3.png'),
    require('../assets/avatares/4.png'),
    require('../assets/avatares/5.png'),
    require('../assets/avatares/6.png'),
    require('../assets/avatares/7.png'),
    require('../assets/avatares/8.png'),
    require('../assets/avatares/9.png'),
    require('../assets/avatares/10.png'),
    require('../assets/avatares/11.png'),
    require('../assets/avatares/12.png'),
    require('../assets/avatares/13.png'),
    require('../assets/avatares/14.png'),
    require('../assets/avatares/15.png'),
    require('../assets/avatares/16.png'),
    require('../assets/avatares/17.png'),
    require('../assets/avatares/18.png'),
  ]
};

const useRandomAvatar = (): AvatarHook => {
  const getRandomAvatar = (): string => {
    const randomIndex = Math.floor(Math.random() * avatares.imagens.length);
    return avatares.imagens[randomIndex];
  };

  return { getRandomAvatar };
};

export default useRandomAvatar;
