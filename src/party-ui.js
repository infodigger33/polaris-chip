import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class PartyUI extends DDD {
  static get tag() {
    return 'party-ui';
  }

  constructor() {
    super();
    this.users = ["cj"];
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
          margin: 5px auto;
          padding: 0px 20px 25px 20px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          height: auto;
          max-width: var(--party-ui-party-container-max-width, 600px);
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
          transition: background-color 0.3s ease;
          cursor: pointer;
        }

        #add-button:hover, #add-button:focus {
          transition: ease 0.3s;
          background-color: #005ec2;
        }

        #add-button:disabled{
          background-color: #bdc3c7;
          cursor: not-allowed;
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
          margin-right: 2.5px;
          margin-bottom: 2.5px;
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
          margin-top: 2.5px;
          margin-bottom: 2.5px;
          padding: 10px;
          width: 100%;
          border: none;
          border-radius: 5px;
          background-color: #28a745;
          color: #fff;
          transition: background-color 0.3s ease;
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
      <confetti-container id="confetti">
        <div class="party-container">
          <div class="add-user-container">
            <p><span>Add User:</span></p>
            <input type="text" class="text-input" .value=${this.userInput} @input="${this.handleInput}">
            <button id="close-button" @click="${this.confirmClose}">✕</button>        
            <button id="add-button" ?disabled="${this.userInput === ''}" @click="${this.addUser}">►</button>
          </div>
          <div class="current-user-container">
            <p><span>Current Users:</span></p>        
            <div class="scroll-container">
              ${this.users.map(user => html`
                <div class="card-container">
                  <button @click="${() => this.deleteUser(user)}">
                    <rpg-character seed="${user}"></rpg-character>
                    <p>${user}</p>
                  </button>
                </div>
              `)}       
            </div>
          </div>
          <button id="save-button" @click="${this.saveParty}">Save Party</button>
        </div>
      </confetti-container>
    `;
  }  

  handleInput(event) {
    const userInput = event.target.value;
    const invalidCharacter = userInput.match(/[^a-z0-9]/g);
  
    if (invalidCharacter) {
      alert(`The character "${invalidCharacter[0]}" is not allowed. Please use only lowercase letters and numbers.`);
      event.target.value = userInput.replace(invalidCharacter[0], '');
    } else {
      this.userInput = userInput;
    }
  }

  confirmClose() {
    if (confirm('Are you sure you want to close the page?')) {
      const partyContainer = this.shadowRoot.querySelector('.party-container');
      partyContainer.parentNode.remove();
    }
  }

  addUser() {
    if (this.userInput !== '') {
      if (this.users.includes(this.userInput)) {
        alert(`User "${this.userInput}" already exists.`);
      } else {
        this.users = [...this.users, this.userInput];
      }
      this.userInput = '';
    }
  }

  deleteUser(userToDelete) {
    const confirmed = confirm(`Are you sure you want to delete the character "${userToDelete}"?`);

    if (confirmed) {
      const index = this.users.indexOf(userToDelete);
      if (index !== -1) {
        this.users.splice(index, 1);
        this.users = [...this.users];
      }   
    }
  }

  saveParty() {
    if (this.users.length === 0) {
      alert('Saved the party with no users');
    } else if (this.users.length === 1) {
      alert(`Saving party with user: ${this.users}`);
    } else if (this.users.length === 2) {
      alert(`Saving party with users: ${this.users.join(' and ')}`);
    } else {
      const usersExceptLast = this.users.slice(0, -1).join(', ');
      const lastUser = this.users[this.users.length - 1];
      alert(`Saving party with users: ${usersExceptLast}, and ${lastUser}`);
    }

    this.makeItRain();  
  }

  makeItRain() {
    import('@lrnwebcomponents/multiple-choice/lib/confetti-container.js').then((module) => {
      setTimeout(() => {
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    });
  }

  static get properties() {
    return {
      ...super.properties,
      users: { type: Array },
      userInput: { type: String, reflect: true },
    }
  }
}

globalThis.customElements.define(PartyUI.tag, PartyUI);