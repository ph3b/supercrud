const del = deleteFunction => (model, methods = {}) => {
    const { validate, after, onValidationError } = methods;
    return async (request) => {
        if (validate) {
            try { await validate(model, request) }
            catch(error){ return onValidationError ? await onValidationError(error, request) : error.message }
        }

        const result = await deleteFunction(model, request);
        return after ? await after(model, result, request) : result;
    }
}
export default del;
