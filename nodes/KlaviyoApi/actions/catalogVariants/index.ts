import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCatalogVariants = {
	resource: ['catalogVariants'],
};

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForCatalogVariants },
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a catalog variant',
				action: 'Create a catalog variant',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a catalog variant',
				action: 'Delete a catalog variant',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a catalog variant by ID',
				action: 'Get a catalog variant',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get multiple catalog variants',
				action: 'Get many catalog variants',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a catalog variant',
				action: 'Update a catalog variant',
			},
		],
		default: 'getMany',
	},
	{
		displayName: 'Variant ID',
		name: 'id',
		type: 'string',
		default: '',
		description: 'The unique ID of the catalog variant',
		displayOptions: {
			show: { resource: ['catalogVariants'], operation: ['get', 'delete', 'update'] },
		},
	},
	{
		displayName: 'Variant Name',
		name: 'name',
		type: 'string',
		default: '',
		description: 'The name of the catalog variant',
		displayOptions: { show: { resource: ['catalogVariants'], operation: ['create', 'update'] } },
	},
];
