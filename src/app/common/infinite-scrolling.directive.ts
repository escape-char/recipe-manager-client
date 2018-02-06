import { Directive,Input,Output,ElementRef,
  EventEmitter,  HostListener, Renderer} from '@angular/core';

@Directive({
  selector:"[infinite-scrolling]"
})

export class InfiniteScrollingDirective{
  private curScrollPct:number = 0; //current scroll percentage
  @Input() scrollPercentage:number = 0.7;
  @Output() onPercentageReached: EventEmitter<number> = new EventEmitter<number>();

  constructor(private el:ElementRef){

  }
  @HostListener('scroll', ['$event'])
  onScroll(e:Event) {
    console.log("onScroll");
    let target:any = e.target;
    this.curScrollPct = target.scrollTop / (this.el.nativeElement.scrollHeight - this.el.nativeElement.clientHeight)
    console.log("scroll %: " + this.curScrollPct);

    if(this.curScrollPct < this.scrollPercentage){
      return;
    }
    this.onPercentageReached.emit(this.curScrollPct);


  }

}
