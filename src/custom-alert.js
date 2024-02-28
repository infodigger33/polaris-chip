import { LitElement, html, css } from 'lit';

export class CustomAlert extends LitElement {
  static get tag() {
    return 'custom-alert';
  }

  constructor() {
    super();
    this.open = true;
    this.status = 'notice';
    this.date = '';
    this.sticky = false;

    // Check localStorage for the status and update if it's closed
    const storedStatus = localStorage.getItem('alertStatus');
    if (storedStatus === 'closed') {
      this.open = false;
      this.style.setProperty('--custom-alert-height', '50px');
    }
  }

  static get styles() {
    return css`
      :host([sticky]) {
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      :host([open]) .alert-content {
        max-height: var(--custom-alert-height);
      }

      :host([status="notice"]) .alert-content {
        background-color: var(--custom-alert-notice-bg, var(--custom-alert-bg, #3498db));
      }

      :host([status="warning"]) .alert-content {
        background-color: var(--custom-alert-warning-bg, var(--custom-alert-bg, #f39c12));
      }

      :host([status="alert"]) .alert-content {
        background-color: var(--custom-alert-alert-bg, var(--custom-alert-bg, #e74c3c));
      }

      .alert-content {
        padding: 10px;
        height: var(--custom-alert-height, 100px);
        overflow: hidden;
        transition: all 0.3s ease;
        color: #fff;
      }

      .closed .alert-content {
        height: var(--custom-alert-closed-height, var(--custom-alert-height, 50px));
      }

      @media (max-width: 600px) {
        :host([sticky]) .alert-content {
          position: sticky;
          top: 0;
        }
      }

      .toggle-button {
        cursor: pointer;
        border: none;
        background: none;
        color: #fff;
        font-size: 14px;
      }
    `;
  }

  toggleAlert() {
    this.open = !this.open;

    if (!this.open) {
      this.style.setProperty('--custom-alert-height', '50px');
      localStorage.setItem('alertStatus', 'closed');
    } else {
      this.style.removeProperty('--custom-alert-height');
      localStorage.removeItem('alertStatus');
    }
  }

  render() {
    return html`
      <div class="alert-content ${this.open ? '' : 'closed'}" ?sticky="${this.sticky}">
        <div class="toggle-button" @click="${this.toggleAlert}">
          ${this.open ? 'Close' : 'Open'} Alert
        </div>
        <slot></slot>
        <div class="date">${this.date}</div>
      </div>
    `;
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      status: { type: String },
      date: { type: String },
      sticky: { type: Boolean, reflect: true },
    };
  }
}

customElements.define(CustomAlert.tag, CustomAlert);