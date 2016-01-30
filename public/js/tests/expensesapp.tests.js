describe('Service: Expenses', function () {

    beforeEach( module( 'PersonalFinance' ) );
    
    // inject the value and set it to a local variable
    var expenses;
    beforeEach( inject( function (_expenses_) {
        expenses = _expenses_;
    }));
    
    console.log(expenses);
    
    describe( 'expenses.create() method', function () {
        it( 'it must write new expense object to two storages: expenses and expensesShowcaseTime', function () {
            
            var stateBefore = expenses.getAll();
            // define input data for create function
            var args = {
                description: 'test expense',
                categoryId: 4,
                date: new Date(),
                amount: 100,
                spentCurrencyId: 1
            }
            // call create function
            expenses.create( null, args);
            
            // get data of the same state after the tested function call
            var stateAfter = expenses.getAll();
            
            // we expect that we've got an array with one more object in it.
            expect( stateAfter.length ).toBe( stateBefore.length + 1 );

        });
    });
    
    describe( 'expenses.delete() method', function () {
        it( 'it must delete expense object from both storages: expenses and expenseShowcaseTime', function () {
            
            //create some expenses 
            for (var i = 0; i < 10; i++ ) {
                expenses.create(null, {});
            }
            // record the state before delete
            var stateBefore = expenses.getAll();
            // define object to be deleted
            var expenseToDelete = stateBefore[0];
            // call the function
            expenses.delete( null, expenseToDelete );
            
            // get the state after the function is executed
            var stateAfter = expenses.getAll();
            
            // we expect that we've got an array with one less object with it.
            expect( stateAfter.length ).toBe( stateBefore.length - 1 );
            
        });
    });

});