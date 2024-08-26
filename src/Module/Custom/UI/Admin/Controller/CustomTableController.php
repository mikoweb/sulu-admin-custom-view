<?php

namespace App\Module\Custom\UI\Admin\Controller;

use App\Core\Domain\Pagination\PaginationRequest;
use App\Core\Infrastructure\Bus\QueryBusInterface;
use App\Core\UI\Admin\Controller\AbstractAdminRestController;
use App\Core\UI\Dto\Api\Response\ApiDoc\PaginationApiModel;
use App\Module\Custom\Application\Interaction\Query\Admin\AskForTablePaginatedList\AskForTablePaginatedListQuery;
use App\Module\Custom\Domain\Admin\Resource\CustomTableResource;
use App\Module\Custom\UI\Admin\Dto\CustomTableListItemDto;
use App\Module\Custom\UI\Admin\Dto\CustomTableParamsDto;
use Nelmio\ApiDocBundle\Annotation\Model;
use OpenApi\Attributes as OA;
use Sulu\Component\Security\SecuredControllerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapQueryString;

class CustomTableController extends AbstractAdminRestController implements SecuredControllerInterface
{
    public function getSecurityContext(): string
    {
        return CustomTableResource::SECURITY_CONTEXT;
    }

    #[OA\Tag(name: 'Custom Table')]
    #[OA\Parameter(name: 'page', in: 'query')]
    #[OA\Parameter(name: 'limit', in: 'query')]
    #[OA\Response(
        response: 200,
        description: 'Paginated list of "Custom Table".',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'items', type: 'array', items: new OA\Items(
                    ref: new Model(type: CustomTableListItemDto::class)
                )),
            ],
            type: 'object',
            anyOf: [new OA\Schema(ref: new Model(type: PaginationApiModel::class))]
        )
    )]
    public function index(
        Request $request,
        QueryBusInterface $queryBus,
        #[MapQueryString] ?CustomTableParamsDto $paramsDto,
    ): Response {
        return $this->json($queryBus->dispatch(new AskForTablePaginatedListQuery(
            PaginationRequest::createFromRequest($request),
            $paramsDto ?? new CustomTableParamsDto(),
        )));
    }
}
