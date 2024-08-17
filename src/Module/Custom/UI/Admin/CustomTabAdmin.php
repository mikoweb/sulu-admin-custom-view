<?php

namespace App\Module\Custom\UI\Admin;

use App\Module\Custom\Domain\Admin\Resource\CustomTabResource;
use Sulu\Bundle\AdminBundle\Admin\Admin;
use Sulu\Bundle\AdminBundle\Admin\View\FormViewBuilder;
use Sulu\Bundle\AdminBundle\Admin\View\ListViewBuilderInterface;
use Sulu\Bundle\AdminBundle\Admin\View\ResourceTabViewBuilderInterface;
use Sulu\Bundle\AdminBundle\Admin\View\ViewBuilderFactoryInterface;
use Sulu\Bundle\AdminBundle\Admin\View\ViewBuilderInterface;
use Sulu\Bundle\AdminBundle\Admin\View\ViewCollection;
use Sulu\Component\Security\Authorization\PermissionTypes;
use Sulu\Component\Security\Authorization\SecurityCheckerInterface;

class CustomTabAdmin extends Admin
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
        $viewCollection->add($this->createEditTab2View());
    }

    private function createListView(): ListViewBuilderInterface
    {
        $view = $this->viewBuilderFactory->createListViewBuilder(
            CustomTabResource::VIEW_LIST_NAME,
            CustomTabResource::VIEW_LIST_PATH
        )
            ->setResourceKey(CustomTabResource::RESOURCE_KEY)
            ->setListKey(CustomTabResource::RESOURCE_KEY)
            ->addListAdapters(['table'])
            ->setTitle(CustomTabResource::VIEW_LIST_TITLE);

        if ($this->hasPermission(PermissionTypes::EDIT)) {
            $view->setEditView(CustomTabResource::VIEW_EDIT_NAME);
        }

        return $view;
    }

    private function createEditTabView(): ResourceTabViewBuilderInterface
    {
        return $this->viewBuilderFactory->createResourceTabViewBuilder(
            CustomTabResource::VIEW_EDIT_NAME,
            CustomTabResource::VIEW_EDIT_PATH
        )
            ->setResourceKey(CustomTabResource::RESOURCE_KEY)
            ->setBackView(CustomTabResource::VIEW_LIST_NAME);
    }

    private function createEditFormView(): ViewBuilderInterface
    {
        /** @var FormViewBuilder $view */
        $view = $this->viewBuilderFactory->createFormViewBuilder(
            CustomTabResource::VIEW_EDIT_TAB1_NAME,
            CustomTabResource::VIEW_EDIT_TAB1_PATH,
        )
            ->setResourceKey(CustomTabResource::RESOURCE_KEY)
            ->setFormKey(CustomTabResource::EDIT_FORM_TEMPLATE)
            ->setTabTitle(CustomTabResource::VIEW_EDIT_TAB1_TITLE)
            ->setParent(CustomTabResource::VIEW_EDIT_NAME);

        $view->addToolbarActions([]);

        return $view;
    }

    private function createEditTab2View(): ViewBuilderInterface
    {
        /** @var FormViewBuilder $view */
        $view = $this->viewBuilderFactory->createFormViewBuilder(
            CustomTabResource::VIEW_EDIT_TAB2_NAME,
            CustomTabResource::VIEW_EDIT_TAB2_PATH,
        )
            ->setResourceKey(CustomTabResource::RESOURCE_KEY)
            ->setTabTitle(CustomTabResource::VIEW_EDIT_TAB2_TITLE)
            ->setFormKey(CustomTabResource::EDIT_FORM_TAB2_TEMPLATE)
            ->setParent(CustomTabResource::VIEW_EDIT_NAME);

        $view->addToolbarActions([]);

        return $view;
    }

    private function hasPermission(string $permission): bool
    {
        return $this->securityChecker->hasPermission(CustomTabResource::SECURITY_CONTEXT, $permission);
    }

    public function getSecurityContexts(): array
    {
        return [
            self::SULU_ADMIN_SECURITY_SYSTEM => [
                CustomTabResource::SECURITY_GROUP => [
                    CustomTabResource::SECURITY_CONTEXT => [
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
