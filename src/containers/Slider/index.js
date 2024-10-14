import { useEffect, useState, useMemo } from 'react';
import { useData } from '../../contexts/DataContext';
import { getMonth } from '../../helpers/Date';

import './style.scss';

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  //const [paused, setPaused] = useState(false); // État pour savoir si le slider est en pause

  const byDateDesc = useMemo(() => {
    return (
    data?.focus?.sort((evtA, evtB) =>
      new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
    ) || []
    );
  }, [data?.focus]);

    useEffect(() => {
      const interval = setInterval(() => {
        //if (!paused) { // Vérifie si le slider n'est pas en pause
        setIndex((prevIndex) =>
          prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
        );
      //}
      }, 5000);
      return () => clearInterval(interval);
    }, [/*paused*/, byDateDesc]);
  
    // Gérer l'appui sur la barre d'espace pour mettre le slider en pause
  //useEffect(() => {
    //const handleKeyDown = (event) => {
      //if (event.code === 'Space') { // Vérifie si la barre d'espace est pressée
       // event.preventDefault(); // Empêche le défilement de la page
       // setPaused((prevPaused) => !prevPaused); // Inverse l'état de pause
     // }
   // };

    //window.addEventListener('keydown', handleKeyDown); // Ajoute l'écouteur d'événements

    //return () => {
     // window.removeEventListener('keydown', handleKeyDown); // Nettoie l'écouteur d'événements
    //};
  //}, []);


  const handleRadioChange = (radioIdx) => {
    setIndex(radioIdx);
  };

  return (
    <div className='SlideCardList'>
      {byDateDesc.map((event, idx) => (
        <div key={event.id || `${event.title}-${idx}`}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? 'display' : 'hide'
            }`}
          >
            <img src={event.cover} alt='forum' />
            <div className='SlideCard__descriptionContainer'>
              <div className='SlideCard__description'>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className='SlideCard__paginationContainer'>
            <div className='SlideCard__pagination'>
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${event.id || `${event.title}-${radioIdx}`}`}
                  type='radio'
                  name='radio-button'
                  checked={index === radioIdx}
                  onChange={() => handleRadioChange(radioIdx)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;

