const { expect } = require("chai");

const NAME = "TicketCreation";
const SYMBOL = "TC";

//Create a test concert
const CONCERT_NAME = "Aespa World Tour Seoul"
const CONCERT_DATE = "Apr 27"
const CONCERT_TIME = "17:00AM KST"
const CONCERT_LOCATION = "Seoul, South Korea"
const CONCERT_COST = ethers.utils.parseUnits('1', 'ether')
const CONCERT_MAX_TICKETS = 100

describe("Ticket-Creation", () => {
  let tc; 
  let deployer;
  let buyer;

  beforeEach(async () => {
    [deployer, buyer] = await ethers.getSigners();

    const TicketCreation = await ethers.getContractFactory("TicketCreation");
    tc = await TicketCreation.deploy(NAME, SYMBOL, deployer.address);

    const txn = await tc.connect(deployer).list(
        CONCERT_NAME,
        CONCERT_DATE,
        CONCERT_TIME,
        CONCERT_LOCATION,
        CONCERT_COST,
        CONCERT_MAX_TICKETS
    );
    await txn.wait();
  });

  describe("try deployment", () => {
    it("Sets the name", async () => {
      expect(await tc.name()).to.equal(NAME);
    });

    it("Sets the symbol", async () => {
      expect(await tc.symbol()).to.equal(SYMBOL);
    });
    it("Sets the owner address", async () => {
        expect(await tc.owner()).to.equal(deployer.address);
      });
  });

  describe("try Concerts", () => {
    it('Returns Concert information', async () => {
        const concert = await tc.getConcert(1)
        expect(concert.id).to.be.equal(1)
        expect(concert.name).to.be.equal(CONCERT_NAME)
        expect(concert.cost).to.be.equal(CONCERT_COST)
        expect(concert.tickets).to.be.equal(CONCERT_MAX_TICKETS)
        expect(concert.date).to.be.equal(CONCERT_DATE)
        expect(concert.time).to.be.equal(CONCERT_TIME)
        expect(concert.location).to.be.equal(CONCERT_LOCATION)
      })

    it("Updates the concert counts", async () => {
        const totalConcerts = await tc.totalConcerts();
        expect(totalConcerts).to.be.equal(1);
    });
  });
});

