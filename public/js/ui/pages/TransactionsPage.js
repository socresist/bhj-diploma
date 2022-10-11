
class TransactionsPage {

  constructor(element) {
    if (!element) {
      throw new Error('element is not the DOM element');
    }
    this.element = element;
    this.lastOptions = null;
    this.registerEvents();
  }

  
  update() {
    if (this.lastOptions) {
      this.render(this.lastOptions);
    }
  }


  registerEvents() {
    this.removeTransactionBtns = this.element.getElementsByClassName('transaction__remove');
    this.removeAccountBtn = this.element.querySelector('.remove-account');
    this.removeAccountBtn.onclick = this.removeAccount.bind(this);
    [...this.removeTransactionBtns].forEach((btn) => {
      const dataId = btn.dataset.id;
      btn.addEventListener('click', () => {
        this.removeTransaction(dataId);
      });
    });
  }


  removeAccount() {
    if (
      confirm(`Are you sure you want to remove account id: ${this.lastOptions.account_id}?`)
    ) {
      Account.remove({
        id: this.lastOptions.account_id
      }, (err, response) => {
        if (response.success) {
          this.clear();
          App.updateWidgets();
        } else {
          console.error(err);
        }
      });
    }
  }


  removeTransaction(id) {
    Transaction.remove({
        account_id: this.lastOptions.account_id,
        id,
      },
      (err, response) => {
        if (response.success) {
          App.update();
        } else {
          console.error(err);
        }
      },
    );
  }


  render(options) {
    this.lastOptions = {
      ...options
    };
    if (!options) {
      return;
    }
    Account.get(options.account_id, (err, response) => {
      if (response.success) {
        this.renderTitle(response.data.name);
        Transaction.list(options, (err, response) => {
          if (response.success) {
            this.renderTransactions(response.data);
            this.registerEvents();
          } else {
            console.error(err);
          }
        });
      } else {
        console.error(err);
      }
    });
  }


  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }


  renderTitle(name) {
    const title = this.element.querySelector('.content-title');
    title.textContent = name;
  }


  formatDate(date) {
    const [day, time] = new Date(date)
      .toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
      .split(', ');

    return `${day} в ${time}`;
  }


  getTransactionHTML(item) {
    const classname = item.type === 'income' ? 'transaction_income' : 'transaction_expense';
    const template = `
    <div class="transaction ${classname} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
              <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
              <h4 class="transaction__title">${item.name}</h4>
              <div class="transaction__date">${this.formatDate(item.created_at)}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
            ${item.sum}  <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
            <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                <i class="fa fa-trash"></i>  
            </button>
        </div>
    </div>`;
    return template;
  }


  renderTransactions(data) {
    const content = this.element.querySelector('.content');
    content.innerHTML = '';
    if (!data.length) {
      return;
    }

    data.forEach((item) => {
      content.innerHTML += this.getTransactionHTML(item);
    });
  }
}