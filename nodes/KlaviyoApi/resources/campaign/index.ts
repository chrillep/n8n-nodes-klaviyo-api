import type { INodeProperties } from 'n8n-workflow';
import { getCampaignIdProperty } from '../../shared/descriptions';

const showOnlyForCampaign = {
	resource: ['campaign'],
};

export const campaignDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForCampaign },
		options: [
			{
				name: 'Clone',
				value: 'clone',
				description: 'Clone an existing campaign',
				action: 'Clone a campaign',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new campaign',
				action: 'Create a campaign',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a campaign',
				action: 'Delete a campaign',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a campaign by ID',
				action: 'Get a campaign',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get multiple campaigns',
				action: 'Get many campaigns',
			},
			{
				name: 'Send',
				value: 'send',
				description: 'Send a campaign',
				action: 'Send a campaign',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a campaign',
				action: 'Update a campaign',
			},
		],
		default: 'getMany',
	},
	{
		...getCampaignIdProperty(),
		displayOptions: {
			show: { resource: ['campaign'], operation: ['get', 'delete', 'update', 'send', 'clone'] },
		},
	},
	{
		displayName: 'Campaign Name',
		name: 'campaignName',
		type: 'string',
		default: '',
		description: 'The name of the campaign',
		displayOptions: { show: { resource: ['campaign'], operation: ['create', 'update'] } },
	},
];
