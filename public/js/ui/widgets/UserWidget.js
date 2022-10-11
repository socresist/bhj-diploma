

class UserWidget {
 
  constructor(element) {
    if (!element) {
      throw new Error('element must be DOM element');
    }
    this.element = element;
    this.userNameEl = element.querySelector('.user-name');
  }


  update() {
    const curretnUser = User.current();
    if (curretnUser) {
      this.userNameEl.innerText = curretnUser.name;
    }
  }
}