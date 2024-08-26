<?php

namespace App\Core\UI\Api\Controller\Trait;

use App\Core\UI\Dto\Api\Response\SuccessResponseDto;
use Symfony\Component\HttpFoundation\Response;

trait CreateSuccessViewTrait
{
    protected function createSuccessView(string $message, ?object $responseData = null): Response
    {
        return $this->json(new SuccessResponseDto($message, $responseData));
    }
}
