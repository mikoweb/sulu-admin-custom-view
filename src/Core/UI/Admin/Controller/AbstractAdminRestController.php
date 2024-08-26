<?php

namespace App\Core\UI\Admin\Controller;

use App\Core\UI\Api\Controller\Trait\CreateErrorViewTrait;
use App\Core\UI\Api\Controller\Trait\CreateSuccessViewTrait;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Sulu\Component\Rest\RestControllerTrait;

abstract class AbstractAdminRestController extends AbstractFOSRestController
{
    use RestControllerTrait;
    use CreateSuccessViewTrait;
    use CreateErrorViewTrait;

    protected const string COMMON_EXCEPTION_MESSAGE = 'Something went wrong...';
}
