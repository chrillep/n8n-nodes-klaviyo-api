import type {
	INodeType,
	INodeTypeDescription,
	IExecuteFunctions,
	INodeExecutionData,
	IDataObject,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

import {
	getIdProperty,
	getReturnAllProperty,
	getLimitProperty,
	getFilterProperty,
	getEmailProperty,
	getFirstNameProperty,
	getLastNameProperty,
	getPhoneNumberProperty,
	getPropertiesProperty,
	getProfileIdProperty,
	getListIdProperty,
	getCampaignIdProperty,
	getSegmentIdProperty,
	getEventIdProperty,
	getFlowIdProperty,
	getTemplateIdProperty,
	getCouponIdProperty,
	getImageIdProperty,
	getMetricIdProperty,
} from './shared/descriptions';

import { klaviyoApiRequest } from './shared/transport';

export class KlaviyoApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'KlaviyoAPI',
		name: 'klaviyoApi',
		icon: 'file:../../icons/klaviyo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Interact with KlaviyoApi marketing automation API',
		defaults: {
			name: 'KlaviyoApi',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'klaviyoApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Account', value: 'account' },
					{ name: 'Campaign', value: 'campaign' },
					{ name: 'Coupon', value: 'coupon' },
					{ name: 'Event', value: 'event' },
					{ name: 'Flow', value: 'flow' },
					{ name: 'Image', value: 'image' },
					{ name: 'List', value: 'list' },
					{ name: 'Metric', value: 'metric' },
					{ name: 'Profile', value: 'profile' },
					{ name: 'Segment', value: 'segment' },
					{ name: 'Tag', value: 'tag' },
					{ name: 'Template', value: 'template' },
				],
				default: 'profile',
			},

			// Account operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['account'] } },
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

			// Profile operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['profile'] } },
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
						name: 'Update',
						value: 'update',
						description: 'Update a profile',
						action: 'Update a profile',
					},
				],
				default: 'get',
			},

			// List operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['list'] } },
				options: [
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
						name: 'Update',
						value: 'update',
						description: 'Update a list',
						action: 'Update a list',
					},
				],
				default: 'getMany',
			},

			// Campaign operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['campaign'] } },
				options: [
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
				],
				default: 'get',
			},

			// Event operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['event'] } },
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create/track an event',
						action: 'Create an event',
					},
					{ name: 'Get', value: 'get', description: 'Get an event by ID', action: 'Get an event' },
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple events',
						action: 'Get many events',
					},
				],
				default: 'create',
			},

			// Segment operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['segment'] } },
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a segment by ID',
						action: 'Get a segment',
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple segments',
						action: 'Get many segments',
					},
					{
						name: 'Get Profiles',
						value: 'getProfiles',
						description: 'Get profiles in a segment',
						action: 'Get profiles in a segment',
					},
				],
				default: 'getMany',
			},

			// Flow operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['flow'] } },
				options: [
					{ name: 'Get', value: 'get', description: 'Get a flow by ID', action: 'Get a flow' },
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple flows',
						action: 'Get many flows',
					},
					{
						name: 'Update Status',
						value: 'updateStatus',
						description: 'Update flow status',
						action: 'Update flow status',
					},
				],
				default: 'get',
			},

			// Template operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['template'] } },
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a template by ID',
						action: 'Get a template',
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple templates',
						action: 'Get many templates',
					},
				],
				default: 'getMany',
			},

			// Coupon operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['coupon'] } },
				options: [
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
				],
				default: 'get',
			},

			// Image operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['image'] } },
				options: [
					{ name: 'Get', value: 'get', description: 'Get an image by ID', action: 'Get an image' },
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple images',
						action: 'Get many images',
					},
				],
				default: 'getMany',
			},

			// Metric operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['metric'] } },
				options: [
					{ name: 'Get', value: 'get', description: 'Get a metric by ID', action: 'Get a metric' },
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple metrics',
						action: 'Get many metrics',
					},
				],
				default: 'getMany',
			},

			// Tag operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['tag'] } },
				options: [
					{ name: 'Get', value: 'get', description: 'Get a tag by ID', action: 'Get a tag' },
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple tags',
						action: 'Get many tags',
					},
				],
				default: 'getMany',
			},

			// Common fields
			getIdProperty('Resource'),
			getProfileIdProperty(false),
			getListIdProperty(false),
			getCampaignIdProperty(false),
			getSegmentIdProperty(false),
			getEventIdProperty(false),
			getFlowIdProperty(false),
			getTemplateIdProperty(false),
			getCouponIdProperty(false),
			getImageIdProperty(false),
			getMetricIdProperty(false),

			// Profile fields
			getEmailProperty(false),
			getFirstNameProperty(false),
			getLastNameProperty(false),
			getPhoneNumberProperty(false),
			getPropertiesProperty(),

			// Pagination
			getReturnAllProperty(),
			getLimitProperty(),
			getFilterProperty(),

			// List fields
			{
				displayName: 'List Name',
				name: 'listName',
				type: 'string',
				default: '',
				description: 'Name of the list',
				displayOptions: { show: { resource: ['list'], operation: ['create', 'update'] } },
			},

			// Campaign fields
			{
				displayName: 'Campaign Name',
				name: 'campaignName',
				type: 'string',
				default: '',
				description: 'Name of the campaign',
				displayOptions: { show: { resource: ['campaign'], operation: ['create'] } },
			},

			// Event fields
			{
				displayName: 'Metric Name',
				name: 'metricName',
				type: 'string',
				required: true,
				default: '',
				description: 'Name of the metric to track',
				displayOptions: { show: { resource: ['event'], operation: ['create'] } },
			},
			{
				displayName: 'Event Properties',
				name: 'eventProperties',
				type: 'json',
				default: '{}',
				description: 'Event properties as JSON',
				displayOptions: { show: { resource: ['event'], operation: ['create'] } },
			},

			// Flow fields
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Draft', value: 'draft' },
					{ name: 'Manual', value: 'manual' },
					{ name: 'Live', value: 'live' },
				],
				default: 'draft',
				description: 'Flow status',
				displayOptions: { show: { resource: ['flow'], operation: ['updateStatus'] } },
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		const returnData: INodeExecutionData[] = [];
		const ctx = this as unknown as KlaviyoApi & IExecuteFunctions;

		for (let i = 0; i < items.length; i++) {
			const responseData = await ctx.handleResource(i, resource, operation);

			if (!responseData) continue;

			if (Array.isArray(responseData)) {
				for (const item of responseData) {
					returnData.push({ json: item });
				}
				continue;
			}

			const data = (responseData as IDataObject).data;
			if (data && typeof data === 'object' && !Array.isArray(data)) {
				returnData.push({ json: data as IDataObject });
			} else {
				returnData.push({ json: responseData });
			}
		}

		return [returnData];
	}

	private async handleResource(
		this: KlaviyoApi & IExecuteFunctions,
		itemIndex: number,
		resource: string,
		operation: string,
	): Promise<IDataObject | IDataObject[] | null> {
		switch (resource) {
			case 'account':
				return this.handleAccount(itemIndex, operation);
			case 'profile':
				return this.handleProfile(itemIndex, operation);
			case 'list':
				return this.handleList(itemIndex, operation);
			case 'campaign':
				return this.handleCampaign(itemIndex, operation);
			case 'event':
				return this.handleEvent(itemIndex, operation);
			case 'segment':
				return this.handleSegment(itemIndex, operation);
			case 'flow':
				return this.handleFlow(itemIndex, operation);
			case 'template':
				return this.handleTemplate(itemIndex, operation);
			case 'coupon':
				return this.handleCoupon(itemIndex, operation);
			case 'image':
				return this.handleImage(itemIndex, operation);
			case 'metric':
				return this.handleMetric(itemIndex, operation);
			case 'tag':
				return this.handleTag(itemIndex, operation);
			default:
				throw new NodeOperationError(this.getNode(), `Unknown resource: ${resource}`);
		}
	}

	private async handleAccount(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject> {
		if (operation === 'get') {
			const id = this.getNodeParameter('id', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/accounts/${id}`);
		}
		if (operation === 'getMany') {
			return await klaviyoApiRequest.call(this, 'GET', '/api/accounts');
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleProfile(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[]> {
		if (operation === 'get') {
			const profileId = this.getNodeParameter('profileId', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/profiles/${profileId}`);
		}
		if (operation === 'getMany') {
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			const filter = this.getNodeParameter('filter', itemIndex) as string;

			if (!returnAll) qs['page[size]'] = limit;
			if (filter) qs.filter = filter;

			const response = await klaviyoApiRequest.call(this, 'GET', '/api/profiles', undefined, qs);
			return (response as IDataObject).data as IDataObject[];
		}
		if (operation === 'create') {
			const email = this.getNodeParameter('email', itemIndex) as string;
			const attributes: IDataObject = { email };

			const firstName = this.getNodeParameter('firstName', itemIndex) as string;
			if (firstName) attributes.first_name = firstName;

			const lastName = this.getNodeParameter('lastName', itemIndex) as string;
			if (lastName) attributes.last_name = lastName;

			const phoneNumber = this.getNodeParameter('phoneNumber', itemIndex) as string;
			if (phoneNumber) attributes.phone_number = phoneNumber;

			const body = { data: { type: 'profile', attributes } };
			return await klaviyoApiRequest.call(this, 'POST', '/api/profiles', body);
		}
		if (operation === 'createOrUpdate') {
			const email = this.getNodeParameter('email', itemIndex) as string;
			const attributes: IDataObject = { email };

			const firstName = this.getNodeParameter('firstName', itemIndex) as string;
			if (firstName) attributes.first_name = firstName;

			const lastName = this.getNodeParameter('lastName', itemIndex) as string;
			if (lastName) attributes.last_name = lastName;

			const body = { data: [{ type: 'profile', attributes }] };
			return await klaviyoApiRequest.call(this, 'POST', '/api/profile-import/bulk', body);
		}
		if (operation === 'update') {
			const profileId = this.getNodeParameter('profileId', itemIndex) as string;
			const attributes: IDataObject = {};

			const firstName = this.getNodeParameter('firstName', itemIndex) as string;
			if (firstName) attributes.first_name = firstName;

			const lastName = this.getNodeParameter('lastName', itemIndex) as string;
			if (lastName) attributes.last_name = lastName;

			const body = { data: { type: 'profile', id: profileId, attributes } };
			return await klaviyoApiRequest.call(this, 'PATCH', `/api/profiles/${profileId}`, body);
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleList(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[] | null> {
		if (operation === 'get') {
			const listId = this.getNodeParameter('listId', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/lists/${listId}`);
		}
		if (operation === 'getMany') {
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(this, 'GET', '/api/lists', undefined, qs);
			return (response as IDataObject).data as IDataObject[];
		}
		if (operation === 'create') {
			const listName = this.getNodeParameter('listName', itemIndex) as string;
			const body = { data: { type: 'list', attributes: { name: listName } } };
			return await klaviyoApiRequest.call(this, 'POST', '/api/lists', body);
		}
		if (operation === 'update') {
			const listId = this.getNodeParameter('listId', itemIndex) as string;
			const listName = this.getNodeParameter('listName', itemIndex) as string;
			const body = { data: { type: 'list', id: listId, attributes: { name: listName } } };
			return await klaviyoApiRequest.call(this, 'PATCH', `/api/lists/${listId}`, body);
		}
		if (operation === 'delete') {
			const listId = this.getNodeParameter('listId', itemIndex) as string;
			await klaviyoApiRequest.call(this, 'DELETE', `/api/lists/${listId}`);
			return null;
		}
		if (operation === 'getProfiles') {
			const listId = this.getNodeParameter('listId', itemIndex) as string;
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(
				this,
				'GET',
				`/api/lists/${listId}/profiles`,
				undefined,
				qs,
			);
			return (response as IDataObject).data as IDataObject[];
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleCampaign(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[]> {
		if (operation === 'get') {
			const campaignId = this.getNodeParameter('campaignId', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/campaigns/${campaignId}`);
		}
		if (operation === 'getMany') {
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(this, 'GET', '/api/campaigns', undefined, qs);
			return (response as IDataObject).data as IDataObject[];
		}
		if (operation === 'send') {
			const campaignId = this.getNodeParameter('campaignId', itemIndex) as string;
			const body = { data: { type: 'campaign-send-job' } };
			return await klaviyoApiRequest.call(this, 'POST', `/api/campaigns/${campaignId}/send`, body);
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleEvent(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[]> {
		if (operation === 'get') {
			const eventId = this.getNodeParameter('eventId', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/events/${eventId}`);
		}
		if (operation === 'getMany') {
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			const filter = this.getNodeParameter('filter', itemIndex) as string;

			if (!returnAll) qs['page[size]'] = limit;
			if (filter) qs.filter = filter;

			const response = await klaviyoApiRequest.call(this, 'GET', '/api/events', undefined, qs);
			return (response as IDataObject).data as IDataObject[];
		}
		if (operation === 'create') {
			const metricName = this.getNodeParameter('metricName', itemIndex) as string;
			const email = this.getNodeParameter('email', itemIndex) as string;
			const eventPropertiesJson = this.getNodeParameter('eventProperties', itemIndex) as string;

			let eventProperties: IDataObject = {};
			try {
				eventProperties = JSON.parse(eventPropertiesJson || '{}');
			} catch {
				eventProperties = {};
			}

			const body = {
				data: {
					type: 'event',
					attributes: {
						metric: { name: metricName },
						profile: { email },
						properties: eventProperties,
						timestamp: new Date().toISOString(),
					},
				},
			};

			return await klaviyoApiRequest.call(this, 'POST', '/api/events', body);
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleSegment(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[]> {
		if (operation === 'get') {
			const segmentId = this.getNodeParameter('segmentId', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/segments/${segmentId}`);
		}
		if (operation === 'getMany') {
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(this, 'GET', '/api/segments', undefined, qs);
			return (response as IDataObject).data as IDataObject[];
		}
		if (operation === 'getProfiles') {
			const segmentId = this.getNodeParameter('segmentId', itemIndex) as string;
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(
				this,
				'GET',
				`/api/segments/${segmentId}/profiles`,
				undefined,
				qs,
			);
			return (response as IDataObject).data as IDataObject[];
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleFlow(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[]> {
		if (operation === 'get') {
			const flowId = this.getNodeParameter('flowId', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/flows/${flowId}`);
		}
		if (operation === 'getMany') {
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(this, 'GET', '/api/flows', undefined, qs);
			return (response as IDataObject).data as IDataObject[];
		}
		if (operation === 'updateStatus') {
			const flowId = this.getNodeParameter('flowId', itemIndex) as string;
			const status = this.getNodeParameter('status', itemIndex) as string;
			const body = { data: { type: 'flow', id: flowId, attributes: { status } } };
			return await klaviyoApiRequest.call(this, 'PATCH', `/api/flows/${flowId}`, body);
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleTemplate(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[]> {
		if (operation === 'get') {
			const templateId = this.getNodeParameter('templateId', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/templates/${templateId}`);
		}
		if (operation === 'getMany') {
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(this, 'GET', '/api/templates', undefined, qs);
			return (response as IDataObject).data as IDataObject[];
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleCoupon(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[] | null> {
		if (operation === 'get') {
			const couponId = this.getNodeParameter('couponId', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/coupons/${couponId}`);
		}
		if (operation === 'getMany') {
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(this, 'GET', '/api/coupons', undefined, qs);
			return (response as IDataObject).data as IDataObject[];
		}
		if (operation === 'delete') {
			const couponId = this.getNodeParameter('couponId', itemIndex) as string;
			await klaviyoApiRequest.call(this, 'DELETE', `/api/coupons/${couponId}`);
			return null;
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleImage(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[]> {
		if (operation === 'get') {
			const imageId = this.getNodeParameter('imageId', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/images/${imageId}`);
		}
		if (operation === 'getMany') {
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(this, 'GET', '/api/images', undefined, qs);
			return (response as IDataObject).data as IDataObject[];
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleMetric(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[]> {
		if (operation === 'get') {
			const metricId = this.getNodeParameter('metricId', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/metrics/${metricId}`);
		}
		if (operation === 'getMany') {
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(this, 'GET', '/api/metrics', undefined, qs);
			return (response as IDataObject).data as IDataObject[];
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleTag(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[]> {
		if (operation === 'get') {
			const tagId = this.getNodeParameter('id', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/tags/${tagId}`);
		}
		if (operation === 'getMany') {
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(this, 'GET', '/api/tags', undefined, qs);
			return (response as IDataObject).data as IDataObject[];
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}
}
