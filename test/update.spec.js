import Supercrud from '../src/index.js';

describe('Update handler', () => {

    it('Should create a CRUD utility with an update handler', () => {
        const CRUD = Supercrud({ updateFunction: (model, modelObject) => new model(modelObject).save()});
        expect(Object.keys(CRUD)).toEqual(['update']);
    })

    describe('Update handler tests', function() {
        beforeEach(() => {
            this.updateFunction = (model, modelObject, request) => model.save(modelObject);
            this.CRUD = Supercrud({updateFunction: this.updateFunction});
        });

        it('Should transform and save model', async () => {
            const { update } = this.CRUD;
            const mockModel = { save: jest.fn().mockReturnValue({name: 'Matt', created_by: 'rebekka', id: 1}) };
            const mockReq = { username: 'rebekka'}
            const updateHandler = update(mockModel, {
                before: (inputModel, req) => Object.assign({}, inputModel, { created_by: req.username }),
                after: (savedModel) => ({ message: 'User created', user: savedModel })
            });
            const actual = await updateHandler({name: 'Matt'}, mockReq);
            // Chek that the updateHandler returned the object from the after-function.
            expect(actual).toEqual({
                message: 'User created',
                user: { name: 'Matt', created_by: 'rebekka', id: 1 }
            });
            // Check that our call function was called with the result of the before-function
            expect(mockModel.save).toBeCalledWith({ name: 'Matt', created_by: 'rebekka'})
        })
        // We skip more tests here because everything is covered in the create.spec.js

    })

})
