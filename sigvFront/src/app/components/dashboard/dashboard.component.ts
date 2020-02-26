import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SessionStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  costCenterPoliciesChart: any;
  policyPercentagesChart: any;
  policyAmountsChart: any;

  dashboard: any;
  loginDataUser;

  constructor(
    private dashboardService: DashboardService,
    private sessionStorageService: SessionStorageService,
    private spinner: NgxSpinnerService,
  ) {
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
   }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    $('#menu-vuelo-1').hide();
    $('#menu-vuelo-2').show();
    $('#menu-hotel-1').show();
    $('#menu-hotel-2').hide();
    $('#menu-bus-1').show();
    $('#menu-bus-2').hide();
    $('#menu-paquete-1').show();
    $('#menu-paquete-2').hide();
    $('#menu-seguro-1').show();
    $('#menu-seguro-2').hide();
  }

  getData() {
    this.spinner.show();
    const companyId = this.loginDataUser.ocompany.companyId;
    this.dashboardService.getDashboard(companyId).subscribe(
      result => {
        console.log(result);
        if (result) {
          this.dashboard = result;
          this.loadDashboard();
        }
      },
      err => {
        console.log(err);
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  loadDashboard() {
    if (this.dashboard.lpolicyPercentages && this.dashboard.lpolicyPercentages.length > 0) {
      const policySeries = [];
      this.dashboard.lpolicyPercentages.forEach(element => {
        policySeries.push({
          name: element.policyName,
          y: element.percentage
        });
      });
      this.policyPercentagesChart = new Chart({
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Políticas Infringidas'
        },
        credits: {
          enabled: false
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.2f} %'
              },
              showInLegend: true
            }
        },
        series: [{
          name: '',
          colorByPoint: true,
          data: policySeries
      }]
      } as any);
    }

    if (this.dashboard.lpolicyAmounts && this.dashboard.lpolicyAmounts.length > 0) {
      const policyAmountsSeries = [];
      const currency = this.dashboard.lpolicyAmounts[0].currency;
      this.dashboard.lpolicyAmounts.forEach(element => {
        policyAmountsSeries.push({
          name: element.policyName,
          y: element.amount
        });
      });
      this.policyAmountsChart = new Chart({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Impacto en Costos'
        },
        credits: {
          enabled: false
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
            title: {
                text: 'Costo'
            }
        },
        plotOptions: {
          series: {
              borderWidth: 0,
              dataLabels: {
                  enabled: true,
                  format: '{point.y:.2f}' + currency
              }
            }
        },
        series: [{
          name: 'Costos',
          colorByPoint: true,
          data: policyAmountsSeries
        }]
      } as any);
    }

    if (this.dashboard.lcostCenterPolicies && this.dashboard.lcostCenterPolicies.length > 0) {
      const costCenterPoliciesSeries = [];
      const currencyImpact = this.dashboard.lcostCenterPolicies[0].currency;
      this.dashboard.lcostCenterPolicies.forEach(element => {
        costCenterPoliciesSeries.push({
          name: element.costCenterDescription,
          y: element.amount
        });
      });
      this.costCenterPoliciesChart = new Chart({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Impacto en Costos por Centro de Costos'
        },
        credits: {
          enabled: false
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
            title: {
                text: 'Impacto'
            }
        },
        plotOptions: {
          series: {
              borderWidth: 0,
              dataLabels: {
                  enabled: true,
                  format: '{point.y:.2f}' + currencyImpact
              }
            }
        },
        series: [{
          name: '',
          colorByPoint: true,
          data: costCenterPoliciesSeries
        }]
      } as any);
    }
  }
}
