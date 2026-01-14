import type { INodeProperties } from 'n8n-workflow';
import { getEventIdProperty, getProfileIdProperty } from '../../shared/descriptions';

const showOnlyForEvent = {
	resource: ['event'],
};

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForEvent },
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new event',
				action: 'Create an event',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an event by ID',
				action: 'Get an event',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get multiple events',
				action: 'Get many events',
			},
		],
		default: 'create',
	},
	{
		...getEventIdProperty(),
		displayOptions: { show: { resource: ['event'], operation: ['get'] } },
	},
	{
		...getProfileIdProperty(),
		displayOptions: { show: { resource: ['event'], operation: ['create'] } },
	},
	{
		displayName: 'Metric Name',
		name: 'metricName',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the metric to track',
		displayOptions: { show: { resource: ['event'], operation: ['create'] } },
	},
	{
		displayName: 'Event Properties',
		name: 'eventProperties',
		type: 'json',
		default: '{}',
		description: 'Event properties as JSON',
		displayOptions: { show: { resource: ['event'], operation: ['create'] } },
	},
];
