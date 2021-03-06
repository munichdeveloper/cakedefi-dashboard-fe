import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {debounceTime, delay, switchMap, tap} from "rxjs/operators";
import {BeClientService} from "./be-client.service";

export interface Transaction {
    amount: number;
    coinAsset: string;
    date: string;
    fiatCurrency: string;
    fiatValue: number;
    operation: string;
}

export interface SearchResult {
    transactions: Transaction[];
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    operation: string;
    asset: string;
    // sortColumn: SortColumn;
    // sortDirection: SortDirection;
}

@Injectable({
    providedIn: 'root'
})
export class TxService {

    private _loading$ = new BehaviorSubject<boolean>(true);
    public _search$ = new Subject<void>();
    private _tx$ = new BehaviorSubject<Transaction[]>([]);
    private _total$ = new BehaviorSubject<number>(0);

    private _state: State = {
        page: 1,
        pageSize: 10,
        operation: '',
        asset: '',
        // sortColumn: '',
        // sortDirection: ''
    };

    constructor(private beClient: BeClientService) {
        this._search$.pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(200),
            switchMap(() => this._search()),
            delay(200),
            tap(() => this._loading$.next(false))
        ).subscribe(result => {
            this._tx$.next(result.transactions);
            this._total$.next(result.total);
        });

        this._search$.next();
    }

    get tx$() {
        return this._tx$.asObservable();
    }

    get total$() {
        return this._total$.asObservable();
    }

    get loading$() {
        return this._loading$.asObservable();
    }

    get page() {
        return this._state.page;
    }

    get pageSize() {
        return this._state.pageSize;
    }

    get operation() {
        return this._state.operation;
    }

    get asset() {
        return this._state.asset;
    }

    set page(page: number) {
        this._set({page});
    }

    set pageSize(pageSize: number) {
        this._set({pageSize});
    }

    set operation(operation: string | undefined) {
        this._set({operation});
    }

    set asset(asset: string | undefined) {
        this._set({asset});
    }

    // set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
    // set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(): Observable<SearchResult> {
        // const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
        const {pageSize, page, operation, asset} = this._state;
        return this.beClient.queryTransactions(page - 1, pageSize, operation, asset);
    }
}
