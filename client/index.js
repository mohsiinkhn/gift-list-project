const axios = require("axios");
const server = require("../server");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");
const { toHex } = require("ethereum-cryptography/utils");

const serverUrl = "http://localhost:1225";

async function main() {
  const merkleTree = new MerkleTree(niceList);
  const root = merkleTree.getRoot();
  const leaf = "Shelly Toy";
  const proof = merkleTree.getProof(niceList.indexOf(leaf));

  // TODO: how do we prove to the server we're on the nice list?

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof: proof,
    leaf: leaf,
    root: root,
  });

  console.log({ gift });
}

main();
