import type { INodeProperties } from 'n8n-workflow';

const showOnlyForMetric = {
	resource: ['metric'],
};

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForMetric },
		options: [
			{ name: 'Get', value: 'get', description: 'Get a metric by ID', action: 'Get a metric' },
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get multiple metrics',
				action: 'Get many metrics',
			},
			{
				name: 'Query Aggregates',
				value: 'queryAggregates',
				description: 'Query metric aggregates for reporting',
				action: 'Query metric aggregates',
			},
		],
		default: 'getMany',
	},
	{
		displayName: 'Metric ID',
		name: 'metricId',
		type: 'string',
		default: '',
		description: 'The unique ID of the metric',
		displayOptions: { show: { resource: ['metric'], operation: ['get', 'queryAggregates'] } },
	},
];
