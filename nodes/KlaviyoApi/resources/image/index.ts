import type { INodeProperties } from 'n8n-workflow';

const showOnlyForImage = {
	resource: ['image'],
};

export const imageDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForImage },
		options: [
			{ name: 'Get', value: 'get', description: 'Get an image by ID', action: 'Get an image' },
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get multiple images',
				action: 'Get many images',
			},
			{
				name: 'Upload',
				value: 'upload',
				description: 'Upload an image',
				action: 'Upload an image',
			},
		],
		default: 'getMany',
	},
	{
		displayName: 'Image ID',
		name: 'imageId',
		type: 'string',
		default: '',
		description: 'The unique ID of the image',
		displayOptions: { show: { resource: ['image'], operation: ['get'] } },
	},
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
];
