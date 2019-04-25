import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manuals',
  templateUrl: './manuals.page.html',
  styleUrls: ['./manuals.page.scss'],
})
export class ManualsPage implements OnInit {

  public manuals: any[];

  constructor() {
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

  ngOnInit() {
  }

}
