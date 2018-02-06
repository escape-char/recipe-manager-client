export enum IngredientUnitType {
    WEIGHT=<any>"Weight",
    VOLUME=<any>"Volume",
    LENGTH=<any>"Length",
    QUANTITY=<any>"Quantity"
};
export enum IngredientUnitPrefix{
  //Weight
  POUND=<any>"Pound (lb)",
  OUNCE=<any>"Ounce (oz)",
  MILLIGRAM =<any>"Milligram (mg)",
  GRAM = <any>"Gram (g)",
  KILOGRAM = <any>"Kilogram (kg)",
  //Volume
  TEASPOON= <any>"Teaspoon (t or tsp)",
  TABLESPOON= <any>"Tablespoon (T,tbl., tbs, or tbsp)",
  FLUID_OUNCE= <any>"Fluid Ounce (fl oz)",
  GILL = <any>"Gill (1/2 cup)",
  CUP =<any>"Cup (c)",
  PINT = <any>"Pint (p, pt, or fl pt)",
  QUART =<any>"Quart (q, qt, fl qt)",
  GALLON =<any>"Gallon (g or gal)",
  MILLILETER =<any>"Millileter (ml, cc, mL)",
  LITER = <any>"Liter (l, L)",
  DECILITER = <any>"Decileter (dL)",
  //Length
  MILLIMETER = <any>"Millimeter (lb)",
  CENTIMETER = <any>"Centimeter (cm)",
  METER = <any>"Meter (m)",
  INCH =<any>"Inch (in)"
}
export enum  RecipeDifficulty{
  EASY = <any>"Easy",
  MEDIUM= <any>"Medium",
  DIFFICULT=<any>"Difficult"
}
export class Ingredient{
  constructor(public ingredient_id:number=0,
    public item:string="",
    public amount:number=0,
    public unit_prefix:IngredientUnitPrefix=null,
    public unit_type:IngredientUnitType=null,
    public recipe_id:number=0){}
  toJson(){
    return {
      ingredient_id: this.ingredient_id,
      item: this.item,
      amount: this.amount,
      unit_prefix: this.unit_prefix,
      unit_type: this.unit_type,
      recipe_id: this.recipe_id
    }
  }
  static fromJsonObj(data:any){
    return new Ingredient(
      data.ingredient_id,
      data.item,
      data.amount,
      data.unit_prefix,
      data.unit_type,
      data.recipe_id
    );
  }
}
export class Direction{
  constructor(public direction_id:number=0,
              public description:string="",
              public step:number = 0,
              public recipe_id:number=0){}
  toJson(){
    return {
      direction_id: this.direction_id,
      description: this.description,
      step: this.step,
      recipe_id: this.recipe_id
    }
  }
  static fromJsonObj(data:any){
    new Direction(
       data.direction_id,
       data.description,
       data.step,
       data.recipe_id
    )
  }
}
export class RecipeCategory{
  constructor(public category_id:number = 0, public name:string="", public is_default:boolean=false){
  }
  toJson(){
    return {
      category_id: this.category_id,
      name: this.name,
      is_default: this.is_default
    }
  }
  static fromJsonObj(data:any){
     new RecipeCategory(
       data.id,
       data.name,
       data.is_default
     )
  }
}

export class Recipe{
  constructor(
    public id:number=0,
    public title:string="",
    public description:string ="",
    public source:string ="",
    public url:string="",
    public difficulty:RecipeDifficulty=RecipeDifficulty.EASY,
    public servings:number=0,
    public notes:string="",
    public prepTime:string="",
    public cookTime:string="",
    public image:string="",
    public createDateTime:string="",
    public createdBy:string="",
    public ingredients:Ingredient[]= null,
    public directions:Direction[]=null,
    public categories:RecipeCategory[]=null,
    public total:number=0,
    public state:string=""
  ){}
  toJson(){
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      source: this.source,
      url: this.url,
      difficulty: this.difficulty,
      servings:this.servings,
      notes:this.notes,
      prepTime:this.prepTime,
      cookTime:this.cookTime,
      image: this.image,
      createDateTime: this.createDateTime,
      createdBy: this.createdBy,
      ingredients: this.ingredients.map(i=>i.toJson()),
      directions: this.directions.map(d=>d.toJson()),
      categories: this.categories.map(c=>c.toJson()),
      total: this.total
    }
  }
  static fromJsonStr(str:string):Recipe{
    let parsed = JSON.parse(str);
    return Recipe.fromJsonObj(parsed);
  }
  static fromJsonObj(data:any):Recipe{
    return new Recipe(
      data.id,
      data.title,
      data.description,
      data.source,
      data.url,
      data.difficulty,
      data.servings,
      data.notes,
      data.prepTime,
      data.cookTime,
      data.image,
      data.createDateTime,
      data.createdBy,
      data.ingredients.map((i:any)=> Ingredient.fromJsonObj(i)),
      data.directions.map((d:any)=> Direction.fromJsonObj(d)),
      data.directions.map((c:any)=>RecipeCategory.fromJsonObj(c)),
      data.total);
  }
};
