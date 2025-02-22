export interface userCredentials {
  email: string;
  password: string;
}

export interface userCredentialsRecover extends userCredentials {
  re_password: string;
}

export interface authenticationResponse {
  token: string;
  expiracion: Date;
  currentPass: boolean;
}
