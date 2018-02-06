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
import {ModalService} from '../common/widgets/modal/modal.service';
import {NewCategory, Category, CategoryBrief} from '../common/categories/category';
import {CategoriesService} from '../common/categories/categories.service';
import {MyCategoryFormComponent} from './my-category-form.component';
import {Utils} from '../common/utils.service';
import {modalAnimations} from '../common/animations';

@Component({
  selector: 'my-category-modal',
  templateUrl: './my-category-modal.html',
  styleUrls: [],
  entryComponents: [
    MyCategoryFormComponent
  ],
  animations:modalAnimations
})
export class MyCategoryModalComponent{
  public static modalId:string = Utils.uuid();
  id: string;
  newModel:NewCategory;
  submitting:boolean = false;
  error:string="";
  title:string="";
  btnAction:string="";
  zIndex:number = 0;

  private STATE_OPEN:string = "in";
  private STATE_CLOSE:string = "out";

  public ACTION_NEW:string = "new";
  public ACTION_EDIT:string = "edit";

  private TITLE_NEW:string = "New Category";
  private TITLE_EDIT:string = "Rename Category";

  public categoryForm:FormGroup = null;
  public state:string = this.STATE_OPEN;
  constructor(
            @Inject("CATEGORY_ACTION") public action:string,
            @Inject("Category") private category:Category,
            private modalService: ModalService,
            private fb:FormBuilder,
            private categoriesService:CategoriesService) {

    this.newModel=new NewCategory();
    if(this.action === this.ACTION_NEW){
      this.title=this.TITLE_NEW;
      this.categoryForm = this.fb.group({
       name: ["", [Validators.required],
            this.categoriesService.validateCategoryTaken.bind(this.categoriesService)]
     });
    }else{
      this.title = this.TITLE_EDIT;
      this.categoryForm = this.fb.group({
       name: [category.name, [Validators.required],
            this.categoriesService.validateCategoryTaken.bind(this.categoriesService)]
      });
   }
   this.zIndex = this.modalService.getZIndex(MyCategoryModalComponent.modalId);

 }
 private update(name:string){
   let updateCat:CategoryBrief = new CategoryBrief(
     name,
     this.category.id,
     this.category.isDefault
   );
   this.categoriesService.update(updateCat).subscribe(
     data=>{
       console.log("successfully updated category");
       this.submitting = false;
       this.categoriesService.fetchMine().subscribe((data)=>{
       })
       this.close();
     },
     error=>{
       this.submitting = false;
       this.error = error;
       console.error("failed to update category");
     }
   );
 }
 private create(name:string){
     this.categoriesService.create(name).subscribe(
       data=>{
         console.log("successfully created category");
         this.submitting = false;
         this.categoriesService.fetchMine().subscribe((data)=>{
           console.log("testing")
         })
         this.close();
       },
       error=>{
         this.submitting = false;
         this.error = error;
         console.error("failed to create category");

       }
     );
   }
   close(){
     this.state = this.STATE_CLOSE;
     console.log(this.state)
     let that:any = this;
     setTimeout(function(){
       that.modalService.close(MyCategoryModalComponent.modalId);
     }, 1000)
   }
   onSubmit(data:any){
     console.log("onSubmit");
     this.submitting = true;
     if(this.action === this.ACTION_NEW){
       this.create(data.controls.name.value);
     }
     else if(this.action === this.ACTION_EDIT){
       this.update(data.controls.name.value);
     }
   }
   get canSubmit(){
     return (!this.categoryForm.pending &&
             !this.categoryForm.invalid &&
             !this.submitting);
   }
}
