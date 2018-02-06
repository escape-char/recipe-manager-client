export class User {
  constructor(
    public id:number = 0,
    public username:string = "",
    public firstname:string = "",
    public lastname:string = "",
    public email: string = "",
    public isAdmin:boolean = false,
  ){}
  toJson(){
    return {
      id: this.id,
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      isAdmin: this.isAdmin,
    }
  }
  static fromJson(str:string):User{
    let parsed = JSON.parse(str);
    return new User(
      parsed.id,
      parsed.username,
      parsed.firstname,
      parsed.lastname,
      parsed.email,
      parsed.isAdmin
    );
  }
}
