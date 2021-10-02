import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

}
