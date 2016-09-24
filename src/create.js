const create = (saveFunction) => (model, methods, patch) => {
    const {
        requiredAttributes,
        allowedAttributes,
        validate,
        before,
        after,
        onError,
        onMissingAttributes,
        onValidationError,
    } = methods;
    return async (newModel, request) => {
        try {
            if (requiredAttributes) {
                let missingAttributes = requiredAttributes.filter(attr => newModel[attr] === undefined);
                if (missingAttributes.length > 0) {
                    const defaultErrorString = missingAttributes.reduce((string, attribute, i) => {
                        return string + ` ${attribute}${i === missingAttributes.length - 1 ? '.' : ','}`;
                    }, 'Missing attributes:');
                    return defaultErrorString;
                }
            }

            if (validate) {
                try { await validate(newModel, request) }
                catch(error) { return onValidationError ? await onValidationError(error, request) : error }
            }

            if (allowedAttributes) {
                newModel = allowedAttributes.reduce((formattedModel, attribute) => {
                    if (newModel[attribute]) formattedModel[attribute] = newModel[attribute];
                    return formattedModel;
                }, {})
            }
            const transformedModel = before ?  await before(newModel, request) : newModel;
            const insertedModel = await saveFunction(model, transformedModel, request);
            return after ? await after(insertedModel, request) : insertedModel;
        }

        catch(error){
            if (onError) return await onError(error, request);
            else throw new Error(error);
        }

    }
}
export default create;
