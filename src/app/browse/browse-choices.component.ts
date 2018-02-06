import { Component,
  trigger,
  state,
  style,
  animate,
  transition
 }        from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';

class BrowseChoice{
  name:string;
  selected:boolean;
  iconClass:string;

  constructor(n:string="", s:boolean=false, i:string=""){
    this.name = n;
    this.selected = s;
    this.iconClass=i;
  }
}

@Component({
  selector:'browse-choices',
  templateUrl: './browse-choices.html',
  styleUrls: ['./browse-choices.scss'],
  animations: [
    trigger('browseState', [
      state('in', style({transform: 'translateX(0)', display: 'inline-block'})),
      state('out', style({transform: 'translateX(-100%)', display:'none'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(300)
      ]),
      transition('in => out', [
        style({transform: 'translateX(0)'}),
        animate(300)
      ]),
      transition('out => in', [
        style({transform: 'translateX(-100%)'}),
        animate(300)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])

    ])
  ]
})
export class BrowseChoicesComponent {
  private STATE_IN:string = "in";
  private STATE_OUT:string = "out";
  state:string;

  choices:BrowseChoice[] = [
    new BrowseChoice("All Users", true, "fa-users"),
    new BrowseChoice("Search Online", false, "fa-globe")
  ]
  constructor(public router: Router) {

   }
   onChoiceClicked(c:BrowseChoice){
     this.choices.forEach((v:BrowseChoice)=>{
       v.selected = v.name === c.name ? true : false;
     })
   }
}
