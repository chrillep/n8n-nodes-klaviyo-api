import type { INodeProperties, IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { klaviyoApiRequest } from '../../transport';

export const description: INodeProperties[] = [
	// No additional fields needed for getMany
];

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject> {
	return await klaviyoApiRequest.call(this, 'GET', '/api/accounts');
}
