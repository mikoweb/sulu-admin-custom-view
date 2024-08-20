// [ external elements ]

// [ internal elements ]

// -- shared elements

import { ToolbarButtonComponent } from '@app/shared/ui/elements/toolbar/toolbar-button/toolbar-button.component';
ToolbarButtonComponent.register();

import {
  ToolbarButtonHelpComponent
} from '@app/shared/ui/elements/toolbar/toolbar-button-help/toolbar-button-help.component';
ToolbarButtonHelpComponent.register();

// -- custom module

import { CustomTab1ViewComponent } from '@app/module/custom/ui/view/custom-tab1-view/custom-tab1-view.component';
CustomTab1ViewComponent.register();

import { CustomTab2ViewComponent } from '@app/module/custom/ui/view/custom-tab2-view/custom-tab2-view.component';
CustomTab2ViewComponent.register();
