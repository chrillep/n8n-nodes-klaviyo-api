import type { INodeProperties } from 'n8n-workflow';
import * as get from './get.operation';
import * as getMany from './getMany.operation';

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['account'],
			},
		},
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
	...get.description,
	...getMany.description,
];

export const operations = {
	get,
	getMany,
};
