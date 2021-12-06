import styled from 'styled-components';

export const CryptoPageContainer = styled.div`
  width: 75%;
  margin: 20px;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

export const CryptoDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  @media (max-width: 1400px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const CryptoDoughnutContainer = styled.div`
@media (max-width: 1400px) {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
`;

export const CryptoCarouselContainer = styled.div`
@media (max-width: 1400px) {
  display: flex;
  justify-content: center;
}
`;