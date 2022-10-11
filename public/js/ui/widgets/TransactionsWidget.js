

class TransactionsWidget {
 
  constructor(element) {
    if (!element) {
      throw new Error('element is not the DOM element');
    }
    this.element = element;
    this.registerEvents();
  }
 
  registerEvents() {
    const newIncome = this.element.querySelector('.create-income-button');
    const newExpense = this.element.querySelector('.create-expense-button');

    newIncome.addEventListener('click', (e) => {
      App.getModal('newIncome').open();
    });

    newExpense.addEventListener('click', (e) => {
      App.getModal('newExpense').open();
    });
  }
}