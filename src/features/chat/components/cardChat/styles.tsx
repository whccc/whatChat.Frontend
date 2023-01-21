import styled from "styled-components";
export const Wrapper = styled.div`
  border-bottom: 0.5px solid var(--color-three);
  position: relative;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
    transition: all ease-in-out 0.2s;
  }
`;
export const Container = styled.div`
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

export const NewMessage = styled.span`
  position: absolute;
  right: 10px;
  background: var(--color-six);
  color: var(--color-white);
  font-size: 12px;
  width: 10px;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  padding: 10px;
  border-radius: 100%;
`;

export const WrapperMessage = styled.div`
  max-width: 250px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const WrapperWriting = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  color: var(--color-six);
  font-weight: 900;
`;
