function chooseUpstream(r) {
    let backend;
  
    let uriParts = r.headersIn['X-Original-URI'].split('?');
    if (uriParts.length < 2) {
        return r.return(404);
    }
    
    let queryString = uriParts[1];
    let args = {};
    
    queryString.split('&').forEach(part => {
        let [key, value] = part.split('=');
        args[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });

    switch (args.token) {
        case 'A':
            backend = '127.0.0.1:8081';
            break;
        case 'B':
            backend = '127.0.0.1:8082';
            break;
        default:
            return r.return(404);
    }

    r.headersOut['X-backend'] = backend;
    return r.return(200, r.headersOut);
}

// uncomment for us in NJS
// export default { chooseUpstream };