import type { INodeProperties } from 'n8n-workflow';
const showOnlyForCustomMetric = {
	resource: ['customMetric'],
};
export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForCustomMetric },
		options: [
			{ name: 'Get', value: 'get', description: 'Get a custom metric by ID', action: 'Get a custom metric' },
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get multiple custom metrics',
				action: 'Get many custom metrics',
			},
		],
		default: 'getMany',
	},
	{
		displayName: 'Metric ID',
		name: 'id',
		type: 'string',
		default: '',
		description: 'The unique ID of the custom metric',
		displayOptions: { show: { resource: ['customMetric'], operation: ['get'] } },
	},
];
