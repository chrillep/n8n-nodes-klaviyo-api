import type { INodeProperties } from 'n8n-workflow';
const showOnlyForForm = {
	resource: ['form'],
};
export const formDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForForm },
		options: [
			{ name: 'Get', value: 'get', description: 'Get a form by ID', action: 'Get a form' },
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get multiple forms',
				action: 'Get many forms',
			},
		],
		default: 'getMany',
	},
	{
		displayName: 'Form ID',
		name: 'formId',
		type: 'string',
		default: '',
		description: 'The unique ID of the form',
		displayOptions: { show: { resource: ['form'], operation: ['get'] } },
	},
];
