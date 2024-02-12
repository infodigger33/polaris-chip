import { LitElement, html, css } from 'lit';

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "Title";
    this.image = "Image";
    this.bodyText = "Body Text";
    this.link = "Link";
    this.borderColor = "#000000";
    this.buttonColor = "#000000";
    this.fancy = false;
  }

  static get styles() {
    return css`
      :host {
        display: inline-flex;
      }

      :host([fancy]) .card {
        background-color: var(--border-color);
        color: #ffffff;
        border-radius: 8px;
        box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.4);
        margin: 16px;
      }

      details summary {
        text-align: left;
        font-size: 20px;
        padding: 8px 0;
      }

      details[open] summary {
        font-weight: bold;
      }
  
      details div {
        text-align: left;
        padding: 8px;
        height: 35px;
        overflow: auto;
      }

      #cardlist {
        display: flex;
      }

      .card {
        max-width: 400px;
        border: 2px solid var(--border-color);
        border-radius: 8px;
        margin: 16px;
        padding: 12px;
        box-sizing: border-box;
      }

      .card-img {
        width: 100%;
        height: auto;
        border-radius: 4px;
        object-fit: cover;
      }

      .card-content {
        margin-top: 10px;
      }

      .card-title {
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-height: 2.4em;
      }

      .card-description {
        margin: 10px 0;
        font-size: 16px;
      }

      .card button {
        display: none;
        margin: 10px 0;
        padding: 10px 15px;
        background-color: var(--button-color);
        color: #ffffff;
        font-size: 16px;
        text-decoration: none;
        border: none;
        border-radius: 4px;
      }

      #control-wrapper button {
        margin: 6px 0 0 6px;
      }

      .card button:hover, #control-wrapper button:hover{
        background-color: #0D141F;
        transition: background-color 0.3s ease;
      }

      .change-color {
        background-color: #70707047;
      }

      @media only screen and (max-width: 800px) and (min-width: 501px) {
        .card button {
          display: inline-block;
        }
      }

      @media only screen and (max-width: 500px) {
        .card {
          max-width: 300px;
        }

        .card-title {
          font-size: 18px;
        }

        .details-btn {
          display: inline-block;
        }
      }
    `;
  }

  openChanged(e) {
    console.log(e.newState);
    if (e.newState === "open") {
      this.setAttribute('fancy', '');
    } else {
      this.removeAttribute('fancy');
    }
  }

  render() {
    return html`
    <div id="cardlist" class="card-list">
      <section class="card" style="--border-color: ${this.borderColor};">
        <img src="${this.image}" alt="${this.title}" class="card-img">
        <div class="card-content">
          <h2 class="card-title">${this.title}</h2>
          <p class="card-description"></p>
          <details ?open="${this.fancy}" @toggle="${this.openChanged}">
            <summary>Description</summary>
            <div>
              <slot>${this.bodyText}</slot>
            </div>
            <a href="${this.link}">
              <button style="--button-color: ${this.buttonColor};">Details</button>
            </a>
          </details>
        </div>
      </section>
    </div>`;
  }

  static get properties() {
    return {
      title: { type: String, reflect: true },
      image: { type: String, reflect: true },
      bodyText: { type: String, attribute: 'body-text' },
      link: { type: String },
      borderColor: { type: String, reflect: true },
      buttonColor: { type: String, reflect: true },
      fancy: { type: Boolean, reflect: true }
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);