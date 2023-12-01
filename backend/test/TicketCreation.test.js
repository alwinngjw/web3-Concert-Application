const { expect } = require("chai");

const NAME = "TicketCreation";
const SYMBOL = "TC";

describe("Ticket-Creation", () => {
  let tc; 
  let deployer;
  let buyer;

  beforeEach(async () => {
    [deployer, buyer] = await ethers.getSigners();

    const TicketCreation = await ethers.getContractFactory("TicketCreation");
    tc = await TicketCreation.deploy(NAME, SYMBOL, deployer.address);
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
});

