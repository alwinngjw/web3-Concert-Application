import { ethers } from 'ethers';

const Card = ({ concert, toggle, setToggle, setConcert }) => {
  const togglePop = () => {
    setConcert(concert);
    toggle ? setToggle(false) : setToggle(true);

    /*
    console.log("Before Toggle:", toggle);
    setConcert(concert);
    setToggle((prevToggle) => !prevToggle);
    console.log("After Toggle:", !toggle);
    */
  };

  return (
    <div className='card'>
      <div className='card__info'>
        <p className='card__date'>
          <strong>{concert.date}</strong><br />{concert.time}
        </p>

        <h3 className='card__name'>
          {concert.name}
        </h3>

        <p className='card__location'>
          <small>{concert.location}</small>
        </p>

        <p className='card__cost'>
          <strong>
            {ethers.utils.formatUnits(concert.cost.toString(), 'ether')}
          </strong>
          ETH
        </p>

        {concert.tickets.toString() === "0" ? (
          <button
            type="button"
            className='card__button--out'
            disabled
          >
            Sold Out 
          </button>
        ) : (
          <button
            type="button"
            className='card__button'
            onClick={() => togglePop()}
          >
            View Seats
          </button>
        )}
      </div>

      <hr />
    </div >
  );
};

export default Card;
