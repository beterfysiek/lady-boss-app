import { Component } from '@angular/core';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage {

  public invoices: any[];

  constructor() { 
    this.invoices = [
      {
        timestamp: new Date(),
        payeduntill: new Date(),
        payedat: new Date(),
        amount: 5
    }
  ]
  }

}
