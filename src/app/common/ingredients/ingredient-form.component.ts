import { Component, Input } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DropdownListItem} from '../widgets/dropdown-list/dropdown-list.component';
import {IngredientUnitType, IngredientUnitPrefix} from '../recipes/recipe';
@Component({
  selector: 'ingredient-form',
  styleUrls: ['./ingredient-form.scss'],
  templateUrl: 'ingredient-form.html',
})
export class IngredientFormComponent {
  @Input() ingredientForm:FormGroup;
  submitted = false;
  error:string = "";

  private unitTypes:IngredientUnitType[] = [
    IngredientUnitType.QUANTITY,
    IngredientUnitType.VOLUME,
    IngredientUnitType.LENGTH,
    IngredientUnitType.WEIGHT
  ];
  private weightPrefixes:IngredientUnitPrefix[]=[
    IngredientUnitPrefix.MILLIGRAM,
    IngredientUnitPrefix.KILOGRAM,
    IngredientUnitPrefix.GRAM,
    IngredientUnitPrefix.OUNCE,
    IngredientUnitPrefix.POUND
  ];
  private volumePrefixes:IngredientUnitPrefix[]=[
    IngredientUnitPrefix.TEASPOON,
    IngredientUnitPrefix.TABLESPOON,
    IngredientUnitPrefix.FLUID_OUNCE,
    IngredientUnitPrefix.GILL,
    IngredientUnitPrefix.CUP,
    IngredientUnitPrefix.PINT,
    IngredientUnitPrefix.QUART,
    IngredientUnitPrefix.GALLON,
    IngredientUnitPrefix.MILLILETER,
    IngredientUnitPrefix.LITER,
    IngredientUnitPrefix.DECILITER
  ];
  private lengthPrefixes:IngredientUnitPrefix[]=[
    IngredientUnitPrefix.MILLIMETER,
    IngredientUnitPrefix.CENTIMETER,
    IngredientUnitPrefix.METER,
    IngredientUnitPrefix.INCH
  ];
  selectedUnitType:DropdownListItem;
  selectedPrefix:DropdownListItem;
  unitTypeDropdown:DropdownListItem[];
  prefixDropdown:DropdownListItem[];

  getErrors(field:string):any {
    return this.ingredientForm.controls[field].errors || {};
  }
  getControl(field:string):any {
    return this.ingredientForm.controls[field];
  }
  onPrefixSelected(p:DropdownListItem){
    console.log("onPrefixSelected()");

  }
  onUnitTypeSelected(u:DropdownListItem){
    this.selectedUnitType = u;
    this.ingredientForm.controls['amount'].setValue(null);
    this.ingredientForm.controls['unit_type'].setValue(u.value);

    let d:IngredientUnitPrefix[] = [];

    if(u.value === IngredientUnitType.QUANTITY.toString()){
      this.ingredientForm.controls['unit_prefix'].setValue(null);
      this.prefixDropdown = null;
      this.selectedPrefix = null;
      return;
    }
    if(u.value === IngredientUnitType.VOLUME.toString()){
      d = d.concat(this.volumePrefixes);
    }
    else if(u.value === IngredientUnitType.WEIGHT.toString()){
      d = d.concat(this.volumePrefixes);
    }
    else if(u.value === IngredientUnitType.LENGTH.toString()){
      d = d.concat(this.lengthPrefixes);
    }
    this.prefixDropdown = d.map((p:IngredientUnitPrefix)=>{
        return new DropdownListItem(p.toString(), p.toString(), false);
    })
    this.prefixDropdown[0].selected = true;
    this.selectedPrefix = this.prefixDropdown[0];
  }
  constructor(){
    this.unitTypeDropdown = this.unitTypes.map((u:IngredientUnitType)=>{
      return new DropdownListItem(u.toString(), u.toString(), false);
    });
    this.unitTypeDropdown[0].selected = true;
    this.selectedUnitType = this.unitTypeDropdown[0];
  }
}
