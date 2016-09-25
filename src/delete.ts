function del(model, methods = {}){
    const { validate, after, onValidationError } = methods;
    return async (modelId, request) => {
        if(!modelId) throw new Error('Missing model id attribute');

        if (validate) {
            try { await validate(modelId, request) }
            catch(error){ return onValidationError ? await onValidationError(error, request) : error }
        }

        const result = await new model({[model.prototype.idAttribute]: modelId}).destroy();
        return after ? await after(result, request) : result;
    }
}
