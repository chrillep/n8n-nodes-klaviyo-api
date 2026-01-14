import type { INodeProperties } from 'n8n-workflow';
const showOnlyForFlowMessage = {
	resource: ['flowMessage'],
};
export const flowMessageDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForFlowMessage },
		options: [
			{ name: 'Get', value: 'get', description: 'Get a flow message by ID', action: 'Get a flow message' },
			{ name: 'Get Many', value: 'getMany', description: 'Get multiple flow messages', action: 'Get many flow messages' },
		],
		default: 'getMany',
	},
	{
		displayName: 'Message ID',
		name: 'id',
		type: 'string',
		default: '',
		description: 'The unique ID of the flow message',
		displayOptions: { show: { resource: ['flowMessage'], operation: ['get'] } },
	},
];
