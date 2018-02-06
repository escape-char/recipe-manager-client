import {
  Component,
  EventEmitter,
  trigger,
  state,
  style,
  transition,
  animate,
  Inject,
  Input,
  Output} from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ModalService} from '../widgets/modal/modal.service';
import {Ingredient} from '../recipes/recipe';
import {IngredientFormComponent} from './ingredient-form.component';
import {Utils} from '../utils.service';
import {modalAnimations} from '../animations';

@Component({
  selector: 'ingredient-modal',
  templateUrl: './ingredient-modal.html',
  styleUrls: [],
  entryComponents: [
    IngredientFormComponent
  ],
  animations:modalAnimations
})
export class IngredientModalComponent{
  public static modalId:string = Utils.uuid();

  id: string;
  newModel:Ingredient;
  submitting:boolean = false;
  error:string="";
  title:string="";
  btnAction:string="";
  zIndex:number = 0;

  public ACTION_NEW = "new";
  public ACTION_EDIT = "edit";
  private STATE_OPEN:string = "in";
  private STATE_CLOSE:string = "out";

  private TAKEN_ERROR:string = "This ingredient already exists.";


  private TITLE_NEW:string = "New Ingredient";
  private TITLE_EDIT:string = "Edit Ingredient";

  public action:string;

  public ingredientForm:FormGroup = null;
  public state:string = this.STATE_OPEN;
  constructor(
          @Inject("Ingredient") private ingredient:Ingredient,
          @Inject("ExistingIngredients") private takenIngredients:Ingredient[],
            private modalService: ModalService,
            private fb:FormBuilder) {

    console.log("IngredientsModalComponent.constructor()");

    this.newModel=new Ingredient();

    if(!this.ingredient.item){
      this.action=this.ACTION_NEW;
      this.title=this.TITLE_NEW;
      this.ingredientForm = this.fb.group({
       item: ["", [Validators.required]],
       amount: ["", [Validators.required]],
       unit_prefix: [""],
       unit_type:["", [Validators.required]]
     });
    }else{
      this.action = this.ACTION_EDIT;
      this.title = this.TITLE_EDIT;
      this.ingredientForm = this.fb.group({
      item: [this.ingredient.item, [Validators.required]],
      amount: [this.ingredient.item, [Validators.required]],
       unit_prefix: [this.ingredient.unit_prefix],
       unit_type:[this.ingredient.unit_prefix, [Validators.required]]
      });
   }
   this.zIndex = this.modalService.getZIndex(IngredientModalComponent.modalId);

 }
 private update(name:string){
 }
 onSubmitClicked(data:any){
   console.log("onSubmitClicked");
   console.log("existing ingredients");
   console.log(this.takenIngredients);
   console.log
  let item:string =  data.controls.item.value;
  let itemList:string[] = this.takenIngredients.map((v:Ingredient)=>{
    return v.item;
  });
  let takenIndex:number = itemList.indexOf(item);

  if(takenIndex !== -1){
    this.error = this.TAKEN_ERROR;
    return;
  }
  let index1:number = itemList.indexOf(this.ingredient.item);

  if(index1 === -1){
    this.takenIngredients.push(this.ingredient);
  }
  this.ingredient.item = item;
  this.close();
 }
 close():void{
     this.state = this.STATE_CLOSE;
     let that:any = this;
     setTimeout(function(){
       that.modalService.close(IngredientModalComponent.modalId);
     }, 1000)
 }
 get canSubmit(){
   return (!this.ingredientForm.pending &&
           !this.ingredientForm.invalid &&
           !this.submitting);
 }
}
