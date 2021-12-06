import styled from 'styled-components';

export const GuestDataContainer = styled.div`
  display: flex;
  flexDirection: row;
  justify-content: space-around;
  @media (max-width: 1400px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const GuestUserInfoContainer = styled.div`
padding-right: 1.5rem;
display: flex;
flex-direction: column;
@media (max-width: 1400px) {
  padding-right: 0rem;
  display: flex;
  justify-content: center;
}
`;

export const CryptoCarouselContainer = styled.div`
@media (max-width: 1400px) {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}
`;

export const UserBioContainer = styled.div`
  @media (max-width: 1400px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 10px;
  }
`;