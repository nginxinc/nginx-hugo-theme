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

	// Construct the echo response (JSON format)
	const response = {
		method,
		uri,
		args,
		headers: headersIn,
		body: requestText,
		client: remoteAddress,
		version: httpVersion,
	};

	return r.return(200, JSON.stringify(response));
}

// uncomment for us in NJS
// export default { echo }