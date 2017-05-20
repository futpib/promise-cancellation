# promise-cancellation

[![Build Status](https://travis-ci.org/futpib/promise-cancellation.svg?branch=master)](https://travis-ci.org/futpib/promise-cancellation)

Nice cancellation for any Promise/A+ implementation

* "Cancelled" promises are forever 'pending'
* Can be used with any Promise/A+

# Install
As usual:

```
yarn add promise-cancellation
```

or

```
npm install promise-cancellation
```

# Example

```js

import {Cancellation} from 'promise-cancellation';

function main() {
	const cancellation = new Cancellation();
	
	doSomething(cancellation.token);
	
	if (youChangedYourMind) {
		cancellation.cancel();
	}
}

function doSomething(cancellationToken) {
	return doOneThing()

		// will hang if cancelled, otherwise will act as identity
		.then(cancellationToken)

		.then(doOtherThing);
}

async function doSomethingAsyncAwait(cancellationToken) {
	await doOneThing();

	// as above, this will never resolve if cancelled
	await cancellationToken;

	await doOtherThing();
}

async function doSomethingAgain(cancellationToken) {
	await doOneThing();

	if (cancellationToken.isCancelled()) {
		return;
	}

	await doOtherThing();
}

```