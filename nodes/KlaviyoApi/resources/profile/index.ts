import type { INodeProperties } from 'n8n-workflow';
import {
	getEmailProperty,
	getFirstNameProperty,
	getLastNameProperty,
	getPhoneNumberProperty,
	getPropertiesProperty,
	getProfileIdProperty,
	getListIdProperty,
} from '../../shared/descriptions';

const showOnlyForProfile = {
	resource: ['profile'],
};

export const profileDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForProfile },
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
	{
		...getProfileIdProperty(),
		displayOptions: {
			show: {
				resource: ['profile'],
				operation: ['get', 'update', 'subscribe', 'suppress', 'unsubscribe', 'unsuppress'],
			},
		},
	},
	{
		...getEmailProperty(),
		displayOptions: {
			show: { resource: ['profile'], operation: ['create', 'createOrUpdate', 'update'] },
		},
	},
	{
		...getFirstNameProperty(),
		displayOptions: {
			show: { resource: ['profile'], operation: ['create', 'createOrUpdate', 'update'] },
		},
	},
	{
		...getLastNameProperty(),
		displayOptions: {
			show: { resource: ['profile'], operation: ['create', 'createOrUpdate', 'update'] },
		},
	},
	{
		...getPhoneNumberProperty(),
		displayOptions: { show: { resource: ['profile'], operation: ['create'] } },
	},
	{
		...getPropertiesProperty(),
		displayOptions: {
			show: { resource: ['profile'], operation: ['create', 'createOrUpdate', 'update'] },
		},
	},
	{
		...getListIdProperty(),
		displayOptions: { show: { resource: ['profile'], operation: ['subscribe', 'unsubscribe'] } },
	},
];
