<?php

namespace App\Module\Custom\UI\Admin;

use App\Module\Custom\Domain\Admin\Resource\CustomResource;
use App\Module\Custom\Domain\Admin\Resource\CustomTableResource;
use Sulu\Bundle\AdminBundle\Admin\Admin;
use Sulu\Bundle\AdminBundle\Admin\Navigation\NavigationItem;
use Sulu\Bundle\AdminBundle\Admin\Navigation\NavigationItemCollection;
use Sulu\Component\Security\Authorization\PermissionTypes;
use Sulu\Component\Security\Authorization\SecurityCheckerInterface;

class MenuAdmin extends Admin
{
    public function __construct(
        private readonly SecurityCheckerInterface $securityChecker,
    ) {
    }

    public function configureNavigationItems(NavigationItemCollection $navigationItemCollection): void
    {
        $custom = new NavigationItem(CustomResource::MENU_NAME);
        $custom->setIcon(CustomResource::MENU_ICON);
        $custom->setPosition(CustomResource::MENU_POSITION);

        $navigationItemCollection->add($custom);

        if ($this->securityChecker->hasPermission(CustomTableResource::SECURITY_CONTEXT, PermissionTypes::VIEW)) {
            $table = new NavigationItem(CustomTableResource::MENU_NAME);
            $table->setView(CustomTableResource::VIEW_LIST_NAME);
            $custom->addChild($table);
        }
    }
}
