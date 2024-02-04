import { LitElement, html, css } from 'lit';

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "Title goes here";
    this.image = "Image goes here";
    this.bodyText = "Body Text goes here";
    this.link = "Link goes here";
    this.borderColor = "Border color goes here";
    this.buttonColor = "Button color goes here";
  }

  static get styles() {
    return css`
      :host {
        display: inline-flex;
      }

      body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        align-items: center;
        justify-content: center;
        height: 500px;
      }

      #cardlist {
        display: flex;
      }

      .card {
        max-width: 400px;
        border: 2px solid var(--border-color, #E6AD00);;
        border-radius: 8px;
        margin: 16px;
        padding: 12px;
        box-sizing: border-box;
      }

      .card-img {
        width: 100%;
        height: auto;
        border-radius: 4px;
      }

      .card-content {
        margin-top: 10px;
      }

      .card-title {
        margin: 0;
      }

      .card-description {
        margin: 10px 0;
        font-size: 16px;
      }

      .card button {
        display: none;
        margin: 2px 0;
      }

      #control-wrapper button {
        margin: 6px 0 0 6px;
      }

      .card button {
        margin: 2px 0;
        padding: 10px 15px;
        background-color: var(--button-color, #284C6E);
        color: #fff;
        font-size: 16px;
        text-decoration: none;
        border: none;
        border-radius: 4px;
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

  render() {
    return html`
    <div id="cardlist" class="card-list">
      <section class="card" style="--border-color: ${this.borderColor};">
        <img src="${this.image}" alt="${this.title}" class="card-img">
        <div class="card-content">
          <h2 class="card-title">${this.title}</h2>
          <p class="card-description">${this.bodyText}</p>
          <a href="${this.link}"><button style="--button-color: ${this.buttonColor};">Details</button></a>
        </div>
      </section>
    </div>`;
  }

  static get properties() {
    return {
      title: { type: String },
      image: { type: String },
      bodyText: { type: String },
      link: { type: String },
      borderColor: { type: String },
      buttonColor: { type: String },
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);