import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useUser from "../../../../hooks/useUser";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "../../../../styles/styles.buttonsmain";
import {
  CardContainer,
  ContainerGrid,
} from "../../../../styles/styles.cardmain";
import { Input, InputTextArea } from "../../../../styles/styles.inputsmain";
import { LabelForm } from "../../../../styles/styles.labelsmain";
import { IUser } from "../../../login/models/login.model";
import { updateSetting } from "../../hooks/useSetting";
import modalConfirmContext from "../../../../context/modalConfirmContext";
import {
  IUpdateSetting,
  ISubmitUpdateSetting,
  IFormUpdateSetting,
} from "../../models/setting.model";
import { WrapperSetting } from "./styles";

const Setting = () => {
  const router = useRouter();
  const { getUserLogin, setUserLogin } = useUser();
  const { handleChangeDataModalConfirm } = useContext(modalConfirmContext);
  const { mutate } = updateSetting();
  const [user, setUser] = useState<IUser | null>(null);
  const refImg = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      loadDataUser();
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    loadData();
  }, [user]);

  const loadDataUser = () => {
    const user = getUserLogin()!;
    setUser(user);
  };

  const loadData = () => {
    const { userName, comment, phone } = user!;
    setValue("name", userName);
    setValue("phone", phone);
    setValue("comment", comment);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigationBack = () => {
    router.push("/Chat");
  };

  const onSubmit = (data: IFormUpdateSetting) => {
    const json = {
      ...data,
      changePhoto: data.fileUser.length >= 1,
      file: data.fileUser[0],
      id: user?.id,
      idUnique: user?.idUnique,
    } as ISubmitUpdateSetting;

    mutate(json, {
      onSuccess: (d) => {
        updateDataUser(d.data);
        handleChangeDataModalConfirm(
          true,
          "Operación éxitosa.",
          "Se actualizó la información.",
          "Success"
        );
      },
    });
  };

  const updateDataUser = (userApi: IUser) => {
    const { picture, userName, phone, comment } = userApi;
    const json = {
      ...user,
      picture: `${picture}?${new Date().getTime()}`,
      userName,
      phone,
      comment,
    } as IUser;
    console.log(json, "upd");
    setUserLogin(json);
  };
  const loadPhotoImg = (e: FileList) => {
    if (!e.length) {
      return;
    }
    const file = e[0];
    const objectURL = URL.createObjectURL(file);
    refImg.current!.src = objectURL;
  };
  return (
    <WrapperSetting>
      <CardContainer>
        <h1>Configuración</h1>
        <hr />
        <form onSubmit={handleSubmit(onSubmit as any)}>
          <ContainerGrid>
            <div style={{ textAlign: "center" }}>
              <LabelForm>Foto</LabelForm>
              <img
                alt="foto"
                src={user?.picture || "/Avatar.png"}
                ref={refImg}
              />
              <br />
              <input
                type="file"
                {...register("fileUser")}
                onChange={(d) => loadPhotoImg(d.target.files!)}
              />
            </div>
            <div>
              <LabelForm>Nombre</LabelForm>
              <Input
                showError={Boolean(errors.name)}
                {...register("name", { required: true })}
              />
              {errors.name && <span>This field is required</span>}
            </div>
            <div>
              <LabelForm>Telefono</LabelForm>
              <Input
                showError={Boolean(errors.phone)}
                {...register("phone", { required: true })}
              />
              {errors.phone && <span>This field is required</span>}
            </div>
            <div>
              <LabelForm>Comentario</LabelForm>
              <InputTextArea
                showError={Boolean(errors.comment)}
                {...register("comment", { required: true })}
              />
              {errors.comment && <span>This field is required</span>}
            </div>
          </ContainerGrid>
          <hr />
          <div className="text-right">
            <ButtonSecondary type="button" onClick={navigationBack}>
              Regresar
            </ButtonSecondary>
            <ButtonPrimary type="submit">Actualizar</ButtonPrimary>
          </div>
        </form>
      </CardContainer>
    </WrapperSetting>
  );
};

export default Setting;
