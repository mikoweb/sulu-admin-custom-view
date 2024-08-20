import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CustomElement, customElementParams } from '@app/core/application/custom-element/custom-element';
import CustomElementBaseComponent from '@app/core/application/custom-element/custom-element-base-component';
import GlobalStyleLoader from '@app/core/application/custom-element/global-style-loader';
import {
  NgApexchartsModule,
} from 'ng-apexcharts';

const { encapsulation, schemas } = customElementParams;

@Component({
  selector: CustomDashboardViewComponent.ngSelectorName,
  templateUrl: './custom-dashboard-view.component.html',
  styleUrls: ['./custom-dashboard-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  encapsulation,
  schemas,
  imports: [IonicModule, NgApexchartsModule]
})
@CustomElement()
export class CustomDashboardViewComponent extends CustomElementBaseComponent {
  public static override readonly customElementName: string = 'app-custom-dashboard-view';
  public static override readonly ngSelectorName: string
    = `${CustomElementBaseComponent.ngPrefix}-${CustomDashboardViewComponent.customElementName}`;

  protected chartOptions: any;

  constructor(
    ele: ElementRef,
    gsl: GlobalStyleLoader,
  ) {
    super(ele, gsl);

    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: 'donut'
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }

  protected override get useGlobalStyle() {
    return true;
  }
}
