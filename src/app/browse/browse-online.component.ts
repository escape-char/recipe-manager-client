import { Component,
  ElementRef,
  ViewChild,
  trigger,
  state,
  style,
  animate,
  transition
 }        from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector:'browse-online',
  templateUrl: './browse-online.html',
  styleUrls: ['./browse-online.scss'],
  animations: [
    trigger('browseOnlineState', [
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
export class BrowseOnlineComponent {
  @ViewChild('searchIframe', {read: ElementRef}) iframe: ElementRef;
  private STATE_IN:string = "in";
  private STATE_OUT:string = "out";

  public onSearchChanged:any = _.debounce(this.onSearch, 300);

  search:string;
  searching:boolean = false;
  url:string="//duckduckgo.com?q=+recipes&t=h_&ia=recipes&iax=1"

  constructor(public router: Router) {
  }
  public onSearch(){
     let s:string = encodeURIComponent(this.search);
     this.url= `//duckduckgo.com?q=${s}+recipes&t=h_&ia=recipes&iax=1`
  }
}
