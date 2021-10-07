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

    // available data from backend
    public availableOperations$: Observable<string[]>;
    public availableAssets$: Observable<string[]>;

    // selected in dropdown
    public selectedOperation: string = 'Operation';
    public selectedAsset: string = 'Coin / Asset';

    // flag if dropdown is opened
    public operationDropDownOpen = false;
    public assetDropDownOpen = false;

    constructor(public txService: TxService, private beClientService: BeClientService) {
        this.tx$ = this.txService.tx$;
        this.total$ = this.txService.total$;
        this.availableOperations$ =
            this.beClientService.getAvailableOperations().pipe(
                map(value => value.sort())
            );
        this.availableAssets$ =
            this.beClientService.getAvailableAssets().pipe(
                map(value => value.sort())
            );
    }

    public toggleFilterCollapsed() {
        this.filterCollapsed = !this.filterCollapsed;
    }

    public toggleOperationDropDownOpen() {
        this.operationDropDownOpen = !this.operationDropDownOpen;
        if (this.operationDropDownOpen) {
            this.assetDropDownOpen = false;
        }
    }

    public toggleAssetDropDownOpen() {
        this.assetDropDownOpen = !this.assetDropDownOpen;
        if (this.assetDropDownOpen) {
            this.operationDropDownOpen = false;
        }
    }

    public setSelectedOperation(op: string) {
        this.selectedOperation = op;
        this.operationDropDownOpen = false;
    }

    public setSelectedAsset(a: string) {
        this.selectedAsset = a;
        this.assetDropDownOpen = false;
    }

    public setFilter() {
        if (this.selectedOperation != 'Operation') {
            this.txService.operation = this.selectedOperation;
        } else {
            this.txService.operation = undefined;
        }
        if (this.selectedAsset != 'Coin / Asset') {
            this.txService.asset = this.selectedAsset;
        } else {
            this.txService.asset = undefined;
        }
    }

    resetFilter() {
        this.selectedOperation = 'Operation';
        this.selectedAsset = 'Coin / Asset';
        this.setFilter();
    }
}
