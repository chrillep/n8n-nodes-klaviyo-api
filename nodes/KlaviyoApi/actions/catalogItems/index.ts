import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCatalogItems = {
	resource: ['catalogItems'],
};

export const catalogItemsDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForCatalogItems },
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a catalog item',
				action: 'Create a catalog item',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a catalog item',
				action: 'Delete a catalog item',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a catalog item by ID',
				action: 'Get a catalog item',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get multiple catalog items',
				action: 'Get many catalog items',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a catalog item',
				action: 'Update a catalog item',
			},
		],
		default: 'getMany',
	},
	{
		displayName: 'Item ID',
		name: 'id',
		type: 'string',
		default: '',
		description: 'The unique ID of the catalog item',
		displayOptions: {
			show: { resource: ['catalogItems'], operation: ['get', 'delete', 'update'] },
		},
	},
	{
		displayName: 'Item Name',
		name: 'name',
		type: 'string',
		default: '',
		description: 'The name of the catalog item',
		displayOptions: { show: { resource: ['catalogItems'], operation: ['create', 'update'] } },
	},
];
