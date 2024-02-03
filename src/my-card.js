import { LitElement, html, css } from 'lit';

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. Get your HTML to work
 * 2. Get your CSS to workz
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "My card";
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

.card {
  max-width: 400px;
  border: 2px solid #E6AD00;
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

.card button, #control-wrapper button {
  padding: 8px 16px;
  background-color: #284C6E;
  color: #fff;
  text-decoration: none;
  border: none;
  border-radius: 4px;
}

.card button:hover, #control-wrapper button:hover {
  background-color: #0D141F;
  transition: background-color 0.3s ease;
}

.change-color {
  background-color: #d3d3d3;
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
      <img src="https://cdn.vox-cdn.com/thumbor/5TzJl6L2AINY150a4hvd-7BNYZ0=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19591281/Nittany_Lion_100232.jpg" alt="Nittany Lion Mascot" class="card-img">
      <div class="card-content">
        <h2 class="card-title">Nittany Lion</h2>
        <p class="card-description">Mascot of Pennsylvania State University</p>
        <a href="https://hax.psu.edu"><button>Details</button></a>
      </div>
    </section>
    </div>`;
  }

  static get properties() {
    return {
      title: { type: String },
      image: { type: Image },
      bodyText: { type: String },
      link: { type: String },
      // button: { type: ? },

      
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
