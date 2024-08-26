<?php

namespace App\Module\Custom\UI\Admin\Dto;

use DateTimeInterface;

readonly class CustomTableListItemDto
{
    public function __construct(
        public string $id,
        public string $name,
        public ?DateTimeInterface $createdAt = null,
        public ?DateTimeInterface $updatedAt = null,
    ) {
    }
}
