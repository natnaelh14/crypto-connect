import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  position: relative;
  @media (max-width: 1400px) {
    margin-bottom: 0px;
  }
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
  text-decoration: none;
`;

export const OptionsContainer = styled.div`
  min-width: 50%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  & > :last-child {
    margin-left: 15px;
  }
`;

export const OptionLink = styled.div`
  padding: 10px 15px;
  margin: 0 10px;
  cursor: pointer;
  text-decoration: none;
`;
