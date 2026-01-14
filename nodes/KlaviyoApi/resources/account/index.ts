import type { INodeProperties } from 'n8n-workflow';
import { getIdProperty } from '../../shared/descriptions';
const showOnlyForAccount = {
	resource: ['account'],
};
export const accountDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForAccount },
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get account information',
				action: 'Get account',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get all accounts',
				action: 'Get many accounts',
			},
		],
		default: 'get',
	},
	{
		...getIdProperty('Account'),
		displayOptions: { show: { resource: ['account'], operation: ['get'] } },
	},
];
