

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface Signal { date: any; TP: number; SL: number, open: number }

@Component({
  selector: 'app-signals',
  templateUrl: './signals.page.html',
  styleUrls: ['./signals.page.scss'],
})
export class SignalsPage {

  private signalsCollection: AngularFirestoreCollection<Signal>;
  public signals: Observable<any[]>;
  limits$: BehaviorSubject<number>;
  count: number;
  constructor(
    private afs: AngularFirestore,
    private router: Router
    ) {
      this.count = 4;
      this.limits$ = new BehaviorSubject<number>(this.count);
      
      
      this.signals = combineLatest(
      this.limits$
    ).pipe(
      switchMap(([limit]) => 
        afs.collection('signals', ref => {
          let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          query = query.orderBy('date', 'desc').limit(limit);
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