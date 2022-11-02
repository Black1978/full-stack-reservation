import { Link } from 'react-router-dom'
import './searchItem.css'

const SearchItem = ({ props }) => {
    return (
        <div className='searchItem'>
            <img src={props.photos[0]} alt='' className='siImg' />
            <div className='siDesc'>
                <h1 className='siTitle'>{props?.name}</h1>
                <span className='siDistance'>{props.distance}m from center</span>
                <span className='siTaxiOp'>Free airport taxi</span>
                <span className='siSubtitle'>Studio Apartment with Air conditioning</span>
                <span className='siFeatures'>{props.desc}</span>
                <span className='siCancelOp'>Free cancellation </span>
                <span className='siCancelOpSubtitle'>
                    You can cancel later, so lock in this great price today!
                </span>
            </div>
            <div className='siDetails'>
                {props.rating && (
                    <div className='siRating'>
                        <span>Excellent</span>
                        <button>{props.rating}</button>
                    </div>
                )}
                <div className='siDetailTexts'>
                    <div className='siDetailTextsWrapper'>
                        <span className='siPrice'>${props.cheapestPrice}</span>
                        <span className='siTaxOp'>Includes taxes and fees</span>
                    </div>
                    <Link to={`/hotels/${props._id}`}>
                        <button className='siCheckButton'>See availability</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SearchItem
