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
import {Category} from '../common/categories/category';
import {Utils}  from '../common/utils.service';
import {CategoriesService} from '../common/categories/categories.service';
import {modalAnimations} from '../common/animations';

@Component({
  selector: 'my-category-delete-modal',
  templateUrl: './my-category-delete-modal.html',
  styleUrls: [],
  entryComponents: [
  ],
  animations:modalAnimations
})
export class MyCategoryDeleteModalComponent{
  private STATE_OPEN:string = "in";
  private STATE_CLOSE:string = "out";
  public static modalId: string  = Utils.uuid();

  id: string;
  submitting:boolean = false;
  error:string="";
  title:string="";
  btnAction:string="";
  state:string=this.STATE_OPEN;

  public categoryForm:FormGroup = null;
  constructor(
            @Inject("Category") private category:Category,
            private modalService: ModalService,
            private categoriesService:CategoriesService) {
 }
 onDeleteClicked(){
   console.log("onDeleteClicked()")
   this.submitting=true;
   this.categoriesService.delete(this.category.id).subscribe(
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
       console.error("failed to delete category");
     }
   );
 }
 close(){
   this.state=this.STATE_CLOSE;
   let that = this;
   setTimeout(function(){
     that.modalService.close(MyCategoryDeleteModalComponent.modalId);
   }, 1000)
 }
}
