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

	// Get request body (if applicable)
	let body = "";
	if (requestBuffer !== "" || !Array.isArray(requestBuffer)) {
		body = Buffer.from(requestBuffer).toString();
	}

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

	r.return(200, JSON.stringify(response));
}

// uncomment for us in NJS
// export default { echo }