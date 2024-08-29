import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CustomElement, customElementParams } from '@app/core/application/custom-element/custom-element';
import CustomElementBaseComponent from '@app/core/application/custom-element/custom-element-base-component';
import GlobalStyleLoader from '@app/core/application/custom-element/global-style-loader';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule, MatSortable } from '@angular/material/sort';
import AskForTablePaginatedListQuery
  from '@app/module/custom/application/interaction/query/ask-for-table-paginated-list-query';
import PaginationRequest from '@app/core/domain/pagination/pagination-request';
import CustomTableParamsDto from '@app/module/custom/ui/dto/custom-table-params-dto';
import PaginationConst from '@app/core/domain/pagination/pagination-const';
import Pagination from '@app/core/domain/pagination/pagination';
import CustomTableListItemDto from '@app/module/custom/ui/dto/custom-table-list-item-dto';
import { MobxAngularModule, observable } from 'mobx-angular';
import { makeObservable } from 'mobx';
import { LuxonModule } from 'luxon-angular';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { LinkComponent } from '@app/shared/ui/elements/link/link.component';

const { encapsulation, schemas } = customElementParams;

@Component({
  selector: CustomTableViewComponent.ngSelectorName,
  templateUrl: './custom-table-view.component.html',
  styleUrls: ['./custom-table-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  encapsulation,
  schemas,
  imports: [
    IonicModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MobxAngularModule,
    LuxonModule,
    TranslateModule,
    MatMenu,
    MatMenuTrigger,
    LinkComponent,
  ]
})
@CustomElement()
export class CustomTableViewComponent extends CustomElementBaseComponent implements AfterViewInit {
  public static override readonly customElementName: string = 'app-custom-table-view';
  public static override readonly ngSelectorName: string
    = `${CustomElementBaseComponent.ngPrefix}-${CustomTableViewComponent.customElementName}`;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  @Input() limit: number = PaginationConst.defaultLimit;

  protected displayedColumns: string[] = ['action', 'name', 'createdAt', 'updatedAt'];
  protected dataSource: MatTableDataSource<CustomTableListItemDto> = new MatTableDataSource<CustomTableListItemDto>([]);
  @observable protected pagination?: Pagination<CustomTableListItemDto>;
  protected paginationDisabled: boolean = false;
  protected tableParams: CustomTableParamsDto = new CustomTableParamsDto('desc', 'createdAt');

  constructor(
    ele: ElementRef,
    gsl: GlobalStyleLoader,
    private readonly askForTablePaginatedListQuery: AskForTablePaginatedListQuery,
  ) {
    super(ele, gsl);
    makeObservable(this);
  }

  async ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.sort?.sort(({id: this.tableParams.sortBy, start: this.tableParams.sort}) as MatSortable);
    this.dataSource.sort = this.sort;

    await this.loadList();
  }

  protected override get useGlobalStyle() {
    return true;
  }

  protected async onSortChange(sortState: Sort) {
    this.tableParams = new CustomTableParamsDto(
      sortState.direction.length > 0 ? sortState.direction : null,
      sortState.active.length > 0 ? sortState.active : null,
    );

    await this.loadList();
  }

  protected async onPageEvent(e: PageEvent) {
    this.limit = e.pageSize;
    await this.loadList(e.pageIndex + 1);
  }

  private async loadList(page: number = 1): Promise<void> {
    this.paginationDisabled = true;

    try {
      this.pagination = await this.askForTablePaginatedListQuery.ask(
        new PaginationRequest(page, this.limit),
        this.tableParams,
      );

      this.dataSource = new MatTableDataSource<CustomTableListItemDto>(this.pagination.items);
    } catch (e) {
      this.paginationDisabled = false;
      throw e;
    }

    this.paginationDisabled = false;
  }
}
