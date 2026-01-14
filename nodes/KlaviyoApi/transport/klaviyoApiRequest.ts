import type {
	IHookFunctions,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
	IDataObject,
	IHttpRequestOptions,
} from 'n8n-workflow';

export async function klaviyoApiRequest(
	this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	resource: string,
	body: IDataObject | undefined = undefined,
	qs: IDataObject = {},
): Promise<IDataObject> {
	const options: IHttpRequestOptions = {
		method,
		qs,
		url: `https://a.klaviyo.com${resource}`,
		json: true,
	};

	if (body) {
		options.body = body;
	}

	return this.helpers.httpRequestWithAuthentication.call(this, 'klaviyoApi', options) as Promise<IDataObject>;
}

