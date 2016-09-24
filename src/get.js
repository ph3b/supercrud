const get = (getFunction) => (model, methods) => {
    const { after } = methods;
    return async (request) => {
        const rows = await getFunction(model, request);
        return after ? await after(rows, request) : models;
    }
}
export default get;
