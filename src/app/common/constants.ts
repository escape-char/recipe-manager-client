export class SignUpConstants{
  public static get EMAIL_ERROR_MIN_LENGTH():string{
    return "Email must be at least 5 characters.";
  }
  public static get EMAIL_ERROR_MAX_LENGTH():string{
    return "Email exceeded 55 character limit.";
  }
  public static get EMAIL_ERROR_REGEX():string{
    return "Email is invalid.";
  }
  public static get EMAIL_ERROR_TAKEN(): string{
    return "Email is already taken."
  }
   public static get EMAIL_REGEX():string {
      return "^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$";
    }
    public static get EMAIL_MAX_LENGTH(): number{
      return 55;
    }
    public static get EMAIL_MIN_LENGTH(): number{
      return 5;
    }
    public static get USERNAME_ERROR_MAX_LENGTH(): string{
      return "Username exceeded 55 character limit."
    }
    public static get USERNAME_ERROR_MIN_LENGTH(): string{
      return "Username must be at least 5 characters."
    }
    public static get USERNAME_ERROR_REGEX(): string{
      return "Username must begin with a letter and contain only alphanumeric and underscore characters."
    }
    public static get USERNAME_ERROR_TAKEN(): string{
      return "Username is already taken."
    }
    public static get USERNAME_MAX_LENGTH(): number{
      return 55;
    }
    public static get USERNAME_MIN_LENGTH(): number{
      return 5;
    }
    public static get USERNAME_REGEX(): string{
      return "^[A-z]+\\w+$";
    }
    public static get PASSWORD_ERROR_COMPLEXITY():string{
      return "Password must have at least one letter, number, and symbol !@#$%^&*()_+]'";
    }
    public static get PASSWORD_ERROR_MIN_LENGTH(): string{
      return "Password must be at least 8 characters";
    }
    public static get PASSWORD_ERROR_MISMATCH():string{
      return "Password and confirm password do not match";
    }
    public static get PASSWORD_MIN_LENGTH(): number{
      return 8;
    }
}
export class EndPoint{
  public static get ROOT(){
    return "/api";
  }
  public static get AUTH(){
    return `${EndPoint.ROOT}/auth`;
  }
  public static get CATEGORIES(){
    return `${EndPoint.ROOT}/categories`;
  }
  public static get MY_CATEGORIES(){
    return `${EndPoint.ROOT}/my/categories`;
  }
  public static get MY_RECIPES(){
    return `${EndPoint.ROOT}/my/recipes`;
  }
  public static get IS_USERNAME_TAKEN(){
    return `${EndPoint.ROOT}/is_username_taken`;
  }
  public static get IS_EMAIL_TAKEN(){
    return `${EndPoint.ROOT}/is_email_taken`;
  }
  public static get RECIPES(){
    return `${EndPoint.ROOT}/recipes`;
  }
  public static get REGISTER(){
    return `${EndPoint.ROOT}/register`;
  }
  public static get SESSION(){
    return `${EndPoint.ROOT}/session`;
  }
  public static get SIGNOUT(){
    return `${EndPoint.ROOT}/signout`;
  }
  public static get USERS(){
    return `${EndPoint.ROOT}/users`;
  }

}
export class  Device{
  public static get MOBILE_WIDTH(){
      return 568;
  }
  public static get TABLET_WIDTH(){
    return 768;
  }
  public static get MONITOR_WIDTH(){
    return 1000;
  }
}
