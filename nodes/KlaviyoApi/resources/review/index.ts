import type { INodeProperties } from 'n8n-workflow';

const showOnlyForReview = {
	resource: ['review'],
};

export const reviewDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForReview },
		options: [
			{ name: 'Get', value: 'get', description: 'Get a review by ID', action: 'Get a review' },
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get multiple reviews',
				action: 'Get many reviews',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a review (approve/reject)',
				action: 'Update a review',
			},
		],
		default: 'getMany',
	},
	{
		displayName: 'Review ID',
		name: 'reviewId',
		type: 'string',
		default: '',
		description: 'The unique ID of the review',
		displayOptions: { show: { resource: ['review'], operation: ['get', 'update'] } },
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		options: [
			{ name: 'Approved', value: 'approved' },
			{ name: 'Rejected', value: 'rejected' },
		],
		default: 'approved',
		description: 'Review status',
		displayOptions: { show: { resource: ['review'], operation: ['update'] } },
	},
];
