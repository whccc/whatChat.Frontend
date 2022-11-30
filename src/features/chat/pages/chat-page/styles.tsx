import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  max-width: 1800px;
  margin: auto;
`;

export const WrapperToastMessage = styled.div`
  & span.p-toast-message-icon.pi.pi-check {
    display: none;
  }
`;
