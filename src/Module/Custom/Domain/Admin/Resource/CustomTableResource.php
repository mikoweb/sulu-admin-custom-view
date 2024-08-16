<?php

namespace App\Module\Custom\Domain\Admin\Resource;

final class CustomTableResource
{
    public const string RESOURCE_KEY = 'blank';
    public const string SECURITY_GROUP = 'Custom';
    public const string SECURITY_CONTEXT = 'sulu.custom.table';

    public const string MENU_NAME = 'admin.custom_table.menu_name';

    public const string VIEW_LIST_TEMPLATE = 'blank_table';
    public const string VIEW_LIST_TITLE = 'admin.custom_table.list_title';
    public const string VIEW_LIST_NAME = 'admin.custom_table.list';
    public const string VIEW_LIST_PATH = '/custom/table';
}
