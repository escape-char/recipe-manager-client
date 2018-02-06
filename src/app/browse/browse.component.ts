import { Component }        from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';

@Component({
  templateUrl: './browse.html'
})
export class BrowseComponent {
  message: string;

  constructor(public router: Router) {

   }
}
