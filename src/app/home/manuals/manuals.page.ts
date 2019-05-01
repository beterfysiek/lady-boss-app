import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manuals',
  templateUrl: './manuals.page.html',
  styleUrls: ['./manuals.page.scss'],
})
export class ManualsPage implements OnInit {

  public manuals: any[];

  constructor(private router: Router) { 
    this.manuals = [
      {
        title: 'Currency features'
      },
      {
        title: 'Charts and calculations'
      },
      {
        title: 'Meta trader'
      }
    ]
   }

   nav(to: string) {
    this.router.navigateByUrl(to);
  }

  ngOnInit() {
  }

}
