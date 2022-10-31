import { useContext } from "react";
import modalConfirmContext from "../../../../context/modalConfirmContext";
import { ButtonPrimary } from "../../../../styles/styles.buttonsmain";
import { CardContainer } from "../../../../styles/styles.cardmain";
import { Wrapper, WrapperData } from "./style";

const ModalConfirm = () => {
  const { showModal, tittle, message, typeMessage, handleChangeShowModal } =
    useContext(modalConfirmContext);
  return (
    <>
      {showModal && (
        <Wrapper typeMessage={typeMessage}>
          <WrapperData typeMessage={typeMessage}>
            <CardContainer>
              <div>
                <h1>{tittle}</h1>
                <span
                  onClick={() => {
                    handleChangeShowModal(false);
                  }}
                >
                  X
                </span>
              </div>
              <div>
                <p>{message}</p>
              </div>
              <hr />
              <div>
                <ButtonPrimary
                  onClick={() => {
                    handleChangeShowModal(false);
                  }}
                >
                  Aceptar
                </ButtonPrimary>
              </div>
            </CardContainer>
          </WrapperData>
        </Wrapper>
      )}
    </>
  );
};

export default ModalConfirm;
