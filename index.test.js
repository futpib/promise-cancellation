
import test from 'ava';

import {Cancellation} from './index';

function delay(value, delay = 0) {
	return new Promise(resolve => {
		setTimeout(() => resolve(value), delay);
	});
}

test.beforeEach(t => {
	t.context.cancellation = new Cancellation();
});

test('Not cancelled token is `.then` identity', async t => {
	const {cancellation} = t.context;

	const result = await delay('foo')
		.then(cancellation.token);

	t.is(result, 'foo');
});

test('Cancelled token hangs promises forever', async t => {
	const {cancellation} = t.context;

	delay()
		.then(() => t.pass())
		.then(cancellation.token)
		.then(() => t.fail());

	cancellation.cancel();

	t.true(cancellation.token.isCancelled());

	await delay(undefined, 100);
});
