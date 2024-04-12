const Card = ({ data }) => {

    return(
        <div className={`Card ${data.condition[0].split(" ").join('-').toLowerCase()}`}>
            <h3 className="times">{data.time.slice(11,16)}</h3>
            <img className="main-icons" src={data.condition[1]} alt={`Icon for ${data.condition[0]}`} />
            <h4 className="conditions">{data.condition[0]}</h4>
            <div className="card-bottom-container">
                <div className="card-tile">
                    <p><strong>Rain?</strong></p>
                    {data.will_rain ? "YES": "NO"}
                </div>
                <div className="card-tile">
                    <p><strong>C°/F°</strong></p>
                    {data.tempC}°/{data.tempF}°
                </div>
            </div>
        </div>
    )
};

export default Card;