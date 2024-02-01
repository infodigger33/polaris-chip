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
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`<div>${this.title}</div>`;
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
