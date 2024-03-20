import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class PartyUI extends DDD {
  static get tag() {
    return 'party-ui';
  }

  constructor() {
  }

  static get styles() {
    return [
      super.styles,
      css`
      :host {
        display: block;
      }
      .my-div {
        padding: var(--ddd-spacing-5);
        margin: var(--ddd-spacing-2) var(--ddd-spacing-0);
        color: var(--ddd-theme-default-keystoneYellow);
      }
    `];
  }

  render() {
    return html`
    <div>
    </div>
    `;
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String }
    }
  }
}

customElements.define(PartyUI.tag, PartyUI);