import Supercrud from '../src/index.js';

describe('Create handler', () => {

    it('Should create a CRUD utility with a create handler', () => {
        const CRUD = Supercrud({ saveFunction: (model, modelObject) => new model(modelObject).save()});
        expect(Object.keys(CRUD)).toEqual(['create']);
    })

    describe('Create handler tests', function() {
        beforeEach(() => {
            this.saveFunction = (model, modelObject, request) => model.save(modelObject);
            this.CRUD = Supercrud({saveFunction: this.saveFunction});
        });

        it('Should transform and save model', async () => {
            const { create } = this.CRUD;
            const mockModel = { save: jest.fn().mockReturnValue({name: 'Matt', created_by: 'rebekka', id: 1}) };
            const mockReq = { username: 'rebekka'}
            const createHandler = create(mockModel, {
                before: (inputModel, req) => Object.assign({}, inputModel, { created_by: req.username }),
                after: (savedModel) => ({ message: 'User created', user: savedModel })
            });
            const actual = await createHandler({name: 'Matt'}, mockReq);
            // Chek that the createHandler returned the object from the after-function.
            expect(actual).toEqual({
                message: 'User created',
                user: { name: 'Matt', created_by: 'rebekka', id: 1 }
            });
            // Check that our call function was called with the result of the before-function
            expect(mockModel.save).toBeCalledWith({ name: 'Matt', created_by: 'rebekka'})
        })

        it('Should give error that attributes are missing', async () => {
            const { create } = this.CRUD;
            const mockModel = { save: jest.fn() };
            const createHandler = create(mockModel, {
                requiredAttributes: ['name', 'email', 'age']
            });
            const actual = await createHandler({name: 'matt'}, null);
            expect(actual).toEqual('Missing attributes: email, age.');
            // Make sure our save function wasn't called.
            expect(mockModel.save.mock.calls.length).toEqual(0);
        })

        it('Should return the error thrown in validation function', async () => {
            const { create } = this.CRUD;
            const mockModel = { save: jest.fn() };
            const createHandler = create(mockModel, {
                validate: (modelObject, request) => {
                    if(!Number.isInteger(modelObject.age)) throw new Error('Age must be a number');
                },
                onValidationError: (error) => error.message
            });
            const actual = await createHandler({age: '23'}, null);
            expect(actual).toEqual('Age must be a number');
            // Make sure our save function wasn't called.
            expect(mockModel.save.mock.calls.length).toEqual(0);
        })

        it('Should only save model with attributes allows in allowedAttributes', async () => {
            const { create } = this.CRUD;
            const mockModel = { save: jest.fn().mockReturnValue( {name: 'Matt', age: 23, admin: false, id: 1}) };
            const createHandler = create(mockModel, {
                allowedAttributes: ['name', 'age']
            });
            await createHandler({name: 'Matt', age: 23, admin: true}, null);
            // Check that only fields from allowedAttributes are included in the save function.
            expect(mockModel.save).toBeCalledWith({ name: 'Matt', age: 23 });
        })

        it('Should catch any arrors thrown in the function chain', async () => {
            const { create } = this.CRUD;
            const mockModel = { save: jest.fn() };
            const createHandler = create(mockModel, {
                before: (model) => {throw new Error('Some error.')},
                onError: (error) => error.message
            });
            const actual = await createHandler(null, null);
            expect(actual).toEqual('Some error.');
            // Check that only fields from allowedAttributes are included in the save function.
            expect(mockModel.save.mock.calls.length).toEqual(0);
        })

    })

})
