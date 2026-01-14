import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class KlaviyoApi implements ICredentialType {
	name = 'klaviyoApi';
	displayName = 'Klaviyo API';
	icon: Icon = {
		light: 'file:../icons/klaviyo.svg',
		dark: 'file:../icons/klaviyo.dark.svg',
	};
	documentationUrl = 'https://developers.klaviyo.com/en/docs/authenticate_';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description:
				'Your Klaviyo Private API Key. You can generate one from Settings > API Keys in your Klaviyo account.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Klaviyo-API-Key {{$credentials?.apiKey}}',
				revision: '2025-10-15',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://a.klaviyo.com',
			url: '/api/accounts',
			method: 'GET',
		},
	};
}
