import type {
	INodeType,
	INodeTypeDescription,
	IExecuteFunctions,
	INodeExecutionData,
	IDataObject,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

// Import resource descriptions
import { accountDescription } from './resources/account';
import { campaignDescription } from './resources/campaign';
import { catalogCategoriesDescription } from './resources/catalogCategories';
import { catalogItemsDescription } from './resources/catalogItems';
import { catalogVariantsDescription } from './resources/catalogVariants';
import { couponDescription } from './resources/coupon';
import { couponCodeDescription } from './resources/couponCode';
import { customMetricDescription } from './resources/customMetric';
import { eventDescription } from './resources/event';
import { flowDescription } from './resources/flow';
import { flowActionDescription } from './resources/flowAction';
import { flowMessageDescription } from './resources/flowMessage';
import { formDescription } from './resources/form';
import { formVersionDescription } from './resources/formVersion';
import { imageDescription } from './resources/image';
import { listDescription } from './resources/list';
import { mappedMetricDescription } from './resources/mappedMetric';
import { metricDescription } from './resources/metric';
import { profileDescription } from './resources/profile';
import { reviewDescription } from './resources/review';
import { segmentDescription } from './resources/segment';
import { tagDescription } from './resources/tag';
import { templateDescription } from './resources/template';

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
					{ name: 'Catalog Category', value: 'catalogCategories' },
					{ name: 'Catalog Item', value: 'catalogItems' },
					{ name: 'Catalog Variant', value: 'catalogVariants' },
					{ name: 'Coupon', value: 'coupon' },
					{ name: 'Coupon Code', value: 'couponCode' },
					{ name: 'Custom Metric', value: 'customMetric' },
					{ name: 'Event', value: 'event' },
					{ name: 'Flow', value: 'flow' },
					{ name: 'Flow Action', value: 'flowAction' },
					{ name: 'Flow Message', value: 'flowMessage' },
					{ name: 'Form', value: 'form' },
					{ name: 'Form Version', value: 'formVersion' },
					{ name: 'Image', value: 'image' },
					{ name: 'List', value: 'list' },
					{ name: 'Mapped Metric', value: 'mappedMetric' },
					{ name: 'Metric', value: 'metric' },
					{ name: 'Profile', value: 'profile' },
					{ name: 'Review', value: 'review' },
					{ name: 'Segment', value: 'segment' },
					{ name: 'Tag', value: 'tag' },
					{ name: 'Template', value: 'template' },
				],
				default: 'profile',
			},

			// Spread all resource descriptions
			...accountDescription,
			...campaignDescription,
			...catalogCategoriesDescription,
			...catalogItemsDescription,
			...catalogVariantsDescription,
			...couponDescription,
			...couponCodeDescription,
			...customMetricDescription,
			...eventDescription,
			...flowDescription,
			...flowActionDescription,
			...flowMessageDescription,
			...formDescription,
			...formVersionDescription,
			...imageDescription,
			...listDescription,
			...mappedMetricDescription,
			...metricDescription,
			...profileDescription,
			...reviewDescription,
			...segmentDescription,
			...tagDescription,
			...templateDescription,

			// Common ID fields - with resource and operation scoping
			getIdProperty('Resource'),

			// Profile ID - for profile, list, segment operations that need it
			getProfileIdProperty(
				false,
				['profile', 'list', 'segment'],
				[
					'get',
					'update',
					'getProfiles',
					'addProfiles',
					'removeProfiles',
					'subscribe',
					'suppress',
					'unsuppress',
					'unsubscribe',
				],
			),

			// List ID - for list and profile operations
			getListIdProperty(
				false,
				['list', 'profile'],
				['get', 'update', 'addProfiles', 'removeProfiles', 'subscribe', 'unsubscribe'],
			),

			// Campaign ID - for campaign operations
			getCampaignIdProperty(false, ['campaign'], ['get', 'update', 'delete', 'clone', 'send']),

			// Segment ID - for segment operations
			getSegmentIdProperty(false, ['segment'], ['get', 'getProfiles']),

			// Event ID - for event operations
			getEventIdProperty(false, ['event'], ['get']),

			// Flow ID - for flow operations
			getFlowIdProperty(false, ['flow'], ['get', 'updateStatus']),

			// Template ID - for template and campaign message operations
			getTemplateIdProperty(false, ['template', 'campaignMessage'], ['get', 'assignTemplate']),

			// Coupon ID - for coupon and coupon code operations
			getCouponIdProperty(false, ['coupon', 'couponCode'], ['get', 'update', 'create']),

			// Image ID - for image operations
			getImageIdProperty(false, ['image'], ['get']),

			// Metric ID - for metric operations
			getMetricIdProperty(
				false,
				['metric', 'customMetric', 'mappedMetric'],
				['get', 'queryAggregates'],
			),

			// Profile-specific fields - only for profile create/update
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

			// Pagination fields - only for list/get many operations
			{
				...getReturnAllProperty(),
				displayOptions: {
					show: {
						resource: [
							'profile',
							'list',
							'campaign',
							'event',
							'segment',
							'flow',
							'template',
							'coupon',
							'couponCode',
							'form',
							'review',
							'image',
							'metric',
							'tag',
							'account',
							'customMetric',
							'flowAction',
							'flowMessage',
							'formVersion',
							'mappedMetric',
						],
						operation: ['getMany'],
					},
				},
			},
			{
				...getLimitProperty(),
				displayOptions: {
					show: {
						resource: [
							'profile',
							'list',
							'campaign',
							'event',
							'segment',
							'flow',
							'template',
							'coupon',
							'couponCode',
							'form',
							'review',
							'image',
							'metric',
							'tag',
							'account',
							'customMetric',
							'flowAction',
							'flowMessage',
							'formVersion',
							'mappedMetric',
						],
						operation: ['getMany'],
					},
				},
			},
			{
				...getFilterProperty(),
				displayOptions: { show: { resource: ['profile', 'event'], operation: ['getMany'] } },
			},

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
				displayOptions: { show: { resource: ['campaign'], operation: ['create', 'update'] } },
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

			// Tag fields
			{
				displayName: 'Tag Name',
				name: 'tagName',
				type: 'string',
				default: '',
				description: 'The name of the tag',
				displayOptions: { show: { resource: ['tag'], operation: ['create', 'update'] } },
			},

			// Coupon Code fields
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

			// Custom Metric fields
			{
				displayName: 'Metric Name',
				name: 'customMetricName',
				type: 'string',
				default: '',
				description: 'The name of the custom metric',
				displayOptions: { show: { resource: ['customMetric'], operation: ['create'] } },
			},

			// Form fields
			{
				displayName: 'Form ID',
				name: 'formId',
				type: 'string',
				default: '',
				description: 'The unique ID of the form',
				displayOptions: { show: { resource: ['form'] } },
			},

			// Review fields
			{
				displayName: 'Review ID',
				name: 'reviewId',
				type: 'string',
				default: '',
				description: 'The unique ID of the review',
				displayOptions: { show: { resource: ['review'] } },
			},
			{
				displayName: 'Review Status',
				name: 'reviewStatus',
				type: 'options',
				options: [
					{ name: 'Approved', value: 'approved' },
					{ name: 'Rejected', value: 'rejected' },
				],
				default: 'approved',
				description: 'Status to update the review to',
				displayOptions: { show: { resource: ['review'], operation: ['update'] } },
			},

			// Image fields
			{
				displayName: 'Image Name',
				name: 'imageName',
				type: 'string',
				default: '',
				description: 'The name of the image',
				displayOptions: { show: { resource: ['image'], operation: ['upload'] } },
			},
			{
				displayName: 'Image Data',
				name: 'imageData',
				type: 'string',
				default: '',
				description: 'Base64 encoded image data',
				displayOptions: { show: { resource: ['image'], operation: ['upload'] } },
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
			case 'catalogCategories':
				return this.handleCatalogCategories(itemIndex, operation);
			case 'catalogItems':
				return this.handleCatalogItems(itemIndex, operation);
			case 'catalogVariants':
				return this.handleCatalogVariants(itemIndex, operation);
			case 'campaign':
				return this.handleCampaign(itemIndex, operation);
			case 'coupon':
				return this.handleCoupon(itemIndex, operation);
			case 'couponCode':
				return this.handleCouponCode(itemIndex, operation);
			case 'customMetric':
				return this.handleCustomMetric(itemIndex, operation);
			case 'event':
				return this.handleEvent(itemIndex, operation);
			case 'flow':
				return this.handleFlow(itemIndex, operation);
			case 'flowAction':
				return this.handleFlowAction(itemIndex, operation);
			case 'flowMessage':
				return this.handleFlowMessage(itemIndex, operation);
			case 'form':
				return this.handleForm(itemIndex, operation);
			case 'formVersion':
				return this.handleFormVersion(itemIndex, operation);
			case 'image':
				return this.handleImage(itemIndex, operation);
			case 'list':
				return this.handleList(itemIndex, operation);
			case 'mappedMetric':
				return this.handleMappedMetric(itemIndex, operation);
			case 'metric':
				return this.handleMetric(itemIndex, operation);
			case 'profile':
				return this.handleProfile(itemIndex, operation);
			case 'review':
				return this.handleReview(itemIndex, operation);
			case 'segment':
				return this.handleSegment(itemIndex, operation);
			case 'tag':
				return this.handleTag(itemIndex, operation);
			case 'template':
				return this.handleTemplate(itemIndex, operation);
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
		if (operation === 'subscribe') {
			const profileId = this.getNodeParameter('profileId', itemIndex) as string;
			const listId = this.getNodeParameter('listId', itemIndex) as string;
			const body = {
				data: {
					type: 'profile-subscription-bulk-create-job',
					attributes: {
						profiles: {
							data: [{ type: 'profile', id: profileId }],
						},
					},
					relationships: {
						list: {
							data: { type: 'list', id: listId },
						},
					},
				},
			};
			return await klaviyoApiRequest.call(
				this,
				'POST',
				'/api/profile-subscription-bulk-create-jobs',
				body,
			);
		}
		if (operation === 'suppress') {
			const profileId = this.getNodeParameter('profileId', itemIndex) as string;
			const body = {
				data: {
					type: 'profile-suppression-bulk-create-job',
					attributes: {
						profiles: {
							data: [{ type: 'profile', id: profileId }],
						},
					},
				},
			};
			return await klaviyoApiRequest.call(
				this,
				'POST',
				'/api/profile-suppression-bulk-create-jobs',
				body,
			);
		}
		if (operation === 'unsuppress') {
			const profileId = this.getNodeParameter('profileId', itemIndex) as string;
			const body = {
				data: {
					type: 'profile-unsuppression-bulk-create-job',
					attributes: {
						profiles: {
							data: [{ type: 'profile', id: profileId }],
						},
					},
				},
			};
			return await klaviyoApiRequest.call(
				this,
				'POST',
				'/api/profile-unsuppression-bulk-create-jobs',
				body,
			);
		}
		if (operation === 'unsubscribe') {
			const profileId = this.getNodeParameter('profileId', itemIndex) as string;
			const listId = this.getNodeParameter('listId', itemIndex) as string;
			const body = {
				data: {
					type: 'profile-unsubscription-bulk-create-job',
					attributes: {
						profiles: {
							data: [{ type: 'profile', id: profileId }],
						},
					},
					relationships: {
						list: {
							data: { type: 'list', id: listId },
						},
					},
				},
			};
			return await klaviyoApiRequest.call(
				this,
				'POST',
				'/api/profile-unsubscription-bulk-create-jobs',
				body,
			);
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleList(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[] | null> {
		if (operation === 'addProfiles') {
			const listId = this.getNodeParameter('listId', itemIndex) as string;
			const profileId = this.getNodeParameter('profileId', itemIndex) as string;
			const body = {
				data: {
					type: 'profile-list-bulk-create-job',
					attributes: {
						profiles: {
							data: [{ type: 'profile', id: profileId }],
						},
					},
					relationships: {
						list: {
							data: { type: 'list', id: listId },
						},
					},
				},
			};
			return await klaviyoApiRequest.call(this, 'POST', '/api/profile-list-bulk-create-jobs', body);
		}
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
		if (operation === 'removeProfiles') {
			const listId = this.getNodeParameter('listId', itemIndex) as string;
			const profileId = this.getNodeParameter('profileId', itemIndex) as string;
			const body = {
				data: {
					type: 'profile-list-bulk-delete-job',
					attributes: {
						profiles: {
							data: [{ type: 'profile', id: profileId }],
						},
					},
					relationships: {
						list: {
							data: { type: 'list', id: listId },
						},
					},
				},
			};
			return await klaviyoApiRequest.call(this, 'POST', '/api/profile-list-bulk-delete-jobs', body);
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleCampaign(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[]> {
		if (operation === 'clone') {
			const campaignId = this.getNodeParameter('campaignId', itemIndex) as string;
			const body = { data: { type: 'campaign-clone-job' } };
			return await klaviyoApiRequest.call(this, 'POST', `/api/campaigns/${campaignId}/clone`, body);
		}
		if (operation === 'create') {
			const campaignName = this.getNodeParameter('campaignName', itemIndex) as string;
			const body = {
				data: {
					type: 'campaign',
					attributes: { name: campaignName },
				},
			};
			return await klaviyoApiRequest.call(this, 'POST', '/api/campaigns', body);
		}
		if (operation === 'delete') {
			const campaignId = this.getNodeParameter('campaignId', itemIndex) as string;
			await klaviyoApiRequest.call(this, 'DELETE', `/api/campaigns/${campaignId}`);
			return {};
		}
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
		if (operation === 'update') {
			const campaignId = this.getNodeParameter('campaignId', itemIndex) as string;
			const campaignName = this.getNodeParameter('campaignName', itemIndex) as string;
			const body = {
				data: {
					type: 'campaign',
					id: campaignId,
					attributes: { name: campaignName },
				},
			};
			return await klaviyoApiRequest.call(this, 'PATCH', `/api/campaigns/${campaignId}`, body);
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
		if (operation === 'upload') {
			const imageName = this.getNodeParameter('imageName', itemIndex) as string;
			const imageData = this.getNodeParameter('imageData', itemIndex) as string;
			const body = {
				data: {
					type: 'image',
					attributes: {
						name: imageName,
						image: imageData,
					},
				},
			};
			return await klaviyoApiRequest.call(this, 'POST', '/api/images', body);
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
		if (operation === 'queryAggregates') {
			const metricId = this.getNodeParameter('metricId', itemIndex) as string;
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(
				this,
				'GET',
				`/api/metrics/${metricId}/query/aggregates`,
				undefined,
				qs,
			);
			return (Array.isArray(response) ? response : [response]) as IDataObject[];
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleTag(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[]> {
		if (operation === 'create') {
			const tagName = this.getNodeParameter('tagName', itemIndex) as string;
			const body = { data: { type: 'tag', attributes: { name: tagName } } };
			return await klaviyoApiRequest.call(this, 'POST', '/api/tags', body);
		}
		if (operation === 'delete') {
			const tagId = this.getNodeParameter('id', itemIndex) as string;
			await klaviyoApiRequest.call(this, 'DELETE', `/api/tags/${tagId}`);
			return {};
		}
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
		if (operation === 'update') {
			const tagId = this.getNodeParameter('id', itemIndex) as string;
			const tagName = this.getNodeParameter('tagName', itemIndex) as string;
			const body = { data: { type: 'tag', id: tagId, attributes: { name: tagName } } };
			return await klaviyoApiRequest.call(this, 'PATCH', `/api/tags/${tagId}`, body);
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleCouponCode(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[]> {
		if (operation === 'create') {
			const couponId = this.getNodeParameter('couponId', itemIndex) as string;
			const code = this.getNodeParameter('code', itemIndex) as string;
			const body = {
				data: {
					type: 'coupon-code',
					attributes: { code },
					relationships: {
						coupon: {
							data: { type: 'coupon', id: couponId },
						},
					},
				},
			};
			return await klaviyoApiRequest.call(this, 'POST', '/api/coupon-codes', body);
		}
		if (operation === 'delete') {
			const couponCodeId = this.getNodeParameter('couponCodeId', itemIndex) as string;
			await klaviyoApiRequest.call(this, 'DELETE', `/api/coupon-codes/${couponCodeId}`);
			return {};
		}
		if (operation === 'get') {
			const couponCodeId = this.getNodeParameter('couponCodeId', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/coupon-codes/${couponCodeId}`);
		}
		if (operation === 'getMany') {
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(
				this,
				'GET',
				'/api/coupon-codes',
				undefined,
				qs,
			);
			return (response as IDataObject).data as IDataObject[];
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleForm(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[]> {
		if (operation === 'get') {
			const formId = this.getNodeParameter('formId', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/forms/${formId}`);
		}
		if (operation === 'getMany') {
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(this, 'GET', '/api/forms', undefined, qs);
			return (response as IDataObject).data as IDataObject[];
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleReview(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[]> {
		if (operation === 'get') {
			const reviewId = this.getNodeParameter('reviewId', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/reviews/${reviewId}`);
		}
		if (operation === 'getMany') {
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(this, 'GET', '/api/reviews', undefined, qs);
			return (response as IDataObject).data as IDataObject[];
		}
		if (operation === 'update') {
			const reviewId = this.getNodeParameter('reviewId', itemIndex) as string;
			const status = this.getNodeParameter('reviewStatus', itemIndex) as string;
			const body = { data: { type: 'review', id: reviewId, attributes: { status } } };
			return await klaviyoApiRequest.call(this, 'PATCH', `/api/reviews/${reviewId}`, body);
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleCatalogCategories(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[]> {
		if (operation === 'create') {
			const categoryName = this.getNodeParameter('name', itemIndex) as string;
			const body = {
				data: {
					type: 'category',
					attributes: {
						name: categoryName,
					},
				},
			};
			return await klaviyoApiRequest.call(this, 'POST', '/api/catalog/categories', body);
		}
		if (operation === 'delete') {
			const categoryId = this.getNodeParameter('id', itemIndex) as string;
			await klaviyoApiRequest.call(this, 'DELETE', `/api/catalog/categories/${categoryId}`);
			return {};
		}
		if (operation === 'get') {
			const categoryId = this.getNodeParameter('id', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/catalog/categories/${categoryId}`);
		}
		if (operation === 'getMany') {
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(
				this,
				'GET',
				'/api/catalog/categories',
				undefined,
				qs,
			);
			return (response as IDataObject).data as IDataObject[];
		}
		if (operation === 'update') {
			const categoryId = this.getNodeParameter('id', itemIndex) as string;
			const categoryName = this.getNodeParameter('name', itemIndex) as string;
			const body = {
				data: {
					type: 'category',
					id: categoryId,
					attributes: {
						name: categoryName,
					},
				},
			};
			return await klaviyoApiRequest.call(
				this,
				'PATCH',
				`/api/catalog/categories/${categoryId}`,
				body,
			);
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleCatalogItems(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[]> {
		if (operation === 'create') {
			const itemName = this.getNodeParameter('name', itemIndex) as string;
			const body = {
				data: {
					type: 'item',
					attributes: {
						name: itemName,
					},
				},
			};
			return await klaviyoApiRequest.call(this, 'POST', '/api/catalog/items', body);
		}
		if (operation === 'delete') {
			const itemId = this.getNodeParameter('id', itemIndex) as string;
			await klaviyoApiRequest.call(this, 'DELETE', `/api/catalog/items/${itemId}`);
			return {};
		}
		if (operation === 'get') {
			const itemId = this.getNodeParameter('id', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/catalog/items/${itemId}`);
		}
		if (operation === 'getMany') {
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(
				this,
				'GET',
				'/api/catalog/items',
				undefined,
				qs,
			);
			return (response as IDataObject).data as IDataObject[];
		}
		if (operation === 'update') {
			const itemId = this.getNodeParameter('id', itemIndex) as string;
			const itemName = this.getNodeParameter('name', itemIndex) as string;
			const body = {
				data: {
					type: 'item',
					id: itemId,
					attributes: {
						name: itemName,
					},
				},
			};
			return await klaviyoApiRequest.call(this, 'PATCH', `/api/catalog/items/${itemId}`, body);
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleCatalogVariants(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[]> {
		if (operation === 'create') {
			const variantName = this.getNodeParameter('name', itemIndex) as string;
			const body = {
				data: {
					type: 'variant',
					attributes: {
						name: variantName,
					},
				},
			};
			return await klaviyoApiRequest.call(this, 'POST', '/api/catalog/variants', body);
		}
		if (operation === 'delete') {
			const variantId = this.getNodeParameter('id', itemIndex) as string;
			await klaviyoApiRequest.call(this, 'DELETE', `/api/catalog/variants/${variantId}`);
			return {};
		}
		if (operation === 'get') {
			const variantId = this.getNodeParameter('id', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/catalog/variants/${variantId}`);
		}
		if (operation === 'getMany') {
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(
				this,
				'GET',
				'/api/catalog/variants',
				undefined,
				qs,
			);
			return (response as IDataObject).data as IDataObject[];
		}
		if (operation === 'update') {
			const variantId = this.getNodeParameter('id', itemIndex) as string;
			const variantName = this.getNodeParameter('name', itemIndex) as string;
			const body = {
				data: {
					type: 'variant',
					id: variantId,
					attributes: {
						name: variantName,
					},
				},
			};
			return await klaviyoApiRequest.call(
				this,
				'PATCH',
				`/api/catalog/variants/${variantId}`,
				body,
			);
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleCustomMetric(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[]> {
		if (operation === 'create') {
			const metricName = this.getNodeParameter('customMetricName', itemIndex) as string;
			const body = {
				data: {
					type: 'custom-metric',
					attributes: {
						name: metricName,
					},
				},
			};
			return await klaviyoApiRequest.call(this, 'POST', '/api/custom-metrics', body);
		}
		if (operation === 'get') {
			const metricId = this.getNodeParameter('id', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/custom-metrics/${metricId}`);
		}
		if (operation === 'getMany') {
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(
				this,
				'GET',
				'/api/custom-metrics',
				undefined,
				qs,
			);
			return (response as IDataObject).data as IDataObject[];
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleFlowAction(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[]> {
		if (operation === 'get') {
			const actionId = this.getNodeParameter('id', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/flow-actions/${actionId}`);
		}
		if (operation === 'getMany') {
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(
				this,
				'GET',
				'/api/flow-actions',
				undefined,
				qs,
			);
			return (response as IDataObject).data as IDataObject[];
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleFlowMessage(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[]> {
		if (operation === 'get') {
			const messageId = this.getNodeParameter('id', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/flow-messages/${messageId}`);
		}
		if (operation === 'getMany') {
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(
				this,
				'GET',
				'/api/flow-messages',
				undefined,
				qs,
			);
			return (response as IDataObject).data as IDataObject[];
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleFormVersion(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[]> {
		if (operation === 'get') {
			const versionId = this.getNodeParameter('id', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/form-versions/${versionId}`);
		}
		if (operation === 'getMany') {
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(
				this,
				'GET',
				'/api/form-versions',
				undefined,
				qs,
			);
			return (response as IDataObject).data as IDataObject[];
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}

	private async handleMappedMetric(
		this: IExecuteFunctions & KlaviyoApi,
		itemIndex: number,
		operation: string,
	): Promise<IDataObject | IDataObject[]> {
		if (operation === 'get') {
			const metricId = this.getNodeParameter('id', itemIndex) as string;
			return await klaviyoApiRequest.call(this, 'GET', `/api/mapped-metrics/${metricId}`);
		}
		if (operation === 'getMany') {
			const qs: IDataObject = {};
			const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = this.getNodeParameter('limit', itemIndex) as number;

			if (!returnAll) qs['page[size]'] = limit;

			const response = await klaviyoApiRequest.call(
				this,
				'GET',
				'/api/mapped-metrics',
				undefined,
				qs,
			);
			return (response as IDataObject).data as IDataObject[];
		}
		throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}
}
