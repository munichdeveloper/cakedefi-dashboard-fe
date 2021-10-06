import {Component} from '@angular/core';
import {Transaction, TxService} from "../../tx.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {BeClientService} from "../../be-client.service";

@Component({
    selector: 'app-db-tx-table',
    templateUrl: './db-tx-table.component.html',
    styleUrls: ['./db-tx-table.component.css']
})
export class DbTxTableComponent {

    public tx$: Observable<Transaction[]>;
    public total$: Observable<number>;
    public filterCollapsed = true;

    public availableOperations$: Observable<string[]>;
    public selectedOperation: string = 'Operation';
    public operationDropDownOpen = false;

    constructor(public txService: TxService, private beClientService: BeClientService) {
        this.tx$ = this.txService.tx$;
        this.total$ = this.txService.total$;
        this.availableOperations$ =
            this.beClientService.getAvailableOperations().pipe(
                map(value => value.sort())
            );
    }

    // private static onlyUnique(value: any, index: any, self: any) {
    //     return self.indexOf(value) === index;
    // }

    public toggleFilterCollapsed() {
        this.filterCollapsed = !this.filterCollapsed;
    }

    public toggleOperationDropDownOpen() {
        this.operationDropDownOpen = !this.operationDropDownOpen;
    }

    public setSelectedOperation(op: string) {
        this.selectedOperation = op;
        this.operationDropDownOpen = false;
    }

    public setFilter() {
        console.log(this.selectedOperation);
        this.txService.operation = this.selectedOperation;
    }
}
