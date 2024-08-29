<?php

namespace App\Module\Custom\UI\Admin;

use App\Module\Custom\Domain\Admin\Resource\CustomTableResource;
use Sulu\Bundle\AdminBundle\Admin\Admin;
use Sulu\Bundle\AdminBundle\Admin\View\FormViewBuilder;
use Sulu\Bundle\AdminBundle\Admin\View\ListViewBuilderInterface;
use Sulu\Bundle\AdminBundle\Admin\View\ResourceTabViewBuilderInterface;
use Sulu\Bundle\AdminBundle\Admin\View\ViewBuilderFactoryInterface;
use Sulu\Bundle\AdminBundle\Admin\View\ViewBuilderInterface;
use Sulu\Bundle\AdminBundle\Admin\View\ViewCollection;
use Sulu\Component\Security\Authorization\PermissionTypes;
use Sulu\Component\Security\Authorization\SecurityCheckerInterface;

class CustomTableAdmin extends Admin
{
    public function __construct(
        private readonly ViewBuilderFactoryInterface $viewBuilderFactory,
        private readonly SecurityCheckerInterface $securityChecker,
    ) {
    }

    public function configureViews(ViewCollection $viewCollection): void
    {
        $viewCollection->add($this->createListView());
        $viewCollection->add($this->createEditTabView());
        $viewCollection->add($this->createEditFormView());
    }

    private function createListView(): ListViewBuilderInterface
    {
        $view = $this->viewBuilderFactory->createListViewBuilder(
            CustomTableResource::VIEW_LIST_NAME,
            CustomTableResource::VIEW_LIST_PATH
        )
            ->setResourceKey(CustomTableResource::RESOURCE_KEY)
            ->setListKey(CustomTableResource::VIEW_LIST_TEMPLATE)
            ->addListAdapters(['table'])
            ->setTitle(CustomTableResource::VIEW_LIST_TITLE);

        if ($this->hasPermission(PermissionTypes::EDIT)) {
            $view->setEditView(CustomTableResource::VIEW_EDIT_NAME);
        }

        return $view;
    }

    private function createEditTabView(): ResourceTabViewBuilderInterface
    {
        return $this->viewBuilderFactory->createResourceTabViewBuilder(
            CustomTableResource::VIEW_EDIT_NAME,
            CustomTableResource::VIEW_EDIT_PATH
        )
            ->setResourceKey(CustomTableResource::RESOURCE_DETAILS_KEY)
            ->setBackView(CustomTableResource::VIEW_LIST_NAME);
    }

    private function createEditFormView(): ViewBuilderInterface
    {
        /** @var FormViewBuilder $view */
        $view = $this->viewBuilderFactory->createFormViewBuilder(
            CustomTableResource::VIEW_EDIT_DETAILS_NAME,
            CustomTableResource::VIEW_EDIT_DETAILS_PATH,
        )
            ->setResourceKey(CustomTableResource::RESOURCE_DETAILS_KEY)
            ->setFormKey(CustomTableResource::EDIT_FORM_TEMPLATE)
            ->setTabTitle('sulu_admin.details')
            ->setParent(CustomTableResource::VIEW_EDIT_NAME);

        $view->addToolbarActions([]);

        return $view;
    }

    private function hasPermission(string $permission): bool
    {
        return $this->securityChecker->hasPermission(CustomTableResource::SECURITY_CONTEXT, $permission);
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
