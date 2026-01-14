import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCoupon = {
	resource: ['coupon'],
};

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForCoupon },
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new coupon',
				action: 'Create a coupon',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a coupon',
				action: 'Delete a coupon',
			},
			{ name: 'Get', value: 'get', description: 'Get a coupon by ID', action: 'Get a coupon' },
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get multiple coupons',
				action: 'Get many coupons',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a coupon',
				action: 'Update a coupon',
			},
		],
		default: 'get',
	},
	{
		displayName: 'Coupon ID',
		name: 'couponId',
		type: 'string',
		default: '',
		description: 'The unique ID of the coupon',
		displayOptions: { show: { resource: ['coupon'], operation: ['get', 'update', 'delete'] } },
	},
];
