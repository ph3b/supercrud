import Create from './create';
import get from './get';
import create from './create';
import update from './update';
import del from './delete';

const HandlerMaker = ({ saveFunction, getFunction, updateFunction, deleteFunction }) => {
    const utility = {};
    if (getFunction) utility.get = get(getFunction);
    if (saveFunction) utility.create = create(saveFunction);
    if (updateFunction) utility.update = update(updateFunction);
    if (deleteFunction) utility.del = del(deleteFunction);
    return utility;
}

export default HandlerMaker;
