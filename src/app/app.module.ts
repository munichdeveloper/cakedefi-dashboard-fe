import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";
import {HighchartsChartModule} from "highcharts-angular";
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import {FiledropperComponent} from './filedropper/filedropper.component';
import {DndDirective} from './dnd.directive';
import {ProgressComponent} from './progress/progress.component';
import {DbTxTableComponent} from './dashboard/db-tx-table/db-tx-table.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";

registerLocaleData(localeDe, 'de-DE', localeDeExtra);

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        FiledropperComponent,
        DndDirective,
        ProgressComponent,
        DbTxTableComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        HighchartsChartModule,
        NgbModule,
        FormsModule
    ],
    providers: [
        {provide: LOCALE_ID, useValue: "de-DE"},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
