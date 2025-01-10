import { bytesToHex, hexToBytes, privateKeyToBytes } from "@stacks/common"
import {
  getAddressFromPublicKey,
  hash160,
  privateKeyToPublic,
  randomPrivateKey
} from "@stacks/transactions"
import { c32ToB58 } from "c32check"
import pill from "/pill.png"

function Single() {
  console.log("Single rendered")

  function generateSingle() {
    document.getElementById("error").innerText = ""

    let randomPrivKey = randomPrivateKey()
    console.log("Private Key 33byte uint8array: ")
    console.log(hexToBytes(randomPrivKey))
    document.getElementById("privKey").value = randomPrivKey

    let pubKey = privateKeyToPublic(randomPrivKey)
    console.log("Public Key 33byte uint8array: ")
    console.log(hexToBytes(pubKey))
    document.getElementById("pubKey").value = pubKey

    let pubKeyHash = hash160(hexToBytes(pubKey))
    console.log("Public Key Hash 20byte uint8array: ")
    console.log(pubKeyHash)
    document.getElementById("pubKeyHash").value = bytesToHex(pubKeyHash)

    let stxAddress = getAddressFromPublicKey(pubKey)
    document.getElementById("stxAdd").value = stxAddress

    let btcAddress = c32ToB58(stxAddress)
    document.getElementById("btcAdd").value = btcAddress
  }

  function handlePrivKeyUserInput(e) {
    document.getElementById("error").innerText = ""
    document.getElementById("pubKey").value = ""
    document.getElementById("pubKeyHash").value = ""
    document.getElementById("stxAdd").value = ""
    document.getElementById("btcAdd").value = ""

    if (!e.target.value.trim()) {
      null
    } else {
      try {
        let userPrivKey = e.target.value.trim()
        privateKeyToBytes(userPrivKey)
        console.log("Private Key 33 or 32 byte uint8array: ")
        console.log(hexToBytes(userPrivKey))

        let pubKey = privateKeyToPublic(userPrivKey)
        console.log("Public Key 33 or 65 byte uint8array: ")
        console.log(hexToBytes(pubKey))
        document.getElementById("pubKey").value = pubKey

        let pubKeyHash = hash160(hexToBytes(pubKey))
        console.log("Public Key Hash 20byte uint8array: ")
        console.log(pubKeyHash)
        document.getElementById("pubKeyHash").value = bytesToHex(pubKeyHash)

        let stxAddress = getAddressFromPublicKey(pubKey)
        document.getElementById("stxAdd").value = stxAddress

        let btcAddress = c32ToB58(stxAddress)
        document.getElementById("btcAdd").value = btcAddress
      } catch (error) {
        console.log(error)
        document.getElementById("error").innerText = "Invalid private key."
      }
    }
  }

  return (
    <section>
      <article>
        <h2>Single Wallet</h2>
        <p>
          A single private key wallet is a type of wallet that relies on one private key to
          control and access funds. The private key is a randomly generated, secret string of
          characters that serves as the wallet's core security mechanism, enabling the user to
          sign transactions and prove ownership of the associated funds. From this private key,
          a public key is mathematically derived using the secp256k1 elliptical cryptography
          curve. The public key acts as a unique identifier linked to the private key and
          allows for verification of signed transactions without revealing the private key
          itself. In Stacks and also in Bitcoin, the public key is usually stored in its
          compressed format. Further, a public address, which is a hashed and shortened version
          of the public key, is generated to serve as the wallet's receiving address. This
          public address can be shared freely for others to send funds, as it cannot be used to
          derive the private key. Stacks and Bitcoin can share the same public key, therefore a
          single private key can generate both a Stacks and Bitcoin address. Together, the
          private key ensures security and access, the public key facilitates cryptographic
          verification, and the public address provides a user-friendly way to interact on the
          blockchain.
        </p>
        <p>
          Generate your single keypair/address:
          <button onClick={generateSingle}>Generate</button>
        </p>
        <p className="tip">
          The uint8array byte format of your keypair is logged to the browser console.
        </p>
      </article>
      <div className="value-container" style={{ position: "relative" }}>
        <p
          id="error"
          style={{
            position: "absolute",
            top: "-30px",
            left: "160px",
            color: "red",
            fontSize: ".8rem",
            fontWeight: "bold"
          }}
        ></p>
        <span>Single Private Key</span>
        <textarea
          id="privKey"
          defaultValue={""}
          onChange={e => handlePrivKeyUserInput(e)}
        ></textarea>
      </div>
      <div className="value-container">
        <span>
          Public Key <br /> (compressed)
        </span>
        <textarea id="pubKey" defaultValue={""} disabled></textarea>
      </div>
      <div className="value-container">
        <span>
          Public Key Hash
          <img src={pill} alt="pill" width={"70px"} style={{ marginTop: "4px" }} />
        </span>
        <textarea id="pubKeyHash" defaultValue={""} disabled></textarea>
      </div>
      <div className="value-container">
        <span>Stacks Address</span>
        <textarea id="stxAdd" defaultValue={""} disabled></textarea>
      </div>
      <div className="value-container">
        <span>Bitcoin Address</span>
        <textarea id="btcAdd" defaultValue={""} disabled></textarea>
      </div>
    </section>
  )
}

export default Single
