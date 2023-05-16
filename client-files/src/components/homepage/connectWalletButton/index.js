import React from 'react';

const buttonWrapperStyle = {
  display: 'flex',
  justifyContent: 'center'
};

const buttonStyle = {
  fontSize: '20px',
  padding: '10px 100px',
  zIndex: 1
};

const ConnectWalletButton = ({ label, handleClick }) => (
  <div style={buttonWrapperStyle}>
    <button
      className="btn btn-default"
      style={buttonStyle}
      onClick={handleClick}
    >
      {label}
    </button>
  </div>
);

export default ConnectWalletButton;