import type { INodeProperties } from 'n8n-workflow';

export const getIdProperty = (resourceName: string, required = true): INodeProperties => ({
	displayName: `${resourceName} ID`,
	name: 'id',
	type: 'string',
	required,
	description: `The unique ID of the ${resourceName.toLowerCase()}`,
	default: '',
});

export const getReturnAllProperty = (): INodeProperties => ({
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: false,
	description: 'Whether to return all results or only up to a given limit',
});

export const getLimitProperty = (): INodeProperties => ({
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	default: 50,
	description: 'Max number of results to return',
	typeOptions: {
		minValue: 1,
		maxValue: 100,
	},
});

export const getOffsetProperty = (): INodeProperties => ({
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	default: 0,
	description: 'Number of results to skip',
	typeOptions: {
		minValue: 0,
	},
});

export const getFilterProperty = (): INodeProperties => ({
	displayName: 'Filter Expression',
	name: 'filter',
	type: 'string',
	default: '',
	description: 'Filter expression (Klaviyo syntax). Example: greater_than(created, 2025-01-01T00:00:00Z).',
});

export const getIncludeProperty = (options: string[]): INodeProperties => ({
	displayName: 'Include',
	name: 'include',
	type: 'multiOptions',
	options: options.map((opt) => ({
		name: opt.charAt(0).toUpperCase() + opt.slice(1),
		value: opt,
	})),
	default: [],
	description: 'Related data to include in response',
});

export const getEmailProperty = (required = true): INodeProperties => ({
	displayName: 'Email',
	name: 'email',
	type: 'string',
	placeholder: 'name@email.com',
	required,
	default: '',
	description: 'Email address',
});

export const getFirstNameProperty = (required = false): INodeProperties => ({
	displayName: 'First Name',
	name: 'firstName',
	type: 'string',
	required,
	default: '',
	description: 'First name of the profile',
});

export const getLastNameProperty = (required = false): INodeProperties => ({
	displayName: 'Last Name',
	name: 'lastName',
	type: 'string',
	required,
	default: '',
	description: 'Last name of the profile',
});

export const getPhoneNumberProperty = (required = false): INodeProperties => ({
	displayName: 'Phone Number',
	name: 'phoneNumber',
	type: 'string',
	required,
	default: '',
	description: 'Phone number (e.g., +12345678901)',
});

export const getPropertiesProperty = (): INodeProperties => ({
	displayName: 'Additional Properties',
	name: 'properties',
	type: 'json',
	default: '{}',
	description: 'Custom properties as JSON object',
	typeOptions: {
		alwaysOpenEditWindow: true,
	},
});

export const getProfileIdProperty = (required = true): INodeProperties => ({
	displayName: 'Profile ID',
	name: 'profileId',
	type: 'string',
	required,
	default: '',
	description: 'The unique ID of the profile (UUID or email)',
});

export const getListIdProperty = (required = true): INodeProperties => ({
	displayName: 'List ID',
	name: 'listId',
	type: 'string',
	required,
	default: '',
	description: 'The unique ID of the list',
});

export const getCampaignIdProperty = (required = true): INodeProperties => ({
	displayName: 'Campaign ID',
	name: 'campaignId',
	type: 'string',
	required,
	default: '',
	description: 'The unique ID of the campaign',
});

export const getSegmentIdProperty = (required = true): INodeProperties => ({
	displayName: 'Segment ID',
	name: 'segmentId',
	type: 'string',
	required,
	default: '',
	description: 'The unique ID of the segment',
});

export const getEventIdProperty = (required = true): INodeProperties => ({
	displayName: 'Event ID',
	name: 'eventId',
	type: 'string',
	required,
	default: '',
	description: 'The unique ID of the event',
});

export const getFlowIdProperty = (required = true): INodeProperties => ({
	displayName: 'Flow ID',
	name: 'flowId',
	type: 'string',
	required,
	default: '',
	description: 'The unique ID of the flow',
});

export const getTemplateIdProperty = (required = true): INodeProperties => ({
	displayName: 'Template ID',
	name: 'templateId',
	type: 'string',
	required,
	default: '',
	description: 'The unique ID of the template',
});

export const getCouponIdProperty = (required = true): INodeProperties => ({
	displayName: 'Coupon ID',
	name: 'couponId',
	type: 'string',
	required,
	default: '',
	description: 'The unique ID of the coupon',
});

export const getImageIdProperty = (required = true): INodeProperties => ({
	displayName: 'Image ID',
	name: 'imageId',
	type: 'string',
	required,
	default: '',
	description: 'The unique ID of the image',
});

export const getMetricIdProperty = (required = true): INodeProperties => ({
	displayName: 'Metric ID',
	name: 'metricId',
	type: 'string',
	required,
	default: '',
	description: 'The unique ID of the metric',
});

