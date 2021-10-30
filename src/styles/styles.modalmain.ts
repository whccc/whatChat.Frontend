import styled from "styled-components";

export const ContainerModal = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

export const ContainerModalData = styled.div`
  background-color: #fff;
  padding: 10px;
  max-width: 500px;
  margin: auto;
  border-radius: 10px;
`;

export const ContainerModalCamera = styled.div`
  & video,
  img {
    width: 100%;
  }
`;
