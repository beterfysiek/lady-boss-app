import { Component } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage {

  public invoices: Observable<any[]>;
  limits$: BehaviorSubject<number>;
  count: number;

  constructor(
    public auth: AuthService,
    private router: Router,
    private afs: AngularFirestore,
    ) 
    { 
  
      this.count = 4;
      this.limits$ = new BehaviorSubject<number>(this.count);
      
      this.invoices = combineLatest(
      this.limits$
    ).pipe(
      switchMap(([limit]) => 
        afs.collection(`payed/${this.auth.currentUser.uid}/invoices`, ref => {
          let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          query = query.orderBy('paydate', 'desc').limit(limit);
          return query;
        }).valueChanges()
      )
    );
  }

  loadmore() {
    this.count = this.count +2;
    this.limits$.next(this.count); 
  }

    nav(to: string) {
      this.router.navigateByUrl(to);
    }
  

}
