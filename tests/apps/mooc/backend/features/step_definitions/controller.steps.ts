import { AfterAll, BeforeAll, Given, Then } from 'cucumber';
import request from 'supertest';

import { MoocBackendApp } from '../../../../../../src/apps/mooc/backend/MoocBackendApp';

let _request: request.Test;
let application: MoocBackendApp;

Given('I send a GET request to {string}', (route: string) => {
	_request = request(application.httpServer).get(route);
});

Then('the response status code should be {int}', async (status: number) => {
	await _request.expect(status);
});

BeforeAll(() => {
	application = new MoocBackendApp();
	void application.start();
});

AfterAll(() => {
	void application.stop();
});
