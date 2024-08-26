<?php

namespace App\Core\UI\Api\Controller;

use App\Core\UI\Api\Controller\Trait\CreateErrorViewTrait;
use App\Core\UI\Api\Controller\Trait\CreateSuccessViewTrait;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

abstract class AbstractRestController extends AbstractController
{
    use CreateSuccessViewTrait;
    use CreateErrorViewTrait;

    protected const string COMMON_EXCEPTION_MESSAGE = 'Something went wrong...';
}
