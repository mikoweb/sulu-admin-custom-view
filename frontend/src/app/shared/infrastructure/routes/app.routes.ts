import { inject } from '@angular/core';
import Router from '@app/core/application/router/router';
import pagesRoutes from '@app/shared/infrastructure/routes/pages.routes';

export default function routesLoader() {
  const router = inject(Router);

  pagesRoutes(router);
}
