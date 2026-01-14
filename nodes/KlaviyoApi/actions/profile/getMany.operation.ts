import type { INodeProperties, IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { klaviyoApiRequest } from '../../transport';

export const description: INodeProperties[] = [];

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject[]> {
	const qs: IDataObject = {};
	const returnAll = this.getNodeParameter('returnAll', index) as boolean;
	const limit = this.getNodeParameter('limit', index) as number;
	const filter = this.getNodeParameter('filter', index) as string;

	if (!returnAll) qs['page[size]'] = limit;
	if (filter) qs.filter = filter;

	const response = await klaviyoApiRequest.call(this, 'GET', '/api/profiles', undefined, qs);
	return (response as IDataObject).data as IDataObject[];
}
