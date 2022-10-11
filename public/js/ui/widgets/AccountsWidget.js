

class AccountsWidget {
  
  constructor(element) {
    if (!element) {
      throw new Error('element is not the DOM element');
    }
    this.element = element;
    this.update();
    this.registerEvents();
  }


  registerEvents() {
    const newAccountBtnEl = document.querySelector('.create-account');
    newAccountBtnEl.addEventListener('click', (evt) => {
      evt.preventDefault();
      App.getModal('createAccount').open();
    });
    this.menuItemsLinks = [...this.element.querySelectorAll('.account')];
    this.menuItemsLinks.forEach((menuItem) => {
      menuItem.addEventListener('click', (evt) => {
        this.onSelectAccount(evt.currentTarget);
      });
    });
  }

 
  update() {
    if (User.current()) {
      Account.list(User.current(), (err, response) => {
        if (response.success) {
          this.clear();
          this.renderItem(response.data);
          this.registerEvents();
        } else {
          console.error(err);
        }
      });
    }
  }


  clear() {
    [...this.element.querySelectorAll('.account')].forEach((elem) => {
      elem.remove();
    });
  }


  onSelectAccount(element) {
    this.menuItemsLinks.forEach((link) => {
      if (link.classList.contains('active')) {
        link.classList.remove('active');
      }
    });
    element.classList.add('active');
    App.showPage('transactions', {
      account_id: element.dataset.id
    });
  }

 
  getAccountHTML(item) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const spanName = document.createElement('span');
    const spanSum = document.createElement('span');
    li.className = 'account';
    li.dataset.id = item.id;
    a.href = '#';
    a.style.display = 'flex';
    a.style.justifyContent = 'space-between';
    spanName.textContent = item.name;
    spanName.style.marginRight = '10px';
    spanSum.textContent = item.sum;
    a.appendChild(spanName);
    a.appendChild(spanSum);
    li.appendChild(a);
    return li;
  }


  renderItem(data) {
    data.forEach((item) => {
      this.element.appendChild(this.getAccountHTML(item));
    });
  }
}