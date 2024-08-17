<?php

namespace App\Module\Custom\Domain\Admin\Resource;

final class CustomTabResource
{
    public const string RESOURCE_KEY = 'custom_sample';
    public const string SECURITY_GROUP = 'Custom';
    public const string SECURITY_CONTEXT = 'sulu.custom.tab';

    public const string MENU_NAME = 'admin.custom_tab.menu_name';

    public const string VIEW_LIST_TITLE = 'admin.custom_tab.list_title';
    public const string VIEW_LIST_NAME = 'admin.custom_tab.list';
    public const string VIEW_LIST_PATH = '/custom/sample';

    public const string EDIT_FORM_TEMPLATE = 'blank';
    public const string VIEW_EDIT_NAME = 'admin.custom_tab.edit';
    public const string VIEW_EDIT_PATH = '/custom/sample/:id';
    public const string VIEW_EDIT_TAB1_NAME = 'admin.custom_tab.edit.tab1';
    public const string VIEW_EDIT_TAB1_PATH = '/tab1';
    public const string VIEW_EDIT_TAB1_TITLE = 'admin.custom_tab.edit_tab1_title';

    public const string EDIT_FORM_TAB2_TEMPLATE = 'blank';
    public const string VIEW_EDIT_TAB2_NAME = 'admin.custom_tab.edit.tab2';
    public const string VIEW_EDIT_TAB2_PATH = '/tab2';
    public const string VIEW_EDIT_TAB2_TITLE = 'admin.custom_tab.edit_tab2_title';
}
