import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CustomElement, customElementParams } from '@app/core/application/custom-element/custom-element';
import CustomElementBaseComponent from '@app/core/application/custom-element/custom-element-base-component';
import GlobalStyleLoader from '@app/core/application/custom-element/global-style-loader';
import { NgForOf } from '@angular/common';

const { encapsulation, schemas } = customElementParams;

@Component({
  selector: CustomTab2ViewComponent.ngSelectorName,
  templateUrl: './custom-tab2-view.component.html',
  styleUrls: ['./custom-tab2-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  encapsulation,
  schemas,
  imports: [IonicModule, NgForOf]
})
@CustomElement()
export class CustomTab2ViewComponent extends CustomElementBaseComponent {
  public static override readonly customElementName: string = 'app-custom-tab2-view';
  public static override readonly ngSelectorName: string
    = `${CustomElementBaseComponent.ngPrefix}-${CustomTab2ViewComponent.customElementName}`;

  protected cols: number[] = new Array(3).fill(0);
  protected rows: number[] = new Array(10).fill(0);

  constructor(
    ele: ElementRef,
    gsl: GlobalStyleLoader,
  ) {
    super(ele, gsl);
  }

  protected override get useGlobalStyle() {
    return true;
  }
}
