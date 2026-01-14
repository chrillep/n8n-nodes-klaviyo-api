import type { INodeProperties, IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { klaviyoApiRequest } from '../../transport';

export const description: INodeProperties[] = [];

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject> {
	const profileId = this.getNodeParameter('profileId', index) as string;
	return await klaviyoApiRequest.call(this, 'GET', `/api/profiles/${profileId}`);
}
