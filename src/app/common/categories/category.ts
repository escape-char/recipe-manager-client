export class Category{
  constructor(
    public name:string="",
    public id:number=0,
    public isDefault:boolean=false,
    public total:number=0,
    public totalRecipes:number=0,
    public selected:boolean = false
  ){}
  toJson(){
    return {
      id: this.id,
      name: this.name,
      isDefault: this.isDefault,
      total: this.total
    }
  }
  static fromJsonStr(str:string):Category{
    let parsed = JSON.parse(str);
    return new Category(
      parsed.username,
      parsed.id,
      parsed.isDefault,
      parsed.total,
      parsed.totalRecipes
    );
  }
  static fromJsonObj(data:any):Category{
    return new Category(
      data.name,
      data.id,
      data.isDefault,
      data.total,
      data.totalRecipes
    );
  }
};
export class NewCategory{
  constructor(name:string="", isDefault:boolean=false){}
}
export class CategoryBrief{
  constructor(
    public name:string="",
    public id:number=0,
    public isDefault:boolean=false
  ){}
  toJson(){
    return {
      id: this.id,
      name: this.name,
      isDefault: this.isDefault
    }
  }
  static fromJsonStr(str:string):Category{
    let parsed = JSON.parse(str);
    return new Category(
      parsed.username,
      parsed.id,
      parsed.isDefault
    );
  }
  static fromJsonObj(data:any):Category{
    return new Category(
      data.name,
      data.id,
      data.isDefault
    );
  }
};
