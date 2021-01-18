import React from 'react';
import styled from 'styled-components/native';

import StarFull from '../assets/star.svg';
import StarHalf from '../assets/star_half.svg';
import StarEmpty from '../assets/star_empty.svg';

const Stars = ({stars, showNumber}) => {
  // 0= estrela vazia 1= meia estrela 2= estrela completa
  let s = [0, 0, 0, 0, 0];
  // ex: stars 4.7
  let floor = Math.floor(stars); // pega os inteiros de stars que é a nota. ex:4
  let left = stars - floor; // pega o não inteiro de stars. Ex:0.7

  let i;
  for (i = 0; i < floor; i++) {
    s[i] = 2;
  }

  if (left > 0) {
    s[i] = 1;
  }
  // resultado final do for e if com ex. 4.7 [2,2,2,2,1]
  return (
    <StarArea>
      {s.map((i, k) => (
        <StarView key={k}>
          {i === 0 && <StarEmpty width="18" height="18" fill="#FF9200" />}
          {i === 1 && <StarHalf width="18" height="18" fill="#FF9200" />}
          {i === 2 && <StarFull width="18" height="18" fill="#FF9200" />}
        </StarView>
      ))}
      {showNumber && <StarText>{stars}</StarText>}
    </StarArea>
  );
};

const StarArea = styled.View`
  flex-direction: row;
`;
const StarView = styled.View``;

const StarText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  margin-left: 5px;
  color: #737373;
`;

export default Stars;
