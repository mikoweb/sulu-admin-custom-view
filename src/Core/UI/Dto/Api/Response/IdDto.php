<?php

namespace App\Core\UI\Dto\Api\Response;

readonly class IdDto
{
    public function __construct(
        public string $id,
    ) {
    }
}
