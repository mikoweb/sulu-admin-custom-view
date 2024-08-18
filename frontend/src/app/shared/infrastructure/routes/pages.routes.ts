import Router from '@app/core/application/router/router';
import CustomTableController from '@app/module/custom/ui/controller/custom-table-controller';
import CustomTabController from '@app/module/custom/ui/controller/custom-tab-controller';

export default function pagesRoutes(router: Router) {
  router.define('/custom/sample/:id/tab1', (path: string, params: any) => {
    CustomTabController.showTab1(params.id);
  });

  router.define('/custom/sample/:id/tab2', (path: string, params: any) => {
    CustomTabController.showTab2(params.id);
  });

  router.define('/custom/table', () => {
    CustomTableController.showTable();
  });
}
