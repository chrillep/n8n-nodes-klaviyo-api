import type { INodeProperties, IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { klaviyoApiRequest } from '../../transport';

export const description: INodeProperties[] = [];

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject> {
	const email = this.getNodeParameter('email', index) as string;
	const attributes: IDataObject = { email };

	const firstName = this.getNodeParameter('firstName', index) as string;
	if (firstName) attributes.first_name = firstName;

	const lastName = this.getNodeParameter('lastName', index) as string;
	if (lastName) attributes.last_name = lastName;

	const body = { data: [{ type: 'profile', attributes }] };
	return await klaviyoApiRequest.call(this, 'POST', '/api/profile-import/bulk', body);
}
