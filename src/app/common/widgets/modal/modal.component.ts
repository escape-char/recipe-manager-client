import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate,
   OnDestroy,
   OnInit,
   ReflectiveInjector,
   Injector,
   ComponentFactoryResolver
} from '@angular/core';
import {ViewContainerRef} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ModalService, ModalEvent, ModalView} from './modal.service';

@Component({
  selector: 'modal-overflow',
  template: '<div></div>',
  animations:[
    trigger('slideInOut', [
      state('*', style({transform: 'translateY(0)', opacity: 1})),
      transition('void -> *', [
        style({transform:'translateY(-100%)'}),
        animate(300)
      ]),
      transition('* -> void', [
        animate(300,style({transform:'translateY(-100%)'}) )
      ])
  ])
]
})
export class Modal implements OnDestroy, OnInit {
  loading:boolean = false;
  subscribers: Array<Subscription> = [];
  modalView:ModalView;
  constructor(private modalService: ModalService,
              private injector: Injector,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }


  ngOnInit():void {
    this.modalService.currentModalView.subscribe((data:ModalView) => {
      if(data.event == ModalEvent.OPEN){
        this.open(data);
      }
      else if (
          data.event === ModalEvent.CLOSE ||
          data.event === ModalEvent.DESTROY
        ){
        this.close(data);
      }
    })
  }
  ngOnDestroy() {
    if (this.subscribers) {
      this.subscribers.forEach(item => item.unsubscribe());
      this.subscribers = null;
    }
  }
  private open(data:any) {
    this.loading = true;
    let providers = data.providers || [];
    let injector = ReflectiveInjector.resolveAndCreate(providers, this.injector);
    let factory = this.componentFactoryResolver.resolveComponentFactory(data.component);
    this.loading = false;
    data.component = this.viewContainerRef.createComponent(factory, 0, injector);
  }

  private close(data:any) {
    //this.viewContainerRef.detach(0);
    data.component.destroy();
  }
}
