import styled from "styled-components";

export const Container = styled.div`
  border-bottom: 0.5px solid var(--color-three);
  display: flex;

  flex-direction: row;
  align-items: center;

  & img {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    padding: 10px;
  }
`;
