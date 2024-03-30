import { LitElement, html, css } from 'lit';

export class CampusAlert extends LitElement {
  static get tag() {
    return 'campus-alert';
  }

  constructor() {
    super();
    this.open = true;
    this.sticky = false;
    this.status = 'notice';
    this.date = ''; 

    // Check localStorage for the status and update if it's closed
    if (localStorage.getItem('alertStatus') === 'closed') {
      this.open = false;

      this.style.setProperty('--display-type', 'none');
      this.style.setProperty('--min-banner-height', '6.5vh');
      this.style.setProperty('--display-other', 'flex');

    } else {
      this.open = true;

      this.style.setProperty('--display-type', 'unset');
      this.style.setProperty('--min-banner-height', '15vh');
      this.style.setProperty('--display-other', 'none');
    }
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        --display-type: unset;
        --display-other: none;  
        width: 100%;
        min-height: var(--min-banner-height, 15vh);
        overflow: hidden;
      }

      :host([sticky]) {
        position: sticky;
        top: 0;
        z-index: 9999;
      }

      :host([status="notice"]) {
        --general-background-color: #3498db;
        --text-background-color: #74b6df;
      }

      :host([status="warning"]) {
        --general-background-color: #f39c12;
        --text-background-color: #eebc6a;
      }

      :host([status="alert"]) {
        --general-background-color: #e74c3c;
        --text-background-color: #dd7668;
      }

      .alert-container {
        background-color: var(--general-background-color);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .left-section {
        font-weight: bold;
        color: white;
        width: 150px;
        text-transform: uppercase;
        font-size: 1.1rem;
        margin: 0 32px;
        display: var(--display-type);
      }

      .middle-section {
        background-color: var(--text-background-color);
        width: 50%;
        height: 100%;
        transform: skew(20deg);
        display: var(--display-type)
      }

      :host .middle-section:before {
        border-bottom: 25px solid var(--text-background-color);
      } 

      .middle-section-styles {
        transform: skew(-20deg);
        font-weight: bold;
        display: flex;
        position: relative;
        height: 100%;
      }

      .middle-section:before {
        content: " ";
        width: 0;
        height: 0;
        position: absolute;
        bottom: 1.5rem;
        left: -1.5rem;
        border-left: 35px solid transparent;
        border-right: 0px solid transparent;
      }

      .middle-section-text, .middle-section-text slot {
        padding: 32px 72px;
        font-size: 1.1rem;
        line-height: 1.2rem;
        font-style: italic;
        width: 100%;
        color: #ffffff;
      }

      .exclamation-icon {
        height: 75px;
        position: absolute;
        top: 24px;
        left: 8px;
      }

      .right-section-text {
        font-weight: bold;
        color: white;
        width: 150px;
        text-transform: uppercase;
        font-size: 1.1rem;
        margin: 0 32px;
        display: var(--display-type);
      }

      .closed-state {
        font-weight: bold;
        font-style: italic;
        font-size: 1.1rem;
        display: var(--display-other);
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        color: white;
      }

      .closed-state button {
        display: var(--display-other);
      }

      .closed-state button, #open-state button {
        background: none;
        font-weight: bold;
        font-style: italic;
        font-size: 1.1rem;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        color: white;
        border: none;
        cursor: pointer;
      }
    `;
  }

  toggleAlert() {
    this.open = !this.open;

    if (!this.open) {
      localStorage.setItem('alertStatus', 'closed');
      this.style.setProperty('--display-type', 'none');
      this.style.setProperty('--min-banner-height', '6.5vh');
      this.style.setProperty('--display-other', 'flex');

      this.shadowRoot.querySelector('#open-button').focus();

    } else {
      localStorage.removeItem('alertStatus');
      this.style.setProperty('--display-type', 'unset');
      this.style.setProperty('--min-banner-height', '15vh');
      this.style.setProperty('--display-other', 'none');

      this.shadowRoot.querySelector('#close-button').focus();
    }
  }

  render() {
    return html`
      <div class="alert-container" ?sticky="${this.sticky}">

        <div class="closed-state">
          <button id="open-button" @click="${this.toggleAlert}">ALERT</button>
        </div>

        <div class="left-section">
          ${this.date}
        </div>

        <div class="middle-section">
          <div class="middle-section-styles">
            <div class="exclamation-icon">
              <svg fill="#ffffff" height="38px" width="38px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 27.963 27.963" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="c129_exclamation"> <path d="M13.983,0C6.261,0,0.001,6.259,0.001,13.979c0,7.724,6.26,13.984,13.982,13.984s13.98-6.261,13.98-13.984 C27.963,6.259,21.705,0,13.983,0z M13.983,26.531c-6.933,0-12.55-5.62-12.55-12.553c0-6.93,5.617-12.548,12.55-12.548 c6.931,0,12.549,5.618,12.549,12.548C26.531,20.911,20.913,26.531,13.983,26.531z"></path> <polygon points="15.579,17.158 16.191,4.579 11.804,4.579 12.414,17.158 "></polygon> <path d="M13.998,18.546c-1.471,0-2.5,1.029-2.5,2.526c0,1.443,0.999,2.528,2.444,2.528h0.056c1.499,0,2.469-1.085,2.469-2.528 C16.441,19.575,15.468,18.546,13.998,18.546z"></path> </g> <g id="Capa_1_207_"> </g> </g> </g></svg>
            </div>
            <div class="middle-section-text">
              <slot></slot>
            </div>
          </div>
        </div>

        <div class="right-section">
          <div id="open-state" class="right-section-text">
              <button id="close-button" @click="${this.toggleAlert}">✕ CLOSE</button>
          </div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      sticky: { type: Boolean, reflect: true },
      status: { type: String, reflect: true },
      date: { type: String },
    };
  }
}

globalThis.customElements.define(CampusAlert.tag, CampusAlert);