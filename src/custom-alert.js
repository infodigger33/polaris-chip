import { LitElement, html, css } from 'lit';

export class CustomAlert extends LitElement {
  static get tag() {
    return 'custom-alert';
  }

  constructor() {
    super();
    this.closedHeight = '50px';
    this.openHeight = '200px';
    this.open = true;
    this.status = 'notice';
    this.date = '';
    this.sticky = false;

    // Check localStorage for the status and update if it's closed
    const storedStatus = localStorage.getItem('alertStatus');
    if (storedStatus === 'closed') {
      this.open = false;
      this.style.setProperty('--alert-height', this.closedHeight);
    }
  }

  static get styles() {
    return css`
      :host([sticky]) .alert-content {
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      :host([status="notice"]) .alert-content {
        background-color: var(--notice-bg, #3498db);
      }

      :host([status="warning"]) .alert-content {
        background-color: var(--warning-bg, #f39c12);
      }

      :host([status="alert"]) .alert-content {
        background-color: var(--alert-bg, #e74c3c);
      }

      .alert-content {
        padding: 10px;
        max-height: var(--alert-height);
        overflow: hidden;
        transition: max-height 0.3s ease;
        color: #fff
      }

      .closed .alert-content {
        max-height: var(--closed-height);
      }

      @media (max-width: 600px) {
        :host([sticky]) .alert-content {
          position: sticky;
          top: 0;
        }

        .closed .alert-content {
          max-height: var(--closed-height);
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
    if (this.sticky && !this.open) {
      this.open = true;
      this.style.setProperty('--alert-height', this.openHeight);
      // Remove localStorage value when opening the alert
      localStorage.removeItem('alertStatus');
    } else {
      this.open = !this.open;
      if (this.open) {
        this.style.setProperty('--alert-height', this.openHeight);
      } else {
        this.style.setProperty('--alert-height', this.closedHeight);
        // Store the closed status in localStorage
        localStorage.setItem('alertStatus', 'closed');
      }
    }
    this.requestUpdate();
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
      closedHeight: { type: String },
      openHeight: { type: String },
    };
  }
}

customElements.define(CustomAlert.tag, CustomAlert);