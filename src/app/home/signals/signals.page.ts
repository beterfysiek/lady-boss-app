

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface Signal { date: any; TP: number; SL: number, open: number }

@Component({
  selector: 'app-signals',
  templateUrl: './signals.page.html',
  styleUrls: ['./signals.page.scss'],
})
export class SignalsPage {

  private signalsCollection: AngularFirestoreCollection<Signal>;
  public signals: Observable<Signal[]>;

  constructor(
    private afs: AngularFirestore,
    private router: Router
    ) {
    this.signalsCollection = afs.collection<Signal>('signals');
    this.signals = this.signalsCollection.valueChanges();
  }

  nav(to: string) {
    this.router.navigateByUrl(to);
  }
}