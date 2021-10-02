import {Component, OnInit} from '@angular/core';
import {BeClientService} from "../be-client.service";
import * as Highcharts from 'highcharts';
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    Highcharts: typeof Highcharts = Highcharts;
    chartCallback: any;
    chart: any;
    cat: any[] = [];
    assets: any[] = [];
    chartOptions: Highcharts.Options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Daily Liquidity Mining rewards'
        },
        xAxis: {
            categories: [],
            type: 'datetime',
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Liquidity mining rewards'
            },
            labels: {
                formatter: function () {
                    return this.axis.defaultLabelFormatter.call(this) + ' €';
                }
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [],
        tooltip: {
            formatter: function () {
                let assetName = this.point.series.userOptions.name;
                return assetName + ' @ ' + this.x + ": <b>" + this.y + ' €</b>';
            }
        }
    };
    updateFlag = false;
    chartConstructor = "chart";

    constructor(private client: BeClientService) {
        const self = this;

        this.chartCallback = (chart: any) => {
            self.chart = chart;
        };
    }

    getUTCDate(value: string): number {
        if (value) {
            console.log('value', value)
            const date = value.split('-');
            console.log('date', date)
            const day = parseInt(date[2], 10);
            const month = parseInt(date[1], 10);
            const year = parseInt(date[0], 10);
            console.log('year', year)
            console.log('month', month - 1)
            console.log('day', day)
            return Date.UTC(year, month - 1, day);
        }
        return 0;
    }

    ngOnInit(): void {
        this.client.getLMRewardsPerDayAndAsset().subscribe(value => {
            console.log(value);
            this.cat = value.map((arr: any) => arr.date).filter(this.onlyUnique).map((v: any) => this.getUTCDate(v));
            this.assets = value.map((arr: any) => arr.coin_asset).filter(this.onlyUnique);
            let assetValues: any[] = [];
            let series = this.assets.map(asset => {
                return {
                    type: 'column',
                    name: asset,
                    data: value.filter((v: any) => v.coin_asset == asset).map((v: any) => v.sum_fiat)
                }
            })
            console.log('assetValues', assetValues)

            this.updateChart(series, this.cat);
        });
    }

    onlyUnique(value: any, index: any, self: any) {
        return self.indexOf(value) === index;
    }

    updateChart(series: { data: any; name: any; type: any }[], categories: any) {
        const self = this
        let datePipe = new DatePipe('de-DE');

        setTimeout(() => {
            for (const [key, value] of Object.entries(categories)) {
                // @ts-ignore
                self.chart.xAxis[0].categories[key] = datePipe.transform(value, 'shortDate')
            }
            self.chartOptions.series = series;
            self.updateFlag = true;
        }, 100);
    }

}
