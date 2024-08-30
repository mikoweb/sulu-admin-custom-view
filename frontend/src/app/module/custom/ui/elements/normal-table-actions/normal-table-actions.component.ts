import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CustomElement, customElementParams } from '@app/core/application/custom-element/custom-element';
import CustomElementBaseComponent from '@app/core/application/custom-element/custom-element-base-component';
import GlobalStyleLoader from '@app/core/application/custom-element/global-style-loader';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { LinkComponent } from '@app/shared/ui/elements/link/link.component';

const { encapsulation, schemas } = customElementParams;

@Component({
  selector:  NormalTableActionsComponent.ngSelectorName,
  templateUrl: './normal-table-actions.component.html',
  styleUrls: ['./normal-table-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  encapsulation,
  schemas,
  imports: [
    IonicModule,
    TranslateModule,
    MatMenu,
    MatMenuTrigger,
    LinkComponent,
  ]
})
@CustomElement()
export class NormalTableActionsComponent extends CustomElementBaseComponent {
  public static override readonly customElementName: string = 'app-normal-table-actions';
  public static override readonly ngSelectorName: string
    = `${CustomElementBaseComponent.ngPrefix}-${ NormalTableActionsComponent.customElementName}`;

  @Input() id?: string;

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
