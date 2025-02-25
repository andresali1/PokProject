export interface userCredentials {
  email: string;
  password: string;
  fromAdmin: boolean;
}

export interface userCredentialsRecover extends userCredentials {
  re_password: string;
}

export interface authenticationResponse {
  token: string;
  expiracion: Date;
  PasswordReset: boolean;
}
