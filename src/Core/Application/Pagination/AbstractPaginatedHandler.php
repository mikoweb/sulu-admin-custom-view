<?php

namespace App\Core\Application\Pagination;

use App\Core\Domain\Pagination\Pagination;
use App\Core\Domain\Pagination\PaginationRequest;
use Knp\Bundle\PaginatorBundle\Pagination\SlidingPagination;
use Knp\Component\Pager\PaginatorInterface;

abstract class AbstractPaginatedHandler
{
    public function __construct(
        protected PaginatorInterface $paginator,
        protected PaginationFactory $paginationFactory,
    ) {
    }

    protected function paginate(mixed $queryBuilder, PaginationRequest $request): Pagination
    {
        /** @var SlidingPagination<int, object> $pagination */
        $pagination = $this->paginator->paginate($queryBuilder, $request->page, $request->limit);
        $items = $this->getItems((array) $pagination->getItems());

        return $this->paginationFactory->create($pagination, $items);
    }

    /**
     * @param object[] $items
     *
     * @return object[]
     */
    abstract protected function getItems(array $items): array;
}
