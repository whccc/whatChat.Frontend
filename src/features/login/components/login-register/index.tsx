import ModalCapturePicture from "../login-modal-capture-picture";
const registerComponent = () => {
  return (
    <div>
      <div>
        <label>Usuario</label>
        <input type="text" />
        <hr />
        <div>
          <div>
            <img />
          </div>
          <button>Tomar foto</button>
        </div>
        <div>
          <button>Registrar</button>
        </div>
      </div>

      <ModalCapturePicture />
    </div>
  );
};

export default registerComponent;
