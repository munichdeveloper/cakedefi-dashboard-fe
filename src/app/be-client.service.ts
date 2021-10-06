import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {SearchResult} from "./tx.service";

@Injectable({
    providedIn: 'root'
})
export class BeClientService {

    constructor(private httpClient: HttpClient) {
    }

    SERVER_URL = '/api';

    public getLMRewardsPerDayAndAsset(from: any, to: any): Observable<any> {
        return this.httpClient.get<any>(this.SERVER_URL + `/stat/lmrewardspda/${from}/${to}`);
    }

    public getLMRewardsSummary(): Observable<any> {
        return this.httpClient.get<any>(this.SERVER_URL + '/stat/lmrewardssum');
    }

    public uploadReport(file: File): Observable<HttpEvent<{}>> {
        const data: FormData = new FormData();
        data.append('file', file);
        const newRequest = new HttpRequest('POST', this.SERVER_URL + '/report/uploadReport', data, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.httpClient.request(newRequest);
    }

    public queryTransactions(page: number, size: number, operation: string | null = null): Observable<SearchResult> {
        let params = new HttpParams();
        params = params.append('page', page);
        params = params.append('size', size);

        if (operation) {
            params = params.append('operation', operation);
        }

        return this.httpClient.get<SearchResult>(`${this.SERVER_URL}/tx`, {params});
    }

    public getAvailableOperations(): Observable<string[]> {
        return this.httpClient.get<any>(this.SERVER_URL + '/tx/enumeration');
    }

}
