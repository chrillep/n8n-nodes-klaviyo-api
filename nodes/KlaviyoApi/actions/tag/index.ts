import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTag = {
	resource: ['tag'],
};

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForTag },
		options: [
			{ name: 'Create', value: 'create', description: 'Create a new tag', action: 'Create a tag' },
			{ name: 'Delete', value: 'delete', description: 'Delete a tag', action: 'Delete a tag' },
			{ name: 'Get', value: 'get', description: 'Get a tag by ID', action: 'Get a tag' },
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get multiple tags',
				action: 'Get many tags',
			},
			{ name: 'Update', value: 'update', description: 'Update a tag', action: 'Update a tag' },
		],
		default: 'getMany',
	},
	{
		displayName: 'Tag ID',
		name: 'id',
		type: 'string',
		default: '',
		description: 'The unique ID of the tag',
		displayOptions: { show: { resource: ['tag'], operation: ['get', 'delete', 'update'] } },
	},
	{
		displayName: 'Tag Name',
		name: 'tagName',
		type: 'string',
		default: '',
		description: 'The name of the tag',
		displayOptions: { show: { resource: ['tag'], operation: ['create', 'update'] } },
	},
];
