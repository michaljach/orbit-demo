import Ipfs from "ipfs";
import OrbitDB from "orbit-db";

export let ipfs;
export let db;
let orbitdb;

const connectOrbitDb = async (new_id) => {
  orbitdb = await OrbitDB.createInstance(ipfs);

  db = await orbitdb.log(
    "/orbitdb/zdpuAwbfEnbrP19F97rDdahx3o6CLG618a6asP2QeT4jhaiXm/1213",
    {
      accessController: {
        type: "orbitdb",
        write: [orbitdb.identity.id],
      },
    }
  );

  if (new_id) {
    await db.access.grant("write", new_id);
  }

  await db.load();
  console.log(db.address.toString());

  return db;
};

export const connect = async () => {
  try {
    ipfs = await Ipfs.create({
      repo: "/orbitdb/examples/browser/new/ipfs/0.33.1",
      start: true,
      preload: {
        enabled: false,
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

    const db = await connectOrbitDb();

    return { db, ipfs };
  } catch (e) {
    console.error(e);
  }
};

export const disconnect = async () => {
  return await orbitdb.disconnect();
};

export const authorize = async (id) => {
  await disconnect();
  connectOrbitDb(id);
};
