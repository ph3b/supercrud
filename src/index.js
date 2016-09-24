import Create from './create.js';
import get from './get.js';
import create from './create.js';

const HandlerMaker = ({
    saveFunction,
    getFunction,
    getWithQuery,
    updateFunction,
    deleteFunction
}) => {
    const utility = {};
    if (getFunction) utility.get = get(getFunction);
    if (saveFunction) utility.create = create(saveFunction);
    return utility;
}

export default HandlerMaker;
