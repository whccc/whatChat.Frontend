import * as React from "react";

const modalConfirmContext = React.createContext({
  showModal: false,
  tittle: "",
  message: "",
  typeMessage: "Success",
  handleChangeDataModalConfirm: (
    _showModal: boolean,
    _tittle: string,
    _message: string,
    _typeMessage: string
  ) => {},
  handleChangeShowModal: (_showModal: boolean) => {},
});

export default modalConfirmContext;
