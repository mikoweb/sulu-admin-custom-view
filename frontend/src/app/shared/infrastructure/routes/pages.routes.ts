import Router from '@app/core/application/router/router';
import SuluLayout from '@app/shared/ui/sulu/sulu-layout';

export default function pagesRoutes(router: Router) {
  router.define('/custom/sample/:id/tab1', (path: string, params: any) => {
    SuluLayout.updateTabView(`<p>Custom Tab 1</p><p>${params.id}</p>`);
  });

  router.define('/custom/sample/:id/tab2', (path: string, params: any) => {
    SuluLayout.updateTabView(`<p>Custom Tab 2</p><p>${params.id}</p>`);
  });

  router.define('/custom/table', (path: string) => {
    SuluLayout.updateTableView(`<h1>Custom Table</h1><p>Custom Table</p><p>${path}</p>`);
  });
}
