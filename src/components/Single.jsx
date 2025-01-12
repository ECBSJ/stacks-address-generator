import { bytesToHex, hexToBytes, privateKeyToBytes } from "@stacks/common"
import {
  addressFromVersionHash,
  addressToString,
  getAddressFromPublicKey,
  hash160,
  privateKeyToPublic,
  randomPrivateKey
} from "@stacks/transactions"
import { c32ToB58 } from "c32check"
import pill from "/pill.png"
import { useState } from "react"

function Single() {
  const [wallet, setWallet] = useState(null)
  const [showTestnet, setShowTestnet] = useState(false)

  console.log("Single rendered")

  function generateSingle() {
    document.getElementById("error").innerText = ""

    let randomPrivKey = randomPrivateKey()
    let pubKey = privateKeyToPublic(randomPrivKey)
    let pubKeyHash = hash160(hexToBytes(pubKey))
    let stxAddress = getAddressFromPublicKey(pubKey)
    let btcAddress = c32ToB58(stxAddress)

    let stxTestnet = addressToString(addressFromVersionHash(26, bytesToHex(pubKeyHash)))
    let btcTestnet = c32ToB58(stxTestnet)

    console.log("Private Key 33byte uint8array: ")
    console.log(hexToBytes(randomPrivKey))

    console.log("Public Key 33byte uint8array: ")
    console.log(hexToBytes(pubKey))

    console.log("Public Key Hash 20byte uint8array: ")
    console.log(pubKeyHash)

    document.getElementById("privKey").value = randomPrivKey
    document.getElementById("pubKey").value = pubKey
    document.getElementById("pubKeyHash").value = bytesToHex(pubKeyHash)
    document.getElementById("stxAdd").value = stxAddress
    document.getElementById("btcAdd").value = btcAddress
    document.getElementById("isCompressed").innerText = "(compressed)"

    setWallet({
      privateKey: randomPrivKey,
      publicKey: pubKey,
      publicKeyHash: bytesToHex(pubKeyHash),
      stxAddress,
      btcAddress,
      stxTestnet,
      btcTestnet
    })
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
        let userPrivKey_length = privateKeyToBytes(userPrivKey).length

        let pubKey = privateKeyToPublic(userPrivKey)
        let pubKeyHash = hash160(hexToBytes(pubKey))
        let stxAddress = getAddressFromPublicKey(pubKey)
        let btcAddress = c32ToB58(stxAddress)

        console.log(`Private Key ${userPrivKey_length} byte uint8array: `)
        console.log(hexToBytes(userPrivKey))

        console.log(`Public Key ${userPrivKey_length === 33 ? "33" : "65"} byte uint8array: `)
        console.log(hexToBytes(pubKey))

        console.log("Public Key Hash 20byte uint8array: ")
        console.log(pubKeyHash)

        document.getElementById("pubKey").value = pubKey
        document.getElementById("pubKeyHash").value = bytesToHex(pubKeyHash)
        document.getElementById("stxAdd").value = stxAddress
        document.getElementById("btcAdd").value = btcAddress
        document.getElementById("isCompressed").innerText =
          userPrivKey_length === 33 ? "(compressed)" : "(uncompressed)"
      } catch (error) {
        console.log(error)
        document.getElementById("error").innerText =
          "Invalid private key. Must be 33 or 32 byte hex-encoded string."
      }
    }
  }

  function toggleTestnet(e) {
    if (!document.getElementById("stxAdd").value == "") {
      if (showTestnet === false) {
        document.getElementById("stxAdd").value = wallet.stxTestnet
        document.getElementById("btcAdd").value = wallet.btcTestnet
        e.target.innerText = "Mainnet"
        setShowTestnet(true)
      } else {
        document.getElementById("stxAdd").value = wallet.stxAddress
        document.getElementById("btcAdd").value = wallet.btcAddress
        e.target.innerText = "Testnet"
        setShowTestnet(false)
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
            top: "-27px",
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
          Public Key <br /> <span id="isCompressed">(compressed)</span>
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
        <span>
          Stacks Address <br /> <button onClick={e => toggleTestnet(e)}>Testnet</button>
        </span>
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
