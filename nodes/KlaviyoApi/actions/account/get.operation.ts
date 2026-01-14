import type { INodeProperties, IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { klaviyoApiRequest } from '../../transport';

export const description: INodeProperties[] = [
	{
		displayName: 'Account ID',
		name: 'id',
		type: 'string',
		required: true,
		default: '',
		description: 'The unique ID of the account',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['get'],
			},
		},
	},
];

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject> {
	const id = this.getNodeParameter('id', index) as string;
	return await klaviyoApiRequest.call(this, 'GET', `/api/accounts/${id}`);
}
