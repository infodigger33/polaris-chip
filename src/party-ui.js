import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class PartyUI extends DDD {
  static get tag() {
    return 'party-ui';
  }

  constructor() {
    super();
    this.users = [];
    this.userInput = '';
  }

  static get styles() {
    return [
      super.styles,
      css`
        .party-container {
          position: relative;
          border: 1px solid var(--ddd-theme-default-beaver70);
          border-radius: 10px;
          padding: 0px 20px 25px 20px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 0 auto;
          width: 100vw;
          height: 48vh;
        }

        .add-user-container {
          position: relative;
          margin-bottom: 20px;
        }

        .add-user-container p, .current-user-container p {
          margin-bottom: 5px;
          font-weight: bold;
        }
        
        .text-input {
          width: calc(100% - 110px);
          margin-right: 10px;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        #close-button {
          position: absolute;
          top: 0;
          right: 0;
          width: 30px;
          height: 20px;
          background-color: red;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        #close-button:hover, #close-button:focus {
          transition: ease 0.3s;
          background-color: #c00000;
        }

        #add-button {
          position: absolute;
          right: 0;
          padding: 8.5px 30px;
          border: none;
          border-radius: 5px;
          background-color: #007bff;
          color: #fff;
          cursor: pointer;
        }

        #add-button:hover, #add-button:focus {
          transition: ease 0.3s;
          background-color: #005ec2;
        }

        .current-user-container {
          margin-bottom: 20px;
        }

        .scroll-container {
          overflow: auto;
          white-space: nowrap;
        }

        .card-container {
          display: inline-block;
          vertical-align: top;
          height: auto;
          width: auto;
          margin-right: 10px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: #f9f9f9;
        }

        .card-container p {
          margin: 5px 0;
        }

        .card-container button {
          background-color: #f9f9f9;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .card-container button:hover, .card-container button:focus {
          transition: ease 0.3;
          background-color: #bebebe;
        }

        #save-button {
          position: relative;
          padding: 10px;
          width: 100%;
          background-color: #28a745;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        #save-button:hover, #save-button:focus {
          transition: ease 0.3s;
          background-color: #1b6c2e;
        }
    `];
  }

  render() {
    return html`
      <div class="party-container">
        <div class="add-user-container">
          <p><span>Add User:</span></p>
          <input type="text" class="text-input" value=${this.userInput}>
          <button id="close-button">✕</button>        
          <button id="add-button" @click="${this.addUser}">►</button>
        </div>
        <div class="current-user-container">
          <p><span>Current Users:</span></p>        
          <div class="scroll-container">
            <div class="card-container">
              <button @click="${this.userInfo}"><rpg-character></rpg-character></button>
              <button @click="${this.userInfo}"><rpg-character></rpg-character></button>
              <button @click="${this.userInfo}"><rpg-character></rpg-character></button>
              <button @click="${this.userInfo}"><rpg-character></rpg-character></button>
              <button @click="${this.userInfo}"><rpg-character></rpg-character></button>
              <button @click="${this.userInfo}"><rpg-character></rpg-character></button>
              <button @click="${this.userInfo}"><rpg-character></rpg-character></button>
              <button @click="${this.userInfo}"><rpg-character></rpg-character></button>
              <button @click="${this.userInfo}"><rpg-character></rpg-character></button>
              <button @click="${this.userInfo}"><rpg-character></rpg-character></button>
              <button @click="${this.userInfo}"><rpg-character></rpg-character></button>
            </div>
          </div>
        </div>
        <button id="save-button">Save Party</button>
      </div>
    `;
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      users: { type: Array, reflect: true },
      userInput: { type: String, reflect: true },
    }
  }
}

globalThis.customElements.define(PartyUI.tag, PartyUI);