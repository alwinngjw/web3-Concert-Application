import React from 'react';
import backgroundImage from './background.jpg';
import ConnectWalletButton from '../connectWalletButton/index';

const Homepage = () => {
  let imageStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "white",
    zIndex: -1
  };

  return (
    <div className="homepage">
      <div className="image" style={imageStyle}></div>
      <ConnectWalletButton label="Connect Wallet" handleClick={() => { /* handle button click */ }} />
    </div>
  );
};

export default Homepage;