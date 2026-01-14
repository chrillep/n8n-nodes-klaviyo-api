import type { INodeProperties, IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { klaviyoApiRequest } from '../../transport';

export const description: INodeProperties[] = [];

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject> {
	const profileId = this.getNodeParameter('profileId', index) as string;
	const listId = this.getNodeParameter('listId', index) as string;
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
