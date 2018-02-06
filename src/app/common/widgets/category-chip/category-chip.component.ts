import {Component, Input,
      Output,
      EventEmitter,
      ViewChild,
      ElementRef,
      AfterViewInit,
      Renderer} from '@angular/core';
import {CategoryBrief, Category} from '../../categories/category';
import {CategoriesService} from '../../categories/categories.service';
import * as _ from 'lodash';

@Component({
  selector: 'category-chip',
  styleUrls: ['./category-chip.scss'],
  templateUrl: './category-chip.html',
})
export class CategoryChipComponent {
@Input("categories") categories: CategoryBrief[] = [];
public availCategories:CategoryBrief[] = [];
private availCategoriesOrig:CategoryBrief[]= [];

newCategory = {content:""};
  constructor(private renderer:Renderer,
              private categoriesService: CategoriesService){
    let taken:string[] = this.categories.map((v:CategoryBrief) => {
      return v.name;
    });
    console.log("CategoryChipComponent");
    let myCat:Category[] = this.categoriesService.myCategories;

    categoriesService.fetchMine().subscribe((data:any)=>{
      console.log("subscribe to categoriesView")
      let taken:string[] = this.categories.map((v:CategoryBrief) => {
        return v.name;
      });
      this.availCategories = data.map((v:Category)=>{
        return new CategoryBrief(
          v.name,
          v.id,
          v.isDefault
        )}).filter((v:CategoryBrief)=>{
          return taken.indexOf(v.name) == -1 && !v.isDefault;
      });
      this.availCategoriesOrig = [].concat(this.availCategories);
      console.log("available categories");
      console.log(this.availCategories)
    });
  }
  isTaken(name:string): boolean{
    return this.categories.filter((v:CategoryBrief)=>{
      return v.name == name;
    }).length > 0

  }
  ngAfterViewInit(){
    console.log("after view init");
  }
  onTypeaheadClicked(c:CategoryBrief){
    console.log("onTypeAheadClicked");
    let newCat:CategoryBrief = new CategoryBrief(
      c.name,
      0,
      false
    );
    this.categories.push(newCat);
    this.newCategory.content= "";
    this.availCategories = [].concat(this.availCategoriesOrig);
  }
  onInputBlur(event:any){
    console.log("onInputBlur()");
    if(!this.newCategory.content){
      return;
    }
    let taken:boolean = this.isTaken(this.newCategory.content);
    if(taken){
      this.newCategory.content = "";
      return;
    }
    let newCat:CategoryBrief = new CategoryBrief(
      this.newCategory.content,
      0,
      false
    );
    this.categories.push(newCat);
    this.newCategory.content= "";
    this.availCategories = [].concat(this.availCategoriesOrig);
  }
  onDeleteChip(chip:CategoryBrief){
    let names:Array<string> = this.categories.map((v:CategoryBrief)=>{
      return v.name;
    });
    let index:number = names.indexOf(chip.name);
    if(index !== -1){
      this.categories.splice(index, 1);
    }
  }
  onInputChange(value:string){
    var name:string = this.newCategory.content;
    console.log("name: ");
    console.log(name);
    console.log(name.length);

    if(!name){
      return;
    }

    let takenNames:string[] = this.categories.map((v:CategoryBrief)=>{
      return v.name;
    })
    console.log("takenNames");
    console.log(takenNames);
    this.availCategories = this.availCategoriesOrig.filter((v:CategoryBrief)=>{
      return v.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 &&
            takenNames.indexOf(v.name) == -1;
    });
    if(!/\s+$/.test(name)){
      return;
    }
    name = name.split(" ")[0];
    if(!name){
      return;
    }
    let taken:boolean = this.isTaken(name);
    if(taken){
      this.newCategory.content= "";
      return;
    }
    let newCat:CategoryBrief = new CategoryBrief(
      this.newCategory.content,
      0,
      false
    );
    this.categories.push(newCat);
    this.newCategory.content="";
    this.availCategories = [].concat(this.availCategoriesOrig);
  }
}
