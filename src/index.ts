import Create from './create';
import get from './get';
import create from './create';

interface modelFunctions {
    saveFunction?: (model: any, request?: any) => any;
    getFunction?: (model: any, request?: any) => Promise<any>;
    getWithQueryFunction?: (model: any, request?: any) => Promise<any>;
    updateFunction?: (model: any, request?: any) => Promise<any>;
    deleteFunction?: (model: any, request?: any) => Promise<any>;
}

const HandlerMaker = async (fn: modelFunctions) => {
    
}

export default HandlerMaker;
