<?php

namespace App\Core\UI\Api\Controller\Trait;

use App\Core\UI\Dto\Api\Response\ErrorResponseDto;
use Symfony\Component\HttpFoundation\Response;

trait CreateErrorViewTrait
{
    protected function createErrorView(string $error = self::COMMON_EXCEPTION_MESSAGE): Response
    {
        return $this->json(new ErrorResponseDto($error));
    }
}
