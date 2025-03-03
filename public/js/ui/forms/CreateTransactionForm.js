/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    if (User.current()) {
      Account.list(User.current(), (err, response) => {
        if (response.success) {
          this.updateSelect(response.data);
        } else {
          console.error(err);
        }
      });
    }
  }

  updateSelect(data) {
    const select = this.element.querySelector('select');

    if (select) {
      select.innerHTML = '';
      data.forEach((item) => {
        select.options.add(this.getOptionElement(item));
      });
    }
  }

  getOptionElement(obj) {
    const option = document.createElement('option');
    option.innerText = obj.name;
    option.value = obj.id;

    return option;
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        App.update();
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
      } else {
        console.error(err);
      }
    });
  }
}