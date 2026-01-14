import type { INodeProperties } from 'n8n-workflow';
const showOnlyForTemplate = {
	resource: ['template'],
};
export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForTemplate },
		options: [
			{ name: 'Get', value: 'get', description: 'Get a template by ID', action: 'Get a template' },
			{ name: 'Get Many', value: 'getMany', description: 'Get multiple templates', action: 'Get many templates' },
		],
		default: 'getMany',
	},
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		default: '',
		description: 'The unique ID of the template',
		displayOptions: { show: { resource: ['template'], operation: ['get'] } },
	},
];
