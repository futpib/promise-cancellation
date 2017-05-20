class ForeverThenable {
	then() {}
}

const forever = new ForeverThenable();

const _cancelled = Symbol('_cancelled');

const Token = function () {
	const self = function (v) {
		if (self.isCancelled()) {
			return forever;
		}
		return v;
	};
	self.isCancelled = () => Boolean(self[_cancelled]);
	return self;
};

class Cancellation {
	constructor() {
		this.token = new Token();
	}

	cancel() {
		this.token[_cancelled] = true;
	}
}

module.exports = {Cancellation};
