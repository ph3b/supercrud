import Supercrud from '../src/index.js';

describe('GET handler', () => {

    it('Should create CRUD utility with a get handler', () => {
        const CRUD = Supercrud({getFunction: (model) => model.find()})
        expect(Object.keys(CRUD)).toEqual(['get']);
    });

    it('Get handler should call getFunction', async () => {
        // Declare the getFunction
        const getFunction = (model, request) => model.find({deleted: request.deleted});

        // Make the get crud generator
        const { get } = Supercrud({ getFunction });

        // Create some mock model for our test.
        const mockModel = { find: jest.fn().mockReturnValue(['mathias', 'rebekka']) };

        // Make the getHandler.
        const getHandler = get(mockModel, {
            after: (rows) => ({ message: 'People found', people: rows })
        });

        // Call the getHandler with queris.
        const actual = await getHandler({deleted: false});
        expect(mockModel.find).toBeCalledWith({deleted: false});
        expect(actual).toEqual({ message: 'People found', people: [ 'mathias', 'rebekka' ] })
    })

})
