<?php

namespace App\Core\UI\Dto\Api\Response\ApiDoc;

/**
 * This class only for OpenApi\Attributes!
 */
final class PaginationApiModel
{
    public function __construct(
        public int $currentPageNumber,
        public int $pageCount,
        public int $itemNumberPerPage,
        public int $totalItemCount,
        public int $offset,
    ) {
    }
}
