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
import {Direction} from '../recipes/recipe';
import {DirectionFormComponent} from './direction-form.component';
import {Utils} from '../utils.service';
import {modalAnimations} from '../animations';

@Component({
  selector: 'direction-modal',
  templateUrl: './direction-modal.html',
  styleUrls: [],
  entryComponents: [
    DirectionFormComponent
  ],
  animations:modalAnimations
})
export class DirectionModalComponent{
  public static modalId:string = Utils.uuid();

  id: string;
  newModel:Direction;
  submitting:boolean = false;
  error:string="";
  title:string="";
  btnAction:string="";
  zIndex:number = 0;

  public ACTION_NEW = "new";
  public ACTION_EDIT = "edit";
  private STATE_OPEN:string = "in";
  private STATE_CLOSE:string = "out";

  private TAKEN_ERROR:string = "This direction already exists.";

  private TITLE_NEW:string = "New Direction";
  private TITLE_EDIT:string = "Edit Direction";

  public action:string;

  public directionForm:FormGroup = null;
  public state:string = this.STATE_OPEN;
  constructor(
          @Inject("Direction") private direction:Direction,
          @Inject("ExistingDirections") private takenDirections:Direction[],
            private modalService: ModalService,
            private fb:FormBuilder) {

    console.log("DirectionsModalComponent.constructor()");

    this.newModel=new Direction();

    if(!this.direction.description){
      this.action=this.ACTION_NEW;
      this.title=this.TITLE_NEW;
      this.directionForm = this.fb.group({
       description: ["", [Validators.required]]
     });
    }else{
      this.action = this.ACTION_EDIT;
      this.title = this.TITLE_EDIT;
      this.directionForm = this.fb.group({
      description: [this.direction.description, [Validators.required]]
      });
   }
   this.zIndex = this.modalService.getZIndex(DirectionModalComponent.modalId);

 }
 private update(name:string){
 }
 onSubmitClicked(data:any){
   console.log("onSubmitClicked");
   console.log("existing ingredients");
   console.log(this.takenDirections);
  let description:string =  data.controls.description.value;
  let descrList:string[] = this.takenDirections.map((v:Direction)=>{
    return v.description;
  });
  let takenIndex:number = descrList.indexOf(description);

  if(takenIndex !== -1){
    this.error = this.TAKEN_ERROR;
    return;
  }
  let index1:number = descrList.indexOf(this.direction.description);

  if(index1 === -1){
    this.takenDirections.push(this.direction);
  }
  this.direction.description = description;
  this.close();
 }
 close():void{
     this.state = this.STATE_CLOSE;
     let that:any = this;
     setTimeout(function(){
       that.modalService.close(DirectionModalComponent.modalId);
     }, 1000)
 }
 get canSubmit(){
   return (!this.directionForm.pending &&
           !this.directionForm.invalid &&
           !this.submitting);
 }
}
