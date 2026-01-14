import type { INodeProperties } from 'n8n-workflow';

const showOnlyForFormVersion = {
	resource: ['formVersion'],
};

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForFormVersion },
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a form version by ID',
				action: 'Get a form version',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get multiple form versions',
				action: 'Get many form versions',
			},
		],
		default: 'getMany',
	},
	{
		displayName: 'Version ID',
		name: 'id',
		type: 'string',
		default: '',
		description: 'The unique ID of the form version',
		displayOptions: { show: { resource: ['formVersion'], operation: ['get'] } },
	},
];
