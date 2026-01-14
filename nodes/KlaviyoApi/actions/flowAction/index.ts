import type { INodeProperties } from 'n8n-workflow';

const showOnlyForFlowAction = {
	resource: ['flowAction'],
};

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForFlowAction },
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a flow action by ID',
				action: 'Get a flow action',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get multiple flow actions',
				action: 'Get many flow actions',
			},
		],
		default: 'getMany',
	},
	{
		displayName: 'Action ID',
		name: 'id',
		type: 'string',
		default: '',
		description: 'The unique ID of the flow action',
		displayOptions: { show: { resource: ['flowAction'], operation: ['get'] } },
	},
];
