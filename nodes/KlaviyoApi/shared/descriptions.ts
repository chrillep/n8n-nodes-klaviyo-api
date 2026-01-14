import type { INodeProperties } from 'n8n-workflow';

export const getIdProperty = (
	resourceName: string,
	required = true,
	displayOptions?: INodeProperties['displayOptions'],
): INodeProperties => ({
	displayName: `${resourceName} ID`,
	name: 'id',
	type: 'string',
	required,
	description: `The unique ID of the ${resourceName.toLowerCase()}`,
	default: '',
	displayOptions,
});

export const getReturnAllProperty = (
	displayOptions?: INodeProperties['displayOptions'],
): INodeProperties => ({
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: false,
	description: 'Whether to return all results or only up to a given limit',
	displayOptions,
});

export const getLimitProperty = (
	displayOptions?: INodeProperties['displayOptions'],
): INodeProperties => ({
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	default: 50,
	description: 'Max number of results to return',
	typeOptions: {
		minValue: 1,
		maxValue: 100,
	},
	displayOptions,
});

export const getOffsetProperty = (
	displayOptions?: INodeProperties['displayOptions'],
): INodeProperties => ({
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	default: 0,
	description: 'Number of results to skip',
	typeOptions: {
		minValue: 0,
	},
	displayOptions,
});

export const getFilterProperty = (
	displayOptions?: INodeProperties['displayOptions'],
): INodeProperties => ({
	displayName: 'Filter Expression',
	name: 'filter',
	type: 'string',
	default: '',
	description:
		'Filter expression (Klaviyo syntax). Example: greater_than(created, 2025-01-01T00:00:00Z).',
	displayOptions,
});

export const getIncludeProperty = (
	options: string[],
	displayOptions?: INodeProperties['displayOptions'],
): INodeProperties => ({
	displayName: 'Include',
	name: 'include',
	type: 'multiOptions',
	options: options.map((opt) => ({
		name: opt.charAt(0).toUpperCase() + opt.slice(1),
		value: opt,
	})),
	default: [],
	description: 'Related data to include in response',
	displayOptions,
});

export const getEmailProperty = (
	required = true,
	displayOptions?: INodeProperties['displayOptions'],
): INodeProperties => ({
	displayName: 'Email',
	name: 'email',
	type: 'string',
	placeholder: 'name@email.com',
	required,
	default: '',
	description: 'Email address',
	displayOptions,
});

export const getFirstNameProperty = (
	required = false,
	displayOptions?: INodeProperties['displayOptions'],
): INodeProperties => ({
	displayName: 'First Name',
	name: 'firstName',
	type: 'string',
	required,
	default: '',
	description: 'First name of the profile',
	displayOptions,
});

export const getLastNameProperty = (
	required = false,
	displayOptions?: INodeProperties['displayOptions'],
): INodeProperties => ({
	displayName: 'Last Name',
	name: 'lastName',
	type: 'string',
	required,
	default: '',
	description: 'Last name of the profile',
	displayOptions,
});

export const getPhoneNumberProperty = (
	required = false,
	displayOptions?: INodeProperties['displayOptions'],
): INodeProperties => ({
	displayName: 'Phone Number',
	name: 'phoneNumber',
	type: 'string',
	required,
	default: '',
	description: 'Phone number (e.g., +12345678901)',
	displayOptions,
});

export const getPropertiesProperty = (
	displayOptions?: INodeProperties['displayOptions'],
): INodeProperties => ({
	displayName: 'Additional Properties',
	name: 'properties',
	type: 'json',
	default: '{}',
	description: 'Custom properties as JSON object',
	typeOptions: {
		alwaysOpenEditWindow: true,
	},
	displayOptions,
});

export const getProfileIdProperty = (
	required = true,
	displayOptions?: INodeProperties['displayOptions'],
): INodeProperties => ({
	displayName: 'Profile ID',
	name: 'profileId',
	type: 'string',
	required,
	default: '',
	description: 'The unique ID of the profile (UUID or email)',
	displayOptions,
});

export const getListIdProperty = (
	required = true,
	displayOptions?: INodeProperties['displayOptions'],
): INodeProperties => ({
	displayName: 'List ID',
	name: 'listId',
	type: 'string',
	required,
	default: '',
	description: 'The unique ID of the list',
	displayOptions,
});

export const getCampaignIdProperty = (
	required = true,
	displayOptions?: INodeProperties['displayOptions'],
): INodeProperties => ({
	displayName: 'Campaign ID',
	name: 'campaignId',
	type: 'string',
	required,
	default: '',
	description: 'The unique ID of the campaign',
	displayOptions,
});

export const getSegmentIdProperty = (
	required = true,
	displayOptions?: INodeProperties['displayOptions'],
): INodeProperties => ({
	displayName: 'Segment ID',
	name: 'segmentId',
	type: 'string',
	required,
	default: '',
	description: 'The unique ID of the segment',
	displayOptions,
});

export const getEventIdProperty = (
	required = true,
	displayOptions?: INodeProperties['displayOptions'],
): INodeProperties => ({
	displayName: 'Event ID',
	name: 'eventId',
	type: 'string',
	required,
	default: '',
	description: 'The unique ID of the event',
	displayOptions,
});

export const getFlowIdProperty = (
	required = true,
	displayOptions?: INodeProperties['displayOptions'],
): INodeProperties => ({
	displayName: 'Flow ID',
	name: 'flowId',
	type: 'string',
	required,
	default: '',
	description: 'The unique ID of the flow',
	displayOptions,
});

export const getTemplateIdProperty = (
	required = true,
	displayOptions?: INodeProperties['displayOptions'],
): INodeProperties => ({
	displayName: 'Template ID',
	name: 'templateId',
	type: 'string',
	required,
	default: '',
	description: 'The unique ID of the template',
	displayOptions,
});

export const getCouponIdProperty = (
	required = true,
	displayOptions?: INodeProperties['displayOptions'],
): INodeProperties => ({
	displayName: 'Coupon ID',
	name: 'couponId',
	type: 'string',
	required,
	default: '',
	description: 'The unique ID of the coupon',
	displayOptions,
});

export const getImageIdProperty = (
	required = true,
	displayOptions?: INodeProperties['displayOptions'],
): INodeProperties => ({
	displayName: 'Image ID',
	name: 'imageId',
	type: 'string',
	required,
	default: '',
	description: 'The unique ID of the image',
	displayOptions,
});

export const getMetricIdProperty = (
	required = true,
	displayOptions?: INodeProperties['displayOptions'],
): INodeProperties => ({
	displayName: 'Metric ID',
	name: 'metricId',
	type: 'string',
	required,
	default: '',
	description: 'The unique ID of the metric',
	displayOptions,
});
