import styled from "styled-components";

export const ImageContainer = styled.div`
  margin-top: 5.5rem;
  margin: 20px;
  @media (min-width: 1200px) {
    margin-bottom: 5.5rem;
  }
  @media (max-width: 1200px) {
    margin-top: 0rem;
    display: flex;
    justify-content: center; 
  }
`;

export const AboutUsContainer = styled.div`
    margin-top: 400px;
    @media (min-width: 1200px) {
    margin-bottom: 5.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around; 
  }
  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around; 
  }
`;

export const FeatureContainer = styled.div`
    @media (max-width: 1200px) {
      display: flex;
      justify-content: center; 
    }
`;