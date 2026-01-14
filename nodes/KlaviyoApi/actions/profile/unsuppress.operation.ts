import type { INodeProperties, IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { klaviyoApiRequest } from '../../transport';

export const description: INodeProperties[] = [];

export async function execute(this: IExecuteFunctions, index: number): Promise<IDataObject> {
	const profileId = this.getNodeParameter('profileId', index) as string;
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
