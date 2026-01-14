import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCouponCode = {
	resource: ['couponCode'],
};

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForCouponCode },
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new coupon code',
				action: 'Create a coupon code',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a coupon code',
				action: 'Delete a coupon code',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a coupon code by ID',
				action: 'Get a coupon code',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get multiple coupon codes',
				action: 'Get many coupon codes',
			},
		],
		default: 'getMany',
	},
	{
		displayName: 'Coupon Code ID',
		name: 'couponCodeId',
		type: 'string',
		default: '',
		description: 'The unique ID of the coupon code',
		displayOptions: { show: { resource: ['couponCode'], operation: ['get', 'delete'] } },
	},
	{
		displayName: 'Code',
		name: 'code',
		type: 'string',
		default: '',
		description: 'The coupon code value',
		displayOptions: { show: { resource: ['couponCode'], operation: ['create'] } },
	},
	{
		displayName: 'Coupon ID',
		name: 'couponId',
		type: 'string',
		default: '',
		description: 'The ID of the parent coupon',
		displayOptions: { show: { resource: ['couponCode'], operation: ['create'] } },
	},
];
