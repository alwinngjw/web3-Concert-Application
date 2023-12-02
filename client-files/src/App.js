import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { providers } from 'ethers';


// Components
import Navigation from './components/Navigation'
import Sort from './components/Sort'
import Card from './components/Card'
import SeatChart from './components/SeatChart'

// ABIs
import TicketCreation from './abis/TicketCreation.json'

// Config
import config from './config.json'

function App() {
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)

  const [ticketCreation, setTicketCreation] = useState(null)
  const [concerts, setConcerts] = useState([])

  const [concert, setConcert] = useState({})
  const [toggle, setToggle] = useState(false)

  const loadBlockchainData = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const network = await provider.getNetwork();
      const networkId = network.chainId.toString(); // Ensure it's a string
      const contractAddress = config[networkId]?.TicketCreation?.address;

      if (!contractAddress) {
        throw new Error(`Contract address not found for network ${networkId}`);
      }

      const ticketCreation = new ethers.Contract(
        contractAddress,
        TicketCreation,
        provider
      );
      setTicketCreation(ticketCreation);

      const totalConcerts = await ticketCreation.totalConcerts();
      const concerts = [];

      for (var i = 1; i <= totalConcerts; i++) {
        const concert = await ticketCreation.getConcert(i);
        concerts.push(concert);
      }

      setConcerts(concerts);

      /*
      window.ethereum.on("accountsChanged", async () => {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = ethers.utils.getAddress(accounts[0]);
        setAccount(account);
      });
      */
    } catch (error) {
      console.error("Error loading blockchain data:", error);
    }
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);
  

  return (
    <div>
      <header>
        <Navigation account={account} setAccount={setAccount} />

        <h2 className="header__title">
          <strong>Event</strong> Tickets
        </h2>
      </header>

      <Sort />

      <div className="cards">
        {concerts.map((concert, index) => (
          <Card
            concert={concert}
            id={index + 1}
            ticketCreation={ticketCreation}
            provider={provider}
            account={account}
            toggle={toggle}
            setToggle={setToggle}
            setConcert={setConcert} // Fix the prop name here
            key={index}
          />
        ))}
      </div>

      {toggle && (
        <SeatChart
          concert={concert}
          ticketCreation={ticketCreation}
          provider={provider}
          setToggle={setToggle}
        />
      )}
    </div>
  );
}

export default App;