import {
  addressFromPublicKeys,
  addressToString,
  createStacksPublicKey,
  makeRandomPrivKey,
  privateKeyToPublic,
  randomPrivateKey
} from "@stacks/transactions"
import { useState } from "react"

function Multisig() {
  console.log("Multisig rendered")

  const [n, setN] = useState(3)
  const [m, setM] = useState(2)

  function updateN(flag) {
    if (flag === 0 && n >= 4 && n > m) {
      setN(n - 1)
    }

    if (flag === 1 && n < 15) {
      setN(n + 1)
    }
  }

  function updateM(flag) {
    if (flag === 0 && m >= 3) {
      setM(m - 1)
    }

    if (flag === 1 && m < n) {
      setM(m + 1)
    }
  }

  function generateMultisig() {
    const array_privateKeys = []
    const array_publicKeys = []

    // Generate keys for n signers
    for (let i = 0; i < n; i++) {
      const privateKey = randomPrivateKey()
      array_privateKeys.push(privateKey)
      const publicKey = privateKeyToPublic(privateKey)
      array_publicKeys.push(publicKey)
    }

    // m signers required to sign
    let multisigAddWire = addressFromPublicKeys(
      20,
      5,
      m,
      array_publicKeys.map(createStacksPublicKey)
    )
    console.log(multisigAddWire)

    let multisigAdd = addressToString(multisigAddWire)

    document.getElementById("privKeys").value = array_privateKeys.join(",")
    document.getElementById("pubKeys").value = array_publicKeys.join(",")
    document.getElementById("multiSigAdd").value = multisigAdd
  }

  return (
    <section>
      <article>
        <h2>MultiSig Wallet</h2>
        <p>
          A multisig wallet (short for "multi-signature wallet") is a cryptocurrency wallet
          that requires multiple private keys to authorize a transaction instead of relying on
          a single private key. This type of wallet enhances security and allows for shared
          control among multiple parties. It operates using a predefined scheme, such as
          M-of-N, where M is the minimum number of keys required to approve a transaction, and
          N is the total number of keys generated.
        </p>
        <p>
          For example, in a 2-of-3 multisig wallet, three keys are created, but any two of them
          are sufficient to sign and authorize a transaction. This setup is commonly used in
          situations where trust and security are critical, such as in corporate treasury
          management, joint accounts, or when users want an additional layer of protection
          against theft or accidental key loss.{" "}
        </p>
        <p>
          Multisig wallets mitigate single points of failure, making it significantly harder
          for attackers to gain control without access to multiple keys. However, they also
          require careful management of the keys to avoid being locked out of the wallet due to
          losing more keys than the threshold allows.{" "}
        </p>
        <div style={{ display: "flex", columnGap: "20px", marginTop: "30px" }}>
          <span style={{ position: "relative" }}>
            <span style={{ position: "absolute", top: "-17px", fontSize: ".8rem" }}>
              n signers:
            </span>
            <input type="button" onClick={e => updateN(0)} defaultValue={"-"} />
            <input type="text" value={n} readOnly />
            <input type="button" onClick={e => updateN(1)} defaultValue={"+"} />
          </span>

          <span style={{ position: "relative" }}>
            <span style={{ position: "absolute", top: "-17px", fontSize: ".8rem" }}>
              m signatures required:
            </span>
            <input type="button" onClick={e => updateM(0)} defaultValue={"-"} />
            <input type="text" value={m} readOnly />
            <input type="button" onClick={e => updateM(1)} defaultValue={"+"} />
          </span>
        </div>
        <p>
          Generate your multisig address (15 signers max limit):{" "}
          <button onClick={generateMultisig}>Generate</button>
        </p>
        <p className="tip">
          The AddressWire format of your multisig address logged to the browser console.
        </p>
      </article>
      <div className="value-container">
        <span>Private Keys</span>
        <textarea name="" id="privKeys" defaultValue={""} disabled></textarea>
      </div>
      <div className="value-container">
        <span>
          Public Keys <br /> (compressed)
        </span>
        <textarea name="" id="pubKeys" defaultValue={""} disabled></textarea>
      </div>
      <div className="value-container">
        <span>MultiSig Address</span>
        <textarea name="" id="multiSigAdd" defaultValue={""} disabled></textarea>
      </div>
    </section>
  )
}

export default Multisig
