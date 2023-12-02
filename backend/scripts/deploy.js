const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}


async function main() {
  const [deployer] = await ethers.getSigners()
  const NAME = "EchoVerse"
  const SYMBOL = "EV"

  const EchoVerse = await ethers.getContractFactory("TicketCreation")
  const echoVerse = await EchoVerse.deploy(NAME, SYMBOL, deployer.address)
  await echoVerse.deployed()

  console.log(`Deployed EchoVerse Smart Contract at: ${echoVerse.address}\n`)

    const concerts = [
      {
        name: "BTS World Tour",
        date: "July 15 2024",
        time: "7:00PM KST",
        location: "Seoul Olympic Stadium - Seoul, South Korea",
        cost: tokens(4),
        tickets: 0,
      },
      {
        name: "BLACKPINK in Your Area",
        date: "August 2 2024",
        time: "6:30PM JST",
        location: "Tokyo Dome - Tokyo, Japan",
        cost: tokens(3),
        tickets: 100,
      },
      {
        name: "EXO Grand Concert",
        date: "September 5 2024",
        time: "8:00PM CST",
        location: "Mercedes-Benz Arena - Shanghai, China",
        cost: tokens(2.5),
        tickets: 50,
      },
      {
        name: "TWICE World Tour",
        date: "October 12 2024",
        time: "5:30PM KST",
        location: "Olympic Gymnastics Arena - Seoul, South Korea",
        cost: tokens(3.5),
        tickets: 75,
      },
      {
        name: "GOT7 Fan Meeting",
        date: "November 8 2024",
        time: "7:00PM JST",
        location: "Saitama Super Arena - Saitama, Japan",
        cost: tokens(2),
        tickets: 120,
      },
      {
        name: "Red Velvet Concert",
        date: "December 20 2024",
        time: "6:00PM CST",
        location: "Hongkou Football Stadium - Shanghai, China",
        cost: tokens(3),
        tickets: 80,
      },
      {
        name: "NCT Dream Live",
        date: "January 18 2025",
        time: "4:30PM KST",
        location: "Gocheok Sky Dome - Seoul, South Korea",
        cost: tokens(2.5),
        tickets: 90,
      },
      {
        name: "Stray Kids Unveil Tour",
        date: "February 28 2025",
        time: "7:30PM JST",
        location: "Osaka-jo Hall - Osaka, Japan",
        cost: tokens(3.5),
        tickets: 110,
      },
      {
        name: "MAMAMOO Harmony Concert",
        date: "April 5 2025",
        time: "8:00PM KST",
        location: "KSPO Dome - Seoul, South Korea",
        cost: tokens(4.5),
        tickets: 60,
      },
      {
        name: "ATEEZ Expedition",
        date: "May 20 2025",
        time: "6:00PM CST",
        location: "Mercedes-Benz Arena - Shanghai, China",
        cost: tokens(4),
        tickets: 95,
      },
    ];
      


  for (var i = 0; i < concerts.length; i++) {
    const txn = await echoVerse.connect(deployer).list(
      concerts[i].name,
      concerts[i].date,
      concerts[i].time,
      concerts[i].location,
      concerts[i].cost,
      concerts[i].tickets,
    );
  
    await txn.wait();
  
    console.log(`Listed Concerts ${i + 1}: ${concerts[i].name}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});