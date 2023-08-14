import { responseModel } from './reponseModel';
export interface RegistrationModel {
  'firstName': string;
  'lastName': string;
  'email': string;
  'password': string;
}

export interface LoginModel {
  'email': string;
  'password': string;
}

