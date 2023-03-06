export interface IUpdateSetting {
  id: string;
  idUnique: string;
  name: string;
  phone: string;
  comment: string;
}
export interface IFormUpdateSetting extends IUpdateSetting {
  fileUser: Array<File>;
}
export interface ISubmitUpdateSetting extends IUpdateSetting {
  changePhoto: boolean;
  file: File;
}
