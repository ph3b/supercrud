const get = (getFunction) => (model, methods = {}) => {
    const { after } = methods;
    return async (request) => {
        const { options } = methods;
        const rows = await getFunction(model, request, options);
        return after ? await after(rows, request) : rows;
    }
}
export default get;
