import {Component, OnInit} from '@angular/core';
import {Transaction, TxService} from "../../tx.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-db-tx-table',
  templateUrl: './db-tx-table.component.html',
  styleUrls: ['./db-tx-table.component.css']
})
export class DbTxTableComponent implements OnInit {

  public tx$: Observable<Transaction[]>;
  public total$: Observable<number>;

  constructor(public txService: TxService) {
    this.tx$ = this.txService.tx$;
    this.total$ = this.txService.total$;
  }

  ngOnInit(): void {
  }

}
