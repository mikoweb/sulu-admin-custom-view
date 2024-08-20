import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { IonicModule, IonModal } from '@ionic/angular';
import { CustomElement, customElementParams } from '@app/core/application/custom-element/custom-element';
import CustomElementBaseComponent from '@app/core/application/custom-element/custom-element-base-component';
import GlobalStyleLoader from '@app/core/application/custom-element/global-style-loader';
import { ToolbarButtonComponent } from '@app/shared/ui/elements/toolbar/toolbar-button/toolbar-button.component';
import { TranslateModule } from '@ngx-translate/core';

const { encapsulation, schemas } = customElementParams;

@Component({
  selector: ToolbarButtonHelpComponent.ngSelectorName,
  templateUrl: './toolbar-button-help.component.html',
  styleUrls: ['./toolbar-button-help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  encapsulation,
  schemas,
  imports: [IonicModule, ToolbarButtonComponent, TranslateModule]
})
@CustomElement()
export class ToolbarButtonHelpComponent extends CustomElementBaseComponent {
  public static override readonly customElementName: string = 'app-toolbar-button-help';
  public static override readonly ngSelectorName: string
    = `${CustomElementBaseComponent.ngPrefix}-${ToolbarButtonHelpComponent.customElementName}`;

  @ViewChild(IonModal) modal: IonModal | null = null;

  constructor(
    ele: ElementRef,
    gsl: GlobalStyleLoader,
  ) {
    super(ele, gsl);
  }

  protected onClick(): void {
    console.log('!!! HELP');
    this.modal?.present();
  }

  cancelModal() {
    this.modal?.dismiss(null, 'cancel');
  }
}
