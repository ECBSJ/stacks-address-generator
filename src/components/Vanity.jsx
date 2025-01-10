import {
  privateKeyToAddress,
  privateKeyToPublic,
  randomPrivateKey
} from "@stacks/transactions"
import { useState } from "react"

function Vanity() {
  console.log("Vanity rendered")

  const [nonce, setNonce] = useState(0)

  async function generateVanity() {
    setNonce(0)
    document.getElementById("vanityPrivKey").value = ""
    document.getElementById("vanityPubKey").value = ""
    document.getElementById("vanityStxAdd").value = ""

    let userVanity = document.getElementById("vanityInput").value.toUpperCase()

    let randomPrivKey
    let randomAdd

    const c32_regex = /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]+$/
    let addressGenerated = 0

    if (c32_regex.test(userVanity)) {
      while (true) {
        console.log(addressGenerated)
        randomPrivKey = randomPrivateKey()
        randomAdd = privateKeyToAddress(randomPrivKey)

        addressGenerated++

        setNonce(addressGenerated)

        if (randomAdd.endsWith(userVanity)) {
          document.getElementById("error").innerText = ""
          document.getElementById("vanityPrivKey").value = randomPrivKey
          document.getElementById("vanityPubKey").value = privateKeyToPublic(randomPrivKey)
          document.getElementById("vanityStxAdd").value = randomAdd
          break
        }
      }
    } else {
      document.getElementById("error").innerText = "Invalid characters. Try again."
    }
  }

  return (
    <section>
      <article>
        <h2>Vanity Address</h2>
        <p>
          A vanity Stacks public address is a custom cryptocurrency address on the Stacks
          blockchain that includes a user-defined sequence of characters at the beginning or
          within the address. These addresses are typically created for personalization or
          branding purposes, making the address more recognizable or meaningful. For example,
          instead of a random-looking address like SP12345..., a user might generate an address
          that starts with something like SPHELLO.... Vanity addresses are generated by
          repeatedly attempting different private keys until a public address matching the
          desired pattern is found. This process, known as brute-forcing, requires
          computational effort, with the difficulty increasing as the desired pattern becomes
          more specific. It’s important to use reputable tools for this purpose to ensure the
          generated private key remains secure and uncompromised.
        </p>
        <p>
          Valid c32check character set: <code>0123456789ABCDEFGHJKMNPQRSTVWXYZ</code>
        </p>
        <p>
          Generate your vanity address (suffix):
          <input
            id="vanityInput"
            type="text"
            style={{ textTransform: "uppercase", marginLeft: "10px" }}
            required
          />
          <button onClick={generateVanity}>Generate</button>
        </p>

        <p id="error" style={{ color: "red", fontWeight: "bold", textAlign: "right" }}></p>
        <p id="addressGenerated" style={{ textAlign: "right" }}>
          {`Searched through ${nonce} addresses.`}
        </p>
      </article>
      <div className="value-container">
        <span>Single Private Key</span>
        <textarea name="" id="vanityPrivKey" defaultValue={""} disabled></textarea>
      </div>
      <div className="value-container">
        <span>
          Public Key <br /> (compressed)
        </span>
        <textarea name="" id="vanityPubKey" defaultValue={""} disabled></textarea>
      </div>
      <div className="value-container">
        <span>Vanity Stacks Address</span>
        <textarea name="" id="vanityStxAdd" defaultValue={""} disabled></textarea>
      </div>
    </section>
  )
}

export default Vanity