import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CustomElement, customElementParams } from '@app/core/application/custom-element/custom-element';
import CustomElementBaseComponent from '@app/core/application/custom-element/custom-element-base-component';
import GlobalStyleLoader from '@app/core/application/custom-element/global-style-loader';

const { encapsulation, schemas } = customElementParams;

@Component({
  selector: ToolbarButtonComponent.ngSelectorName,
  templateUrl: './toolbar-button.component.html',
  styleUrls: ['./toolbar-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  encapsulation,
  schemas,
  imports: [IonicModule]
})
@CustomElement()
export class ToolbarButtonComponent extends CustomElementBaseComponent {
  public static override readonly customElementName: string = 'app-toolbar-button';
  public static override readonly ngSelectorName: string
    = `${CustomElementBaseComponent.ngPrefix}-${ToolbarButtonComponent.customElementName}`;

  @Output() btnClick = new EventEmitter();

  constructor(
    ele: ElementRef,
    gsl: GlobalStyleLoader,
  ) {
    super(ele, gsl);
  }

  protected onClick(): void {
    this.btnClick.emit();
  }
}
