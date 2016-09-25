import Supercrud from '../src/index';

describe('Delete handler', () => {

    it('Should create a deleteHandler creator', () => {
        const CRUD = Supercrud({ deleteFunction: () => {}});
        expect(Object.keys(CRUD)).toEqual(['del']);
    })

    it('Should call the delete function', async () => {
        const { del } = Supercrud({ deleteFunction: (model, request) => model.del({id: 5}) })
        const mockModel = { del: jest.fn().mockReturnValue('Deleted model from db.') };
        const mockRequest = { id: 5 };
        const deleteHandler = del(mockModel, {
            after: (model, result) => ({message: 'Deleted model', result })
        });
        const actual = await deleteHandler(mockRequest);
        expect(actual).toEqual({ message: 'Deleted model', result: 'Deleted model from db.' });
        expect(mockModel.del).toBeCalledWith({id: 5});
    })

    it('Should call validate function and not delete function', async () => {
        const { del } = Supercrud({ deleteFunction: (model, request) => model.del({id: 5}) })
        const mockModel = { del: jest.fn().mockReturnValue('Deleted model from db.') };
        const mockRequest = { id: 5 };
        const deleteHandler = del(mockModel, {
            validate: (request) => {
                if(!request.email) throw new Error('You are not authorized to do this.')
            },
            after: (result) => ({message: 'Deleted model', result })
        });
        const actual = await deleteHandler(mockRequest);
        expect(actual).toEqual('You are not authorized to do this.');
        expect(mockModel.del.mock.calls.length).toBe(0);
    })

    it('Should call validate and onValidation function and not delete function', async () => {
        const { del } = Supercrud({ deleteFunction: (model, request) => model.del({id: 5}) })
        const mockModel = { del: jest.fn().mockReturnValue('Deleted model from db.') };
        const mockRequest = { id: 5 };
        const deleteHandler = del(mockModel, {
            validate: (request) => {
                if(!request.email) throw new Error('You are not authorized to do this.')
            },
            onValidationError: (error) => ({ message: error.message }),
            after: (result) => ({message: 'Deleted model', result })
        });
        const actual = await deleteHandler(mockRequest);
        expect(actual).toEqual({ message: 'You are not authorized to do this.' });
        expect(mockModel.del.mock.calls.length).toBe(0);
    })

})
