import Player from "react-audio-player";

const Quote = (props) => {
  return (
    <section className={props.transitioning ? "transitioning" : ""}>
      <div className="message">{props.message}</div>
      <div className="person">—{props.person}</div>
      <div className="company">
        <a href={props.preview ? undefined : props.link} target="_blank">
          {props.company}
        </a>
      </div>
      <div className="year">
        (Partnered in {props.year})
        <div className="flag">
          {props.flags.map((flag) => (
            <img key={flag} src={flag} />
          ))}
        </div>
      </div>
      <Player
        src={props.audio}
        ref={props.audioRef}
        onEnded={props.onAudioEnd}
        controls={false}
      />
      <style jsx>
        {`
          section {
            display: flex;
            flex-direction: column;
            align-items: center;
            opacity: 0;
            animation: ${props.transitionDuration / 1000}s ease fade-in forwards;
          }
          section.transitioning {
            animation: ${props.transitionDuration / 1000}s ease fade-out
              forwards;
          }
          .message {
            max-width: 980px;
            font-size: 44px;
            font-weight: 600;
            text-align: center;
            margin-bottom: 40px;
            letter-spacing: -1px;
            line-height: 64px;
          }
          .person {
            font-size: 44px;
            font-weight: 400;
            text-align: center;
          }
          .company {
            font-size: 24px;
            font-weight: 900;
            text-align: center;
            text-transform: uppercase;
            margin-bottom: 5px;
          }
          .year {
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .year .flag {
            display: flex;
            height: 44px;
          }
          .year .flag img {
            width: 24px;
            margin-left: 10px;
          }
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes fade-out {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
          @media (max-width: 768px) {
            padding-left: 5%;
            padding-right: 5%;

            .company {
              font-size: 26px;
              margin-top: 10px;
            }

            .message {
              font-size: 34px;
              line-height: 44px;
            }
            .person {
              font-size: 34px;
              width: 100%;
            }
            .year {
              width: 100%;
            }
          }
          @media (max-width: 375px) {
            .company {
              font-size: 16px;
            }

            .message {
              font-size: 24px;
              line-height: 34px;
            }
            .person {
              font-size: 24px;
              width: 100%;
            }
            .year {
              width: 100%;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Quote;
