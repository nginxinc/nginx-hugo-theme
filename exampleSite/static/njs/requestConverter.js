const requestConverter = (request) => {
    return {
        ...request,
        requestText: request.body,
        return: (status, value) => ({status, value}),
    }
}
