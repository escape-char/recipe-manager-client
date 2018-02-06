import {Component, Input,
      Output,
      EventEmitter,
      ViewChild,
      ElementRef,
      AfterViewInit,
      Renderer} from '@angular/core';
import {ModalService, ModalView} from '../widgets/modal/modal.service';
import {Ingredient} from '../recipes/recipe';
import {IngredientModalComponent} from './ingredient-modal.component';
import * as _ from 'lodash';

@Component({
  selector: 'ingredients',
  styleUrls: ['./ingredients.scss'],
  templateUrl: './ingredients.html',
})
export class IngredientsComponent {
  @Input("ingredients") ingredients: Ingredient[] = [];

  constructor(private renderer:Renderer, private modalService:ModalService){
  }
  ngAfterViewInit(){
    console.log("after view init");
  }
  onAddClicked():void{
    let addView:ModalView = this.modalService.create(IngredientModalComponent, null, [
                                                       {provide: "Ingredient", useValue: new Ingredient()},
                                                        {provide: "ExistingIngredients", useValue: this.ingredients}]);
    this.modalService.open(addView.id);

  }
  onUpdateClicked(i:Ingredient):void{
    let updateView:ModalView = this.modalService.create(IngredientModalComponent, null, [
                                                       {provide: "Ingredient", useValue: i},
                                                        {provide: "ExistingIngredients", useValue: this.ingredients}]);
    this.modalService.open(updateView.id);
  }
  onDeleteClicked(i:Ingredient):void{
    let names:string[] = this.ingredients.map((ingr:Ingredient, i:number) =>{
      return ingr.item;
    })
    let index:number = names.indexOf(i.item);

    if(index === -1){
      return;
    }
    this.ingredients.splice(index, 1);
  }

}
