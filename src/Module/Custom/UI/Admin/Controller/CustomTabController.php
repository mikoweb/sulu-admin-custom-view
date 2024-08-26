<?php

namespace App\Module\Custom\UI\Admin\Controller;

use App\Core\UI\Admin\Controller\AbstractAdminRestController;
use App\Module\Custom\Domain\Admin\Resource\CustomTabResource;
use App\Module\Custom\Domain\Entity\Sample;
use OpenApi\Attributes as OA;
use Sulu\Component\Rest\ListBuilder\Doctrine\DoctrineListBuilderFactoryInterface;
use Sulu\Component\Rest\ListBuilder\ListBuilderInterface;
use Sulu\Component\Rest\ListBuilder\Metadata\FieldDescriptorFactoryInterface;
use Sulu\Component\Rest\ListBuilder\PaginatedRepresentation;
use Sulu\Component\Rest\RestHelperInterface;
use Sulu\Component\Security\SecuredControllerInterface;
use Symfony\Component\HttpFoundation\Response;

class CustomTabController extends AbstractAdminRestController implements SecuredControllerInterface
{
    public function __construct(
        private readonly FieldDescriptorFactoryInterface $fieldDescriptorFactory,
        private readonly DoctrineListBuilderFactoryInterface $listBuilderFactory,
        private readonly RestHelperInterface $restHelper,
    ) {
    }

    public function getSecurityContext(): string
    {
        return CustomTabResource::SECURITY_CONTEXT;
    }

    #[OA\Tag(name: 'Custom Tab')]
    public function index(): Response
    {
        $fieldDescriptors = $this->fieldDescriptorFactory->getFieldDescriptors(CustomTabResource::RESOURCE_KEY);
        $listBuilder = $this->listBuilderFactory
            ->create(Sample::class)
            // @phpstan-ignore-next-line
            ->sort($fieldDescriptors['createdAt'], ListBuilderInterface::SORTORDER_DESC)
        ;

        // @phpstan-ignore-next-line
        $this->restHelper->initializeListBuilder($listBuilder, $fieldDescriptors);

        $listRepresentation = new PaginatedRepresentation(
            $listBuilder->execute() ?? [],
            CustomTabResource::RESOURCE_KEY,
            $listBuilder->getCurrentPage(),
            $listBuilder->getLimit() ?? 10,
            $listBuilder->count(),
        );

        return $this->handleView($this->view($listRepresentation));
    }

    #[OA\Tag(name: 'Custom Tab')]
    public function show(Sample $sample): Response
    {
        return $this->json($sample, context: ['groups' => ['admin_read']]);
    }
}
