import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage {

  constructor(
    private afs: AngularFirestore,
    public auth: AuthService,
    private router: Router) { }

    nav(to: string) {
      this.router.navigateByUrl(to);
    }
  

}
