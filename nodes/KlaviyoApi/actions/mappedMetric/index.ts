import type { INodeProperties } from 'n8n-workflow';

const showOnlyForMappedMetric = {
	resource: ['mappedMetric'],
};

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForMappedMetric },
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a mapped metric by ID',
				action: 'Get a mapped metric',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get multiple mapped metrics',
				action: 'Get many mapped metrics',
			},
		],
		default: 'getMany',
	},
	{
		displayName: 'Metric ID',
		name: 'id',
		type: 'string',
		default: '',
		description: 'The unique ID of the mapped metric',
		displayOptions: { show: { resource: ['mappedMetric'], operation: ['get'] } },
	},
];
