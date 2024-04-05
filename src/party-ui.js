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
          border-radius: var(--ddd-radius-sm);
          margin: var(--party-ui-party-container-margin, auto);
          padding: var(--ddd-spacing-0) var(--ddd-spacing-5) var(--ddd-spacing-6) var(--ddd-spacing-5);
          box-shadow: var(--party-ui-party-container-box-shadow, 0px 0px 10px rgba(0, 0, 0, 0.1));
          height: var(--party-ui-party-container-height, auto);
          max-width: var(--party-ui-party-container-max-width, 600px);
        }

        .add-user-container {
          position: relative;
          margin-bottom: var(--ddd-spacing-0);
        }

        .add-user-container p {
          margin-bottom: var(--ddd-spacing-1);
          font-weight: bold;
        }
        
        .text-input {
          width: var(--party-ui-text-input-width, calc(100% - 106px));
          margin-right: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-2);
          border: 1px solid var(--ddd-theme-default-limestoneLight);
          border-radius: var(--ddd-radius-xs);
          background-color: var(--simple-colors-default-theme-grey-1);
        }

        #close-button {
          position: absolute;
          top: 0;
          right: 0;
          width: var(--ddd-spacing-7);
          height: var(--ddd-spacing-5);
          background-color: var(--simple-colors-default-theme-red-7);
          color: var(--ddd-theme-default-white);
          border: var(--ddd-border-none);
          border-radius: var(--ddd-radius-xs);
          transition: background-color ease 0.3s;
          cursor: pointer;
        } 

        #close-button:hover, #close-button:focus {
          background-color: var(--simple-colors-default-theme-red-8);
        }

        #add-button {
          position: absolute;
          right: 0;
          padding: var(--ddd-spacing-2) var(--ddd-spacing-8);
          border: 1px solid var(--ddd-theme-default-limestoneLight);
          border-radius: var(--ddd-radius-xs);
          background-color: var(--simple-colors-default-theme-light-blue-7);
          color: var(--ddd-theme-default-white);
          transition: background-color 0.3s ease;
          cursor: pointer;
        }

        #add-button:hover, #add-button:focus {
          background-color: var(--simple-colors-default-theme-light-blue-8);
        }

        #add-button:disabled{
          background-color: var(--ddd-theme-default-limestoneGray);
          cursor: not-allowed;
        }

        .current-user-container {
          margin-bottom: var(--ddd-spacing-2);
        }

        .current-user-container p {
          margin-top: var(--ddd-spacing-5);
          margin-bottom: var(--ddd-spacing-1);
          font-weight: bold;
        }

        .scroll-container {
          overflow: auto;
          white-space: nowrap;
        }

        .card-container {
          display: inline-block;
          vertical-align: top;
          height: var(--party-ui-card-container-height, auto);
          width: var(--party-ui-card-container-width, auto);
          margin-right: var(--ddd-spacing-2);
          margin-bottom: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-2);
          border: 1px solid var(--ddd-theme-default-limestoneLight);
          border-radius: var(--ddd-radius-xs);
          background-color: var(--simple-colors-default-theme-grey-1);
        }

        .card-container p {
          margin: var(--ddd-spacing-1) var(--ddd-spacing-0);
        }

        .card-container button {
          background-color: var(--simple-colors-default-theme-grey-1);
          border: var(--ddd-border-none);
          border-radius: var(--ddd-radius-xs);
          transition: background-color ease 0.3s;
          cursor: pointer;
        }

        .card-container button:hover, .card-container button:focus {
          background-color: var(--simple-colors-default-theme-grey-4);
        }

        #save-button {
          position: relative;
          padding: var(--party-ui-save-button-padding, 10px);
          width: var(--party-ui-save-button-width, 100%);
          border: var(--ddd-border-none);
          border-radius: var(--ddd-radius-xs);
          background-color: var(--simple-colors-default-theme-green-7);
          color: var(--ddd-theme-default-white);
          transition: background-color ease 0.3s;
          cursor: pointer;
        }

        #save-button:hover, #save-button:focus {
          background-color: var(--simple-colors-default-theme-green-9);
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
                    <rpg-character hat="random" seed="${user}"></rpg-character>
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
    if (userInput.length > 16) {
      alert('Maximum character limit exceeded. Please enter a maximum of 16 characters.');
      event.target.value = userInput.slice(0, 16);
    } else {
      const invalidCharacter = userInput.match(/[^a-z0-9]/g);
      if (invalidCharacter) {
        alert(`The character "${invalidCharacter[0]}" is not allowed. Please use only lowercase letters and numbers.`);
        event.target.value = userInput.replace(invalidCharacter[0], '');
      } else {
        this.userInput = userInput;
      }
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