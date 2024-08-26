<?php

namespace App\Core\Domain\Pagination;

use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Attribute\Ignore;

final readonly class Pagination
{
    public function __construct(
        /**
         * @var object[]
         */
        #[Groups(['pagination'])]
        public array $items,

        /**
         * @var object[]
         */
        #[Ignore]
        public array $rawItems,
        #[Groups(['pagination'])]
        public int $currentPageNumber,
        #[Groups(['pagination'])]
        public int $pageCount,
        #[Groups(['pagination'])]
        public int $itemNumberPerPage,
        #[Groups(['pagination'])]
        public int $totalItemCount,
        #[Groups(['pagination'])]
        public int $offset,
    ) {
    }
}
