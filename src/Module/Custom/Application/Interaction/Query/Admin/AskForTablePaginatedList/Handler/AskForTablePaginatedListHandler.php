<?php

namespace App\Module\Custom\Application\Interaction\Query\Admin\AskForTablePaginatedList\Handler;

use App\Core\Application\Converter\SimpleObjectConverter;
use App\Core\Application\Pagination\AbstractPaginatedHandler;
use App\Core\Application\Pagination\PaginationFactory;
use App\Core\Domain\Pagination\Pagination;
use App\Module\Custom\Application\Interaction\Query\Admin\AskForTablePaginatedList\AskForTablePaginatedListQuery;
use App\Module\Custom\Infrastructure\Repository\SampleRepository;
use App\Module\Custom\UI\Admin\Dto\CustomTableListItemDto;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

class AskForTablePaginatedListHandler extends AbstractPaginatedHandler
{
    public function __construct(
        private readonly SampleRepository $repository,
        private readonly SimpleObjectConverter $simpleObjectConverter,
        PaginatorInterface $paginator,
        PaginationFactory $paginationFactory,
    ) {
        parent::__construct($paginator, $paginationFactory);
    }

    #[AsMessageHandler(bus: 'query_bus')]
    public function handle(AskForTablePaginatedListQuery $query): Pagination
    {
        $qb = $this->repository->createQueryBuilder('s')
            ->orderBy("s.{$query->paramsDto->sortBy}", strtoupper($query->paramsDto->sort))
        ;

        return $this->paginate($qb, $query->paginationRequest);
    }

    protected function getItems(array $items): array
    {
        return $this->simpleObjectConverter->convertAny(
            $items,
            CustomTableListItemDto::class,
            ['admin_read', 'timestampable'],
        );
    }
}
