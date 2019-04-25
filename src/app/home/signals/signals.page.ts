

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';

export interface Signal { date: any; TP: number; SL: number, open: number }

@Component({
  selector: 'app-signals',
  templateUrl: './signals.page.html',
  styleUrls: ['./signals.page.scss'],
})
export class SignalsPage {

  private signalsCollection: AngularFirestoreCollection<Signal>;
  public signals: Observable<Signal[]>;

  constructor(private afs: AngularFirestore) {
    this.signalsCollection = afs.collection<Signal>('signals');
    this.signals = this.signalsCollection.valueChanges();
  }
}