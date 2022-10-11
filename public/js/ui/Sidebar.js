
class Sidebar {
  
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  
  static initToggleButton() {
    const sidebarBtnEl = document.querySelector('.sidebar-toggle');
    sidebarBtnEl.addEventListener('click', () => {
      document.body.classList.toggle('sidebar-open');
      document.body.classList.toggle('sidebar-collapse');
    });
  }


  static initAuthLinks() {
    const loginBtnEl = document.querySelector('.menu-item_login a');
    const registerBtnEl = document.querySelector('.menu-item_register a');
    const logoutBtnEl = document.querySelector('.menu-item_logout a');

    loginBtnEl.addEventListener('click', (e) => {
      e.preventDefault();
      App.getModal('login').open();
    });

    registerBtnEl.addEventListener('click', (e) => {
      e.preventDefault();
      App.getModal('register').open();
    });

    logoutBtnEl.addEventListener('click', (e) => {
      e.preventDefault();
      User.logout((err, response) => {
        if (response.success) {
          App.setState('init');
          return;
        }
        console.err(err);
      });
    });
  }
}