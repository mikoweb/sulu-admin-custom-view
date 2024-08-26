<?php

namespace App\Module\Custom\UI\Admin\Dto;

use Symfony\Component\Validator\Constraints as Assert;

readonly class CustomTableParamsDto
{
    public function __construct(
        #[Assert\NotBlank]
        #[Assert\Choice(['asc', 'desc'])]
        public string $sort = 'desc',

        #[Assert\NotBlank]
        #[Assert\Choice(['name', 'createdAt', 'updatedAt'])]
        public string $sortBy = 'createdAt',
    ) {
    }
}
