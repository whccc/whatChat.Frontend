import styled from "styled-components";

export const Container = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const ContainerMessage = styled.div`
  max-width: 80%;
  width: 100%;
  background-color: var(--color-white);
  padding: 10px;
  border-radius: 8px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;
