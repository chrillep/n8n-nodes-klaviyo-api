import type { INodeProperties } from 'n8n-workflow';
const showOnlyForSegment = {
	resource: ['segment'],
};
export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForSegment },
		options: [
			{ name: 'Get', value: 'get', description: 'Get a segment by ID', action: 'Get a segment' },
			{ name: 'Get Many', value: 'getMany', description: 'Get multiple segments', action: 'Get many segments' },
			{ name: 'Get Profiles', value: 'getProfiles', description: 'Get profiles in a segment', action: 'Get profiles in a segment' },
		],
		default: 'getMany',
	},
	{
		displayName: 'Segment ID',
		name: 'segmentId',
		type: 'string',
		default: '',
		description: 'The unique ID of the segment',
		displayOptions: { show: { resource: ['segment'], operation: ['get', 'getProfiles'] } },
	},
];
