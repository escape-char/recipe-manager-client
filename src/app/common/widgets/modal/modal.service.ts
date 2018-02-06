import {Injectable} from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {Utils}  from '../../utils.service';


export enum ModalEvent {
  OPEN, DESTROY, CLOSE
}
export class ModalView{
  constructor(
    public id:string = "",
    public component:any = null,
    public event:number = ModalEvent.CLOSE,
    public isOpened:boolean = false,
    public data:any = {},
    public providers:Array<any> = [],
    public submitCallback: (data:any)=> any,
    public cancelCallback: (data:any)=>any,
    public zIndex:number = 0
  ){

  }
}
@Injectable()
export class ModalService {
  private Z_INDEX_DEFAULT:number= 50;


  constructor(){

  }
  private _currentModalViewSource = new Subject<ModalView>();
  currentModalView = this._currentModalViewSource.asObservable();
  private modalViews:ModalView[] = [];

  private getById(modalId:string):ModalView{
    return this.modalViews.filter((v)=>{
      return v.id == modalId;
    })[0]
  }
  isOpened(modalId:string): boolean {
    return this.getById(modalId).isOpened;
  }
  getModal(modalId:string):ModalView{
    return this.getById(modalId);
  }
  getZIndex(modalId:string):number{
    console.log("ModalService.getZIndex()");
    let modalView:ModalView = this.getById(modalId);
    console.log("modalView");
    console.log(modalView);
    return modalView.zIndex;

  }
  create(
    component:any,
    data?:any,
    providers?:Array<any>,
    submitCallback?:(data:any)=>any,
    cancelCallback?:(data:any)=>any) : ModalView{
    var event:ModalEvent = ModalEvent.CLOSE;

    var uuid:string = Utils.uuid();

    if(component.modalId){
      uuid = component.modalId;
    }
    let zIndex = this.Z_INDEX_DEFAULT + this.modalViews.length + 1;
    console.log("zIndex on create");
    console.log(zIndex);
    let addModal:ModalView  = new ModalView(uuid, component, event, false,
                data, providers, submitCallback, cancelCallback, zIndex);
    this.modalViews.push(addModal);
    return addModal
  }
  open(modalId:string): void {
    let modalView:ModalView = this.getById(modalId);
    if(modalView.isOpened ||
       modalView.event == ModalEvent.OPEN){
      return;
    }
    modalView.isOpened = true;
    modalView.event = ModalEvent.OPEN;
    this.fireEvent(modalView);
  }
  destroy(modalId:string) {
    let modalView:ModalView = this.getById(modalId);
    if(modalView.event == ModalEvent.DESTROY ||
       modalView.event == ModalEvent.CLOSE){
         return
     }
    modalView.isOpened = false;
    modalView.event = ModalEvent.DESTROY;
    this.fireEvent(modalView);
  }
  close(modalId:string):void {
    console.log("ModalService.close()")
    let modalView:ModalView = this.getById(modalId);
    if(modalView.event == ModalEvent.DESTROY ||
       modalView.event == ModalEvent.CLOSE){
         return
     }
    modalView.isOpened = false;
    modalView.event = ModalEvent.CLOSE;
    this.fireEvent(modalView);
  }
  private fireEvent(modalView:ModalView) {
    this._currentModalViewSource.next(modalView);
    if(modalView.event == ModalEvent.CLOSE ||
       modalView.event === ModalEvent.DESTROY){
         let  ids = this.modalViews.map((v)=>{
           return v.id;
         })
         let index:number = ids.indexOf(modalView.id);
         if(index !== -1){
           this.modalViews.splice(index, 1);
         }
    }
  }
}
