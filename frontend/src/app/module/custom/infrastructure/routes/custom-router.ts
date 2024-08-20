import { Injectable } from '@angular/core';
import CustomTableController from '@app/module/custom/ui/controller/custom-table-controller';
import CustomTabController from '@app/module/custom/ui/controller/custom-tab-controller';
import Router from '@app/core/application/router/router';
import CustomDashboardController from '@app/module/custom/ui/controller/custom-dashboard-controller';

@Injectable({
  providedIn: 'root',
})
export default class CustomRouter {
  constructor(
    private readonly router: Router,
    private readonly customDashboard: CustomDashboardController,
    private readonly customTabController: CustomTabController,
    private readonly customTableController: CustomTableController,
  ) {
  }

  public init(): void {
    this.router.define('/', () => {
      this.customDashboard.showDashboard();
    });

    this.router.define('/custom/sample/:id/tab1', (path: string, params: any) => {
      this.customTabController.showTab1(params.id);
    });

    this.router.define('/custom/sample/:id/tab2', (path: string, params: any) => {
      this.customTabController.showTab2(params.id);
    });

    this.router.define('/custom/table', () => {
      this.customTableController.showTable();
    });
  }
}
