import type { INodeProperties } from 'n8n-workflow';
import { getListIdProperty, getProfileIdProperty } from '../../shared/descriptions';

const showOnlyForList = {
	resource: ['list'],
};

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForList },
		options: [
			{
				name: 'Add Profiles',
				value: 'addProfiles',
				description: 'Add profiles to a list',
				action: 'Add profiles to a list',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new list',
				action: 'Create a list',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a list',
				action: 'Delete a list',
			},
			{ name: 'Get', value: 'get', description: 'Get a list by ID', action: 'Get a list' },
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get multiple lists',
				action: 'Get many lists',
			},
			{
				name: 'Get Profiles',
				value: 'getProfiles',
				description: 'Get profiles in a list',
				action: 'Get profiles in a list',
			},
			{
				name: 'Remove Profiles',
				value: 'removeProfiles',
				description: 'Remove profiles from a list',
				action: 'Remove profiles from a list',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a list',
				action: 'Update a list',
			},
		],
		default: 'getMany',
	},
	{
		...getListIdProperty(),
		displayOptions: {
			show: {
				resource: ['list'],
				operation: ['get', 'delete', 'update', 'addProfiles', 'getProfiles', 'removeProfiles'],
			},
		},
	},
	{
		...getProfileIdProperty(),
		displayOptions: { show: { resource: ['list'], operation: ['addProfiles', 'removeProfiles'] } },
	},
	{
		displayName: 'List Name',
		name: 'listName',
		type: 'string',
		default: '',
		description: 'The name of the list',
		displayOptions: { show: { resource: ['list'], operation: ['create', 'update'] } },
	},
];
