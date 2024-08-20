import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CustomElement, customElementParams } from '@app/core/application/custom-element/custom-element';
import CustomElementBaseComponent from '@app/core/application/custom-element/custom-element-base-component';
import GlobalStyleLoader from '@app/core/application/custom-element/global-style-loader';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import MessageService from '@app/core/application/message/message-service';
import TranslatorService from '@app/core/application/translator/TranslatorService';
import { TranslateModule } from '@ngx-translate/core';

const { encapsulation, schemas } = customElementParams;

@Component({
  selector: CustomTab1ViewComponent.ngSelectorName,
  templateUrl: './custom-tab1-view.component.html',
  styleUrls: ['./custom-tab1-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  encapsulation,
  schemas,
  imports: [
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
  ],
})
@CustomElement()
export class CustomTab1ViewComponent extends CustomElementBaseComponent implements OnInit {
  public static override readonly customElementName: string = 'app-custom-tab1-view';
  public static override readonly ngSelectorName: string
    = `${CustomElementBaseComponent.ngPrefix}-${CustomTab1ViewComponent.customElementName}`;

  protected readonly form: FormGroup = new FormGroup({
    text: new FormControl(),
    number: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
    tel: new FormControl(),
  });

  constructor(
    ele: ElementRef,
    gsl: GlobalStyleLoader,
    private readonly messageService: MessageService,
    private readonly translator: TranslatorService,
  ) {
    super(ele, gsl);
  }

  ngOnInit(): void {
    this.initFormValues();
  }

  protected override get useGlobalStyle() {
    return true;
  }

  protected initFormValues(): void {
    this.form.get('number')?.setValue(10);
  }

  protected async onSubmit(): Promise<void> {
    const message: string = await this.translator.get('custom.tab1.save_message');
    await this.messageService.createSuccess({message});
  }
}
