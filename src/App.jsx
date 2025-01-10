import "./App.css"
import Multisig from "./components/multisig"
import Single from "./components/Single"
import Mnemonic from "./components/Mnemonic"
import Convert from "./components/Convert"
import Vanity from "./components/Vanity"
import stxLogo from "/stx.png"

function App() {
  console.log("App rendered")

  return (
    <>
      <hgroup>
        <h1>
          {" "}
          <img src={stxLogo} width="30px" alt="stacks-icon" /> Stacks Address Generator
        </h1>
        <h5>Open Source JavaScript Client-Side Stacks Wallet Generator</h5>
      </hgroup>
      <nav>
        <ul>
          <li>Single Wallet</li>
          <li>Seed Phrase</li>
          <li>P2PKH Convert</li>
          <li>Vanity Wallet</li>
          <li>Multi-Sig</li>
          <li>Wallet Details</li>
        </ul>
      </nav>

      <Single />

      <Mnemonic />

      <Convert />

      <Vanity />

      <Multisig />
    </>
  )
}

export default App
