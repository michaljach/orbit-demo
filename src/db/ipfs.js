import Ipfs from "ipfs";
import OrbitDB from "orbit-db";

let ipfs, db;

export const connect = async () => {
  try {
    ipfs = await Ipfs.create({
      repo: "/orbitdb/examples/browser/new/ipfs/0.33.1",
      start: true,
      preload: {
        enabled: false,
      },
      EXPERIMENTAL: {
        pubsub: true,
      },
      config: {
        Addresses: {
          Swarm: [
            // Use IPFS dev signal server
            // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
            // '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
            // Use IPFS dev webrtc signal server
            "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
            "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
            "/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/",
            // Use local signal server
            // '/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star',
          ],
        },
      },
    });

    const orbitdb = await OrbitDB.createInstance(ipfs);
    const db = await orbitdb.log(
      "zdpuAnq4qr9a3FNH2SLsfuD7n2Ej8Xkhze5Xq8iqwuAWz1yuo/golf-dev"
    );
    await db.load();

    console.log(db.address);

    // console.log(db.address);
    // const hash = await db.add("world");

    // const networkPeers = await ipfs.swarm.peers();
    // const databasePeers = await ipfs.pubsub.peers(db.address.toString());
    // const elem = document.getElementById("peers");
    // elem.innerHTML = `${networkPeers.length} / ${databasePeers.length}`;

    // db.events.on("replicated", (address) => {
    //   console.log(db.iterator({ limit: -1 }).collect());
    // });

    // db.events.on("write", () => console.log("update"));
    // db.events.on("peer", () => {
    //   elem.innerHTML = `${networkPeers.length} / ${databasePeers.length}`;
    // });

    // Query
    return { db, ipfs };
    // return db.iterator({ limit: -1 }).collect();
  } catch (e) {
    console.error(e);
  }
};
