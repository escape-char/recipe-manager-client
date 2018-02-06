import {Component, Input,
      Output,
      EventEmitter,
      ViewChild,
      ElementRef,
      AfterViewInit,
      Renderer} from '@angular/core';
import {ModalService, ModalView} from '../widgets/modal/modal.service';
import {Direction} from '../recipes/recipe';
import {DirectionModalComponent} from './direction-modal.component';
import * as _ from 'lodash';

@Component({
  selector: 'directions',
  styleUrls: [],
  templateUrl: './directions.html',
})
export class DirectionsComponent {
  @Input("directions") directions: Direction[] = [];

  constructor(private renderer:Renderer, private modalService:ModalService){
  }
  ngAfterViewInit(){
    console.log("after view init");
  }
  onAddClicked():void{
    let addView:ModalView = this.modalService.create(DirectionModalComponent, null, [
                                                       {provide: "Direction", useValue: new Direction()},
                                                        {provide: "ExistingDirections", useValue: this.directions}]);
    this.modalService.open(addView.id);

  }
  onUpdateClicked(d:Direction):void{
    let updateView:ModalView = this.modalService.create(DirectionModalComponent, null, [
                                                       {provide: "Direction", useValue: d},
                                                        {provide: "ExistingDirections", useValue: this.directions}]);
    this.modalService.open(updateView.id);

  }
  onDeleteClicked(d:Direction):void{
    let names:string[] = this.directions.map((d:Direction, i:number) =>{
      return d.description;
    })
    let index:number = names.indexOf(d.description);

    if(index === -1){
      return;
    }
    this.directions.splice(index, 1);
  }

}
