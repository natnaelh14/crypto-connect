import styled from 'styled-components';

export const AvatarContainer = styled.div`
  display: flex; 
  flex-direction: row;
  flex-wrap: wrap; 
  justify-content: center;
`;

export const SingleAvatar = styled.button`
background-color: transparent;
&:hover .image {
    opacity: 0.5;
    cursor: pointer;
  }
`;