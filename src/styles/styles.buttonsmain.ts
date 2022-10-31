import styled from "styled-components";

export const ButtonPrimary = styled.button`
  background: var(--color-six) 0% 0% no-repeat padding-box;
  border-radius: 19px;
  color: #fff;
  font-family: MontserratSemiBold;
  font-size: 12px;
  border: transparent;
  padding: 9px 24px;
  cursor: pointer;
  height: 32px;
  &:hover {
    background-color: var(--color-seven);
  }
`;

export const ButtonSecondary = styled.button`
  font: normal normal normal 12px/18px MontserratSemiBold;
  letter-spacing: 0px;
  color: var(--color-text-seven);
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 9px 24px;
  &:hover {
    color: var(--color-seven);
  }
`;

export const ButtonTernary = styled.button`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid var(--color-six);
  border-radius: 19px;
  font-family: MontserratSemiBold;
  font-size: 12px;
  color: var(--color-six);
  padding: 9px 24px;
  cursor: pointer;
  height: 32px;
  &:hover {
    color: var(--color-white);
    background-color: var(--color-seven);
    border-color: var(--color-seven);
  }
`;
