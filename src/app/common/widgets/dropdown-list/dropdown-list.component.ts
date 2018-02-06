import {Component,
      Input,
      Output,
      ViewChild,
      OnInit,
      OnDestroy,
      AfterViewInit,
      ElementRef,
      EventEmitter,
      Renderer,
      trigger,
      state,
      style,
      transition,
      keyframes,
       animate} from '@angular/core';
import * as _ from "lodash";

export class DropdownListItem{
  private ITEM_ID="dd-item-";
  constructor(public name:string = "", public value:string="", public selected:boolean=false, public id:string=""){
    if(!this.id){
      this.id = _.uniqueId(this.ITEM_ID);
    }
  }
}
@Component({
  selector: 'dropdown-list',
  styleUrls: ['./dropdown-list.scss'],
  template: `<div class="dropdown-list-container">
                <label>{{ddLabel}}</label>
                <a class="dropdown-list-input"
                 tabindex='-1'
                 [ngClass]="{placeholder: !!selectedItem}"
                 (click)="onInputClicked($event)">
                 <span>{{inputValue}}
                   <i class="fa fa-caret-down"></i>
                 </span>
                </a>
                <ul class='dropdown-list' [hidden]="!showDropdown"
                 tabindex="-1"
                [@dropdownListState]="state"
                  #dropdownList>

                  <li id="{{i.id}}" class="dropdown-list-item"
                   [ngClass]="{'selected':i.selected}"
                   (click)="onItemClicked($event, i)"
                   *ngFor="let i of ddItems">
                    <a>
                      <span>
                       {{i.name}}
                       <i *ngIf="i.selected" class="fa fa-check"></i>
                       </span>
                    </a>
                  </li>
                </ul>
             </div>`,
  animations: [
    trigger('dropdownListState', [
      state('in', style({transform: 'translateY(0)', opacity:1})),
      state('out', style({transform: 'translateY(-100%)', opacity:0})),
      transition('void => *', [
        style({transform: 'translateY(-100%)', opacity:0}),
        animate(100)
      ]),
      transition('in => out', [
        style({transform: 'translateY(0)', opacity:1}),
        animate(100)
      ]),
      transition('out => in', [
        style({transform: 'translateY(-100%)', opacity:0}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateY(-100%)', opacity:0}))
      ])
    ])
  ]
})
export class  DropdownListComponent {
  @Input() ddItems:DropdownListItem[];
  @Input() ddLabel:string;
  @Output() onItemSelected: EventEmitter<DropdownListItem> = new EventEmitter<DropdownListItem>();
  @ViewChild('dropdownList') dropdownList:ElementRef;

  private STATE_IN:string = "in";
  private STATE_OUT:string="out";

  public state:string=this.STATE_OUT;

  showDropdown:boolean = false;
  selectedItem:DropdownListItem;
  inputValue:string;
  prevSelectedItem:DropdownListItem;

  onInputClicked(e:any){
    this.showDropdown = !this.showDropdown;
    if(this.showDropdown){
      setTimeout(()=>{
        this.dropdownList.nativeElement.focus();
        this.dropdownList.nativeElement.scrollIntoView();
      }, 300);
      this.state = this.STATE_IN;
    }else{
      this.state = this.STATE_OUT;
    }
    e.stopPropagation();
  }
  onDocumentClicked(e:any){
    let elem:any = e.target;
    if(!this.dropdownList){return;}
    if(elem === this.dropdownList.nativeElement){
      return;
    }
    this.showDropdown = false;
  }
  onItemClicked(e:any, item:DropdownListItem){
    console.log("onItemClicked()")
    item.selected = true;
    this.inputValue = item.name;
    this.prevSelectedItem = this.selectedItem;
    if(this.prevSelectedItem){
      this.prevSelectedItem.selected = false;
    }
    this.selectedItem = item;
    this.showDropdown = false;
    this.onItemSelected.emit(item);
    e.stopPropagation();
  }
  constructor(){

  }
  ngOnInit(){
    this.onDocumentClicked = this.onDocumentClicked.bind(this);
    console.log("DropdownList()");
    console.log("dditems");
    console.log(this.ddItems);

    let selected:DropdownListItem[] = this.ddItems.filter((d:DropdownListItem)=>{
      return d.selected;
    })
    if(selected.length > 0){
      this.selectedItem = selected[0];
      this.inputValue = this.selectedItem.name;
    }
  }
  ngAfterViewInit(){
    document.addEventListener('click', this.onDocumentClicked);
  }
  ngOnDestroy(){
    document.removeEventListener('click', this.onDocumentClicked);
  }
}
