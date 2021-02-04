import { Component } from "../../shared/component";
import { connect } from "../../db/ipfs";

class AppContainer extends Component {
  async connectedCallback() {
    const { db, ipfs } = await connect();

    let networkPeers = await ipfs.swarm.peers();
    let databasePeers = await ipfs.pubsub.peers(db.address.toString());

    const elem = this.shadowRoot.getElementById("peers");
    elem.innerHTML = `Peers: ${networkPeers.length} / ${databasePeers.length}`;

    db.events.on("peer", async () => {
      console.log("new peer");
      networkPeers = await ipfs.swarm.peers();
      databasePeers = await ipfs.pubsub.peers(db.address.toString());
      elem.innerHTML = `Peers: ${networkPeers.length} / ${databasePeers.length}`;
    });

    console.log(db.iterator({ limit: -1 }).collect());
  }

  template() {
    return `
      <style>
        @import url('https://rsms.me/inter/inter.css');

        :host {
          font-family: 'Inter', sans-serif;
        }
      </style>

      <h1>Decentralized peer2peer database</h1>
      <div id="peers"></div>
    `;
  }
}

customElements.define("app-container", AppContainer);
