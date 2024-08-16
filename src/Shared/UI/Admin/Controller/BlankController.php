<?php

namespace App\Shared\UI\Admin\Controller;

use App\Core\UI\Admin\Controller\AbstractAdminRestController;
use Sulu\Component\Rest\ListBuilder\CollectionRepresentation;
use Symfony\Component\HttpFoundation\Response;

class BlankController extends AbstractAdminRestController
{
    public function index(): Response
    {
        $listRepresentation = new CollectionRepresentation([], 'blank');

        return $this->handleView($this->view($listRepresentation));
    }

    public function show(string $id): Response
    {
        return $this->json([]);
    }
}
