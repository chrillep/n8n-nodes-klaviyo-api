import type { INodeProperties } from 'n8n-workflow';

const showOnlyForFlow = {
	resource: ['flow'],
};

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForFlow },
		options: [
			{ name: 'Get', value: 'get', description: 'Get a flow by ID', action: 'Get a flow' },
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get multiple flows',
				action: 'Get many flows',
			},
			{
				name: 'Update Status',
				value: 'updateStatus',
				description: 'Update flow status',
				action: 'Update flow status',
			},
		],
		default: 'get',
	},
	{
		displayName: 'Flow ID',
		name: 'flowId',
		type: 'string',
		default: '',
		description: 'The unique ID of the flow',
		displayOptions: { show: { resource: ['flow'], operation: ['get', 'updateStatus'] } },
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		options: [
			{ name: 'Draft', value: 'draft' },
			{ name: 'Manual', value: 'manual' },
			{ name: 'Live', value: 'live' },
		],
		default: 'draft',
		description: 'Flow status',
		displayOptions: { show: { resource: ['flow'], operation: ['updateStatus'] } },
	},
];
