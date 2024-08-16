<?php

namespace App\Module\Custom\UI\Admin;

use App\Module\Custom\Domain\Admin\Resource\CustomTableResource;
use Sulu\Bundle\AdminBundle\Admin\Admin;
use Sulu\Bundle\AdminBundle\Admin\View\ListViewBuilderInterface;
use Sulu\Bundle\AdminBundle\Admin\View\ViewBuilderFactoryInterface;
use Sulu\Bundle\AdminBundle\Admin\View\ViewCollection;
use Sulu\Component\Security\Authorization\PermissionTypes;

class CustomTableAdmin extends Admin
{
    public function __construct(
        private readonly ViewBuilderFactoryInterface $viewBuilderFactory,
    ) {
    }

    public function configureViews(ViewCollection $viewCollection): void
    {
        $viewCollection->add($this->createListView());
    }

    private function createListView(): ListViewBuilderInterface
    {
        return $this->viewBuilderFactory->createListViewBuilder(
            CustomTableResource::VIEW_LIST_NAME,
            CustomTableResource::VIEW_LIST_PATH
        )
            ->setResourceKey(CustomTableResource::RESOURCE_KEY)
            ->setListKey(CustomTableResource::VIEW_LIST_TEMPLATE)
            ->addListAdapters(['table'])
            ->setTitle(CustomTableResource::VIEW_LIST_TITLE);
    }

    public function getSecurityContexts(): array
    {
        return [
            self::SULU_ADMIN_SECURITY_SYSTEM => [
                CustomTableResource::SECURITY_GROUP => [
                    CustomTableResource::SECURITY_CONTEXT => [
                        PermissionTypes::VIEW,
                        PermissionTypes::ADD,
                        PermissionTypes::EDIT,
                        PermissionTypes::DELETE,
                    ],
                ],
            ],
        ];
    }
}
