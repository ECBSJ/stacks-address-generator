import { b58ToC32, c32address, c32addressDecode, c32ToB58 } from "c32check"
import pill from "/pill.png"

function Convert() {
  console.log("Convert rendered")

  function convertP2pkh(e) {
    try {
      if (e.target.id === "convertStxAdd") {
        let stxAdd = e.target.value
        let btcAdd = c32ToB58(stxAdd)
        let pubKeyHash = c32addressDecode(stxAdd)[1]
        document.getElementById("convertPubKeyHash").value = pubKeyHash
        document.getElementById("convertBtcAdd").value = btcAdd
      }

      if (e.target.id === "convertPubKeyHash") {
        let pubKeyHash = e.target.value
        let stxAdd = c32address(22, pubKeyHash)
        let btcAdd = c32ToB58(stxAdd)
        document.getElementById("convertStxAdd").value = stxAdd
        document.getElementById("convertBtcAdd").value = btcAdd
      }

      if (e.target.id === "convertBtcAdd") {
        let btcAdd = e.target.value
        let stxAdd = b58ToC32(btcAdd)
        let pubKeyHash = c32addressDecode(stxAdd)[1]
        document.getElementById("convertStxAdd").value = stxAdd
        document.getElementById("convertPubKeyHash").value = pubKeyHash
      }
    } catch (error) {
      console.log(error)
      document.getElementById("convertStxAdd").value = ""
      document.getElementById("convertBtcAdd").value = ""
      document.getElementById("convertPubKeyHash").value = ""
    }
  }

  return (
    <section>
      <article>
        <h2>P2PKH Convert</h2>
        <p>
          What makes Stacks beautifully connected to its L1 settlement layer, Bitcoin, is their
          many shared aspects. One being how both utilize a similar address generation scheme
          based on the P2PKH format, which allows for both a bitcoin & Stacks address to share
          the same public key hash. If you base58check decode a legacy bitcoin address, you can
          reveal the public key hash, which can then be used to generate its respective
          c32check encoded Stacks address. By performing this decoding and encoding process on
          a legacy bitcoin address, it technically has its own Stacks address that only the
          private key owner can control. Programmatically, you could also use a method called
          <code>`b58ToC32`</code>, from the c32check npm library, which can abstract the
          conversion for you.
        </p>
        <p>
          Input either a Stacks address, public key hash, or Bitcoin address in its respective
          input fields.
        </p>
      </article>
      <div className="value-container">
        <span>Stacks Address</span>
        <textarea
          name=""
          id="convertStxAdd"
          defaultValue={""}
          onChange={e => convertP2pkh(e)}
        ></textarea>
      </div>
      <div className="value-container">
        <span>
          Public Key Hash
          <img src={pill} alt="pill" width={"70px"} style={{ marginTop: "4px" }} />
        </span>
        <textarea
          name=""
          id="convertPubKeyHash"
          defaultValue={""}
          onChange={e => convertP2pkh(e)}
        ></textarea>
      </div>
      <div className="value-container">
        <span>Bitcoin Address</span>
        <textarea
          name=""
          id="convertBtcAdd"
          defaultValue={""}
          onChange={e => convertP2pkh(e)}
        ></textarea>
      </div>
    </section>
  )
}

export default Convert
