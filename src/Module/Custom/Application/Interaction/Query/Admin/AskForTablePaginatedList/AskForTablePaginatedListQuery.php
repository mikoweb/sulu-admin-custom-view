<?php

namespace App\Module\Custom\Application\Interaction\Query\Admin\AskForTablePaginatedList;

use App\Core\Domain\Pagination\PaginationRequest;
use App\Core\Infrastructure\Interaction\Query\QueryInterface;
use App\Module\Custom\UI\Admin\Dto\CustomTableParamsDto;

readonly class AskForTablePaginatedListQuery implements QueryInterface
{
    public function __construct(
        public PaginationRequest $paginationRequest,
        public CustomTableParamsDto $paramsDto,
    ) {
    }
}
