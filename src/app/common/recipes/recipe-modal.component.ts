import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate,
  Inject} from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from "lodash";
import {ModalService} from '../widgets/modal/modal.service';
import {Recipe, Ingredient, Direction, RecipeCategory} from './recipe';
import {CategoryBrief} from  '../categories/category';
import {RecipesService} from './recipes.service';
import {Utils} from '../utils.service';
import {modalAnimations} from '../animations';
import {PositiveIntegerPipe} from '../positive-integer.pipe';

@Component({
  selector: 'recipe-modal',
  templateUrl: 'recipe-modal.html',
  styleUrls: ['./recipe.scss'],
  entryComponents: [],
  animations:modalAnimations
})
export class RecipeModalComponent{
  private STATE_OPEN:string = "in";
  private STATE_CLOSE:string = "out";

  public ACTION_NEW:string = "new";
  public ACTION_EDIT:string = "edit";

  private TITLE_NEW:string = "New Recipe";
  private TITLE_EDIT:string = "Edit Recipe";

  private ERROR_NO_CATEGORIES:string = "At least one category is required.";
  private ERROR_NO_INGREDIENTS:string = "At least one ingredient is required.";
  private ERROR_NO_DIRECTIONS:string = "At least one direction is required.";

  public static modalId:string = Utils.uuid();
  public pipe:any = new PositiveIntegerPipe();

  id: string;
  submitting:boolean = false;
  error:string="";
  title:string="";
  btnAction:string="";
  zIndex:number=0;
  categories:CategoryBrief[] = [];
  ingredients:Ingredient[] = [];
  directions:Direction[] = [];
  image:string = null;
  state:string = this.STATE_OPEN;
  public recipeForm:FormGroup = null;


  constructor(
            @Inject("Recipe") private recipe:Recipe,
            @Inject("RECIPE_ACTION") public action:string,
            private modalService: ModalService,
            private recipesService:RecipesService,
            private fb:FormBuilder) {
        this.onServingsChanged = _.debounce(this.onServingsChanged, 600).bind(this);
        this.onServingsChanged(null);
        this.zIndex = modalService.getZIndex(RecipeModalComponent.modalId);
        if(this.action === this.ACTION_NEW){
          this.recipe = new Recipe();
          this.title=this.TITLE_NEW;
          this.recipeForm = this.fb.group({
           title: ["", [Validators.required], [this.recipesService.validateRecipeTaken.bind(this.recipesService)]],
           source: ["", []],
           url: ["", []],
           description: ["", [Validators.required]]
         });
        }else{
          this.title = this.TITLE_EDIT;
          this.recipeForm = this.fb.group({
           title: [recipe.title, [Validators.required]],
           source: [recipe.source, []],
           url: [recipe.url, []],
           description: [recipe.description,[]]
          });
       }
 }
 onServingsChanged(e:any){
   console.log("onServingsChanged()");
   console.log(this.recipe.servings);
   setTimeout(()=>{
      this.recipe.servings= this.pipe.transform(this.recipe.servings, 1, 10000);
    });
 }
 onSubmitClicked(){
   if(this.categories.length === 0){
     this.error = this.ERROR_NO_CATEGORIES;
     return;
   }
   else if(this.ingredients.length === 0){
     this.error = this.ERROR_NO_INGREDIENTS;
     return;
   }
   else if(this.directions.length === 0){
     this.error = this.ERROR_NO_DIRECTIONS;
     return;
   }
   this.error = "";
   this.submitting = true;
   this.recipe.title = this.recipeForm.get('title').value;
   this.recipe.source = this.recipeForm.get('source').value;
   this.recipe.image = this.image || "";
   this.recipe.description = this.recipeForm.get('description').value;
   this.recipe.categories = this.categories.map((c:CategoryBrief)=>{
     return new RecipeCategory(c.id, c.name);
   })
   this.recipe.directions = [].concat(this.directions);
   this.recipe.directions.forEach((d:Direction, i:number)=>{
     d.step = i;
   });
   this.recipe.ingredients = [].concat(this.ingredients);
   console.log(this.recipe.toJson());

   if(this.action === this.ACTION_EDIT){

   }else if(this.action === this.ACTION_NEW){
     this.recipesService.create(this.recipe).subscribe((data:any)=>{
       this.state = this.STATE_CLOSE;
       this.submitting=false;
       let that = this;
       setTimeout(function(){
         that.modalService.close(RecipeModalComponent.modalId);
       }, 1000)
     }, (data:any)=>{
       this.state = this.STATE_CLOSE;
       this.submitting=false;
       console.log("failed to create recipe");
       this.error = data;
       console.log(data);
     });

   }

 }
 close(){
   this.state = this.STATE_CLOSE;
   let that = this;
   setTimeout(function(){
     that.modalService.close(RecipeModalComponent.modalId);
   }, 1000)
 }

}
