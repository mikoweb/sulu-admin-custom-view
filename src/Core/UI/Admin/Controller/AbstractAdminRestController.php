<?php

namespace App\Core\UI\Admin\Controller;

use FOS\RestBundle\Controller\AbstractFOSRestController;
use Sulu\Component\Rest\RestControllerTrait;

abstract class AbstractAdminRestController extends AbstractFOSRestController
{
    use RestControllerTrait;
}
