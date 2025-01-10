import { mnemonicToSeed } from "@scure/bip39"
import { bytesToHex } from "@stacks/common"
import { privateKeyToAddress, privateKeyToPublic } from "@stacks/transactions"
import { generateNewAccount, generateWallet, randomSeedPhrase } from "@stacks/wallet-sdk"
import { c32ToB58 } from "c32check"

function Mnemonic() {
  console.log("Mnemonic rendered")

  async function generateSeedPhrase() {
    let mnemonic = randomSeedPhrase()

    let bip39Seed = await mnemonicToSeed(mnemonic)

    let wallet = await generateWallet({
      secretKey: mnemonic,
      password: ""
    })

    let bip32Root = wallet.rootKey

    let wallets = [wallet]

    for (let index = 0; index < 20; index++) {
      let newWallet = generateNewAccount(wallets[index])
      wallets.push(newWallet)
    }

    let accounts = []

    for (let index = 0; index < 20; index++) {
      let path = `m/44'/5757'/0'/0/${index}`

      let stxAddress = privateKeyToAddress(
        wallets[20].accounts[index].stxPrivateKey,
        "mainnet"
      )

      let btcAddress = c32ToB58(stxAddress)

      let pubkey = privateKeyToPublic(wallets[20].accounts[index].stxPrivateKey)

      let privkey = wallets[20].accounts[index].stxPrivateKey

      accounts.push({
        path,
        stxAddress,
        btcAddress,
        pubkey,
        privkey
      })
    }

    document.getElementById("mnemonic").value = mnemonic
    document.getElementById("bip39Seed").value = bytesToHex(bip39Seed)
    document.getElementById("bip32Root").value = bip32Root
    document.getElementById("derivationPath").value = `m/44'/5757'/0'/0`

    console.log(accounts)

    document.getElementById("tableBody").innerHTML = ""

    accounts.forEach(el => {
      let tr = document.createElement("tr")
      let a = document.createElement("td")
      a.textContent = el.path
      let b = document.createElement("td")
      b.textContent = el.stxAddress
      let c = document.createElement("td")
      c.textContent = el.btcAddress
      let d = document.createElement("td")
      d.textContent = el.pubkey
      let e = document.createElement("td")
      e.textContent = el.privkey

      tr.appendChild(a)
      tr.appendChild(b)
      tr.appendChild(c)
      tr.appendChild(d)
      tr.appendChild(e)

      document.getElementById("tableBody").appendChild(tr)
    })
  }

  return (
    <section>
      <article>
        <h2>Seed Phrase</h2>
        <p>
          A BIP-39 mnemonic seed phrase is a human-readable set of 24 words generated using the
          BIP-39 standard to represent a cryptographic seed. This seed is used to derive the
          private keys for a hierarchical deterministic (HD) cryptocurrency wallet. The phrase
          acts as a backup for the wallet, allowing users to recover their funds and access
          their accounts if they lose their device or wallet file. The words in the phrase are
          selected from a standardized dictionary of 2048 words, ensuring consistency and
          compatibility across wallets that support BIP-39. The mnemonic phrase encodes the
          entropy (randomness) used to generate the seed and often includes a checksum to
          ensure the phrase is valid. It is crucial to keep the seed phrase private and secure,
          as anyone with access to it can control the wallet and its funds.
        </p>
        <p>
          Generate your BIP39 24 mnemonic seed phrase:
          <button onClick={generateSeedPhrase}>Generate</button>
        </p>
        <p className="tip">List of derived addresses are logged to the browser console.</p>
      </article>
      <div className="value-container">
        <span>BIP39 Mnemonic</span>
        <textarea name="" id="mnemonic" defaultValue={""} disabled></textarea>
      </div>
      <div className="value-container">
        <span>BIP39 Seed</span>
        <textarea name="" id="bip39Seed" defaultValue={""} disabled></textarea>
      </div>
      <div className="value-container">
        <span>BIP32 Root Key</span>
        <textarea name="" id="bip32Root" defaultValue={""} disabled></textarea>
      </div>
      <div className="value-container">
        <span>Derivation Path</span>
        <textarea name="" id="derivationPath" defaultValue={""} disabled></textarea>
      </div>

      <table border={"2"}>
        <thead>
          <tr>
            <th>Derivation Path</th>
            <th>STX Address</th>
            <th>BTC Address</th>
            <th>Public Key</th>
            <th>Private Key</th>
          </tr>
        </thead>
        <tbody id="tableBody"></tbody>
        <tfoot>
          <tr>
            <td colSpan={"5"}>Proceed to browser console for raw data.</td>
          </tr>
        </tfoot>
      </table>
    </section>
  )
}

export default Mnemonic