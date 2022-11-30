import { useState } from "react";
import socketIOClient from "socket.io-client";

const useModalConfirm = () => {
  const [modalConfirm, setModalConfirm] = useState({
    showModal: false,
    tittle: "",
    message: "",
    typeMessage: "Success",
  });

  const handleChangeDataModalConfirm = (
    showModal: boolean,
    tittle: string,
    message: string,
    typeMessage: string
  ) => {
    setModalConfirm({ showModal, tittle, message, typeMessage });
  };

  const handleChangeShowModal = (showModal: boolean) => {
    setModalConfirm({ ...modalConfirm, showModal });
  };

  return {
    ...modalConfirm,
    handleChangeDataModalConfirm,
    handleChangeShowModal,
  };
};
export default useModalConfirm;
