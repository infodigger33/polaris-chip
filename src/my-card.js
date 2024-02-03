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
        padding: 8px 16px;
        display: none;
        margin: 2px 0;
        background-color: var(--button-color, #284C6E);
        color: #fff;
        text-decoration: none;
        border: none;
        border-radius: 4px;
      }

      .card button:hover {
        background-color: #0D141F;
        transition: background-color 0.3s ease;
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
      <section class="card">
        <img src="${this.image}" alt="${this.title}" class="card-img">
        <div class="card-content">
          <h2 class="card-title">${this.title}</h2>
          <p class="card-description">${this.bodyText}</p>
          <a href="${this.link}"><button>Details</button></a>
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
      '--border-color': { type: String },
      '--button-color': { type: String },
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);