import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BeClientService {

    constructor(private httpClient: HttpClient, private router: Router) {
    }

    SERVER_URL = '/api';

    public getLMRewardsPerDayAndAsset(): Observable<any> {
        return this.httpClient.get<any>(this.SERVER_URL + '/stat/lmrewardspda');
    }

    // public uploadReport(files: any): Observable<any> {
    //     return this.httpClient.post<any>(this.SERVER_URL + '/report/uploadReport', files);
    // }

    public uploadReport(file: File): Observable<HttpEvent<{}>> {
        const data: FormData = new FormData();
        data.append('file', file);
        const newRequest = new HttpRequest('POST', this.SERVER_URL + '/report/uploadReport', data, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.httpClient.request(newRequest);
    }

}
