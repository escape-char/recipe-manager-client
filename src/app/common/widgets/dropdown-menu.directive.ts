import { AfterContentInit,
      OnDestroy,
      Directive,
      ElementRef,
       Input } from '@angular/core';
@Directive({ selector: '[dropdownMenu]' })
export class DropdownMenuDirective {
  //elements
   private containerEl:any; //container directive;
   private menuEl:any;
   private toggleEl:any;

   constructor(private el: ElementRef) {}

   private onToggleClicked(e:any){
     if(!this.menuEl.offsetHeight){
       this.menuEl.style.display = "block";
     }else{
       this.menuEl.style.display = "none";
     }
     let elems =  document.getElementsByClassName('dropdown-menu');
     for(var i=0; i<elems.length; i+=1){
       let el= <HTMLElement> elems[i];
       if(el == this.menuEl){
         console.log("objects are the same");
         continue;
       }
       el.style.display = "none";
     }
     e.stopPropagation();

   }
   private onBodyClicked(e:any){
     let curEl:any = e.target;
     if(curEl !== this.menuEl){
       this.menuEl.style.display = "none";
     }

   }
   ngAfterContentInit(){
      this.containerEl = this.el.nativeElement;
      this.toggleEl = this.containerEl.querySelector('.dropdown-toggle');
      this.menuEl = this.containerEl.querySelector('.dropdown-menu');
      this.toggleEl.addEventListener("click", this.onToggleClicked.bind(this));
      document.body.addEventListener("click", this.onBodyClicked.bind(this))

   }
   ngOnDestroy(){
     this.toggleEl.removeEventListener("click", this.onToggleClicked.bind(this));
     document.body.removeEventListener("click", this.onBodyClicked.bind(this))

   }
}
