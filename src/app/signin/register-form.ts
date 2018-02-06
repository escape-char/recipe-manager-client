export class RegisterForm{
  constructor(
    public username:string,
    public email:string,
    public firstname: string,
    public lastname: string,
    public password:string,
    public confirmPassword:string
  ){}
}
