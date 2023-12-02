const { expect } = require("chai");
const { assert } = require("chai")

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

  describe("Minting", () => {
    const ID = 1
    const SEAT = 50
    const AMOUNT = ethers.utils.parseUnits('1', 'ether');

     beforeEach(async () => {
      const txn = await tc.connect(buyer).mint(ID, SEAT, { value: AMOUNT })
      await txn.wait()
    })
    it('Updates ticket count', async () => {
        const c = await tc.getConcert(1)
        expect(c.tickets).to.be.equal(CONCERT_MAX_TICKETS - 1)
      })
  
      it('Updates buying status', async () => {
        const status = await tc.hasBought(ID, buyer.address)
        expect(status).to.be.equal(true)
      })
  
      it('Updates seat status', async () => {
        const owner = await tc.seatTaken(ID, SEAT)
        expect(owner).to.equal(buyer.address)
      })
  
      it('Updates overall seating status', async () => {
        const seats = await tc.getAllSeatsTaken(ID)
        expect(seats.length).to.equal(1)
        expect(seats[0]).to.equal(SEAT)
      })
  
      it('Updates the contract balance', async () => {
        const balance = await ethers.provider.getBalance(tc.address)
        expect(balance).to.be.equal(AMOUNT)
      })
  })

  describe("Withdrawing", () => {
    const ID = 1
    const SEAT = 50
    const AMOUNT = ethers.utils.parseUnits("1", 'ether')
    let initialOwnerBalance

    beforeEach(async () => {
        initialOwnerBalance = await ethers.provider.getBalance(
          deployer.address
        );

      let transaction = await tc.connect(buyer).mint(ID, SEAT, { value: AMOUNT })
      await transaction.wait()

      transaction = await tc.connect(deployer).withdraw()
      await transaction.wait()
    })

    it('Updates the owner balance', async () => {
      const balanceAfter = await ethers.provider.getBalance(deployer.address);

      const initialOwnerBalanceInEther = ethers.utils.formatUnits(
        initialOwnerBalance,
        "ether"
      );
      const balanceAfterInEther = ethers.utils.formatUnits(
        balanceAfter,
        "ether"
      );
      console.log("Initial Owner Balance (Ether):", initialOwnerBalanceInEther);
      console.log("Balance After Withdrawal (Ether):", balanceAfterInEther);
      assert.isAbove(balanceAfter, initialOwnerBalance, '5 is strictly greater than 2');

    })

    it('Updates the contract balance', async () => {
      const balance = await ethers.provider.getBalance(tc.address)
      expect(balance).to.equal(0)
    })
  })
});

