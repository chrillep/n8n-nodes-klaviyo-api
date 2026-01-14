import type { INodeProperties } from 'n8n-workflow';
import * as create from './create.operation';
import * as createOrUpdate from './createOrUpdate.operation';
import * as get from './get.operation';
import * as getMany from './getMany.operation';
import * as update from './update.operation';
import * as subscribe from './subscribe.operation';
import * as unsubscribe from './unsubscribe.operation';
import * as suppress from './suppress.operation';
import * as unsuppress from './unsuppress.operation';

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['profile'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new profile',
				action: 'Create a profile',
			},
			{
				name: 'Create or Update',
				value: 'createOrUpdate',
				description: 'Create or update a profile',
				action: 'Create or update a profile',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a profile by ID',
				action: 'Get a profile',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get multiple profiles',
				action: 'Get many profiles',
			},
			{
				name: 'Subscribe',
				value: 'subscribe',
				description: 'Subscribe profiles to a list',
				action: 'Subscribe profiles to a list',
			},
			{
				name: 'Suppress',
				value: 'suppress',
				description: 'Suppress profiles from email marketing',
				action: 'Suppress profiles',
			},
			{
				name: 'Unsubscribe',
				value: 'unsubscribe',
				description: 'Unsubscribe profiles from marketing',
				action: 'Unsubscribe profiles',
			},
			{
				name: 'Unsuppress',
				value: 'unsuppress',
				description: 'Unsuppress profiles',
				action: 'Unsuppress profiles',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a profile',
				action: 'Update a profile',
			},
		],
		default: 'get',
	},
	...create.description,
	...createOrUpdate.description,
	...get.description,
	...getMany.description,
	...update.description,
	...subscribe.description,
	...unsubscribe.description,
	...suppress.description,
	...unsuppress.description,
];

export const operations = {
	create,
	createOrUpdate,
	get,
	getMany,
	update,
	subscribe,
	unsubscribe,
	suppress,
	unsuppress,
};
