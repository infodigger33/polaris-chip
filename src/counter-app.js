import { LitElement, html, css } from 'lit';

export class CounterApp extends LitElement {
  static get tag() {
    return 'counter-app';
  }

  constructor() {
    super();
    this.counter = 0;
    this.min = 0;
    this.max = 100;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        text-align: center;
      }

      :host([counter="18"]) {
        color: #e74c3c;
      }

      :host([counter="21"]) {
        color: #2ecc71;
      }

      #counter {
        font-size: 40px;
        margin: 12px;
      }

      #buttons {
        display: flex;
        justify-content: center;
      }

      button {
        font-size: 18px;
        margin: 8px;
        padding: 8px 16px;
        background-color: #3498db;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      button:hover {
        background-color: #2980b9;
        transition: background-color 0.3s ease;
      }

      button:disabled {
        background-color: #bdc3c7;
        cursor: not-allowed;
      }
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('counter')) {
      this.updateCounterStyles();
      if (this.counter === 21) {
        this.makeItRain();
      }
    }
  }

  updateCounterStyles() {
    if (this.counter === this.min || this.counter === this.max) {
      this.style.color = 'yellow';
    } else {
      this.style.color = '';
    }
  }

  makeItRain() {
    import('@lrnwebcomponents/multiple-choice/lib/confetti-container.js').then((module) => {
      setTimeout(() => {
        document.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    });
  }

  increment() {
    if (this.counter < this.max) {
      this.counter++;
    }
  }

  decrement() {
    if (this.counter > this.min) {
      this.counter--;
    }
  }

  render() {
    return html`
      <div id="counter">${this.counter}</div>
      <div id="buttons">
        <button @click="${this.decrement}" ?disabled="${this.counter === this.min}">-</button>
        <button @click="${this.increment}" ?disabled="${this.counter === this.max}">+</button>
      </div>
    `;
  }

  static get properties() {
    return {
      counter: { type: Number, reflect: true },
      min: { type: Number },
      max: { type: Number },
    };
  }
}

customElements.define(CounterApp.tag, CounterApp);