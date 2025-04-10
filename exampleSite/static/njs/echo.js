function echo(r) {
	const {
		method,
		uri,
		args,
		headersIn,
		remoteAddress,
		httpVersion,
		requestText,
	} = r;

	const response = {
		method,
		uri,
		args,
		headers: headersIn,
		body: requestText,
		client: remoteAddress,
		version: httpVersion,
	};

	return r.return(200, response);
}

// uncomment for use in NJS
// export default { echo }