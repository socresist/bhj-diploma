
class Modal {
  
  constructor(element) {
    if (!element) {
      throw new Error('element is not the DOM element');
    }
    this.element = element;
    this.registerEvents();
  }

 
  registerEvents() {
    [...this.element.querySelectorAll('[data-dismiss="modal"]')].forEach((modal) => {
      modal.addEventListener('click', this.onClose.bind(this));
    });
  }


  onClose(e) {
    e.preventDefault();
    this.close();
  }

  open() {
    this.element.style.display = 'block';
  }
  
  close() {
    this.element.style.display = 'none';
  }
}