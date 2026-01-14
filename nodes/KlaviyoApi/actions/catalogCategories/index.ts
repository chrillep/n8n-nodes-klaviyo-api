import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCatalogCategories = {
	resource: ['catalogCategories'],
};

export const catalogCategoriesDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForCatalogCategories },
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a catalog category',
				action: 'Create a catalog category',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a catalog category',
				action: 'Delete a catalog category',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a catalog category by ID',
				action: 'Get a catalog category',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get multiple catalog categories',
				action: 'Get many catalog categories',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a catalog category',
				action: 'Update a catalog category',
			},
		],
		default: 'getMany',
	},
	{
		displayName: 'Category ID',
		name: 'id',
		type: 'string',
		default: '',
		description: 'The unique ID of the catalog category',
		displayOptions: {
			show: { resource: ['catalogCategories'], operation: ['get', 'delete', 'update'] },
		},
	},
	{
		displayName: 'Category Name',
		name: 'name',
		type: 'string',
		default: '',
		description: 'The name of the catalog category',
		displayOptions: { show: { resource: ['catalogCategories'], operation: ['create', 'update'] } },
	},
];
