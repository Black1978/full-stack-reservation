import './hotel.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleArrowLeft,
    faCircleArrowRight,
    faCircleXmark,
    faLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { useContext } from 'react'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import Reserve from '../../components/reserve/Reserve'

const Hotel = () => {
    const [slideNumber, setSlideNumber] = useState(0)
    const [open, setOpen] = useState(false)
    const [openBooking, setOpenBooking] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const idNumber = location.pathname.split('/')[3]
    const { user } = useContext(AuthContext)
    const { dates, options } = useContext(SearchContext)
    const { data, loading, error, reFetch } = useFetch(`/hotels/find/${idNumber}`)

    const handleOpen = (i) => {
        setSlideNumber(i)
        setOpen(true)
    }

    const handleMove = (direction) => {
        let newSlideNumber

        if (direction === 'l') {
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
        } else {
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
        }

        setSlideNumber(newSlideNumber)
    }

    const handleReserve = () => {
        if (user) {
            setOpenBooking(true)
        } else {
            navigate('/login')
        }
    }

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24

    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime())
        const daysDiff = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
        return daysDiff + 1
    }
    const days = dayDifference(dates[0].startDate, dates[0].endDate)

    return (
        <div>
            <Navbar />
            <Header type='list' />
            {loading ? (
                'loading'
            ) : (
                <div className='hotelContainer'>
                    {open && (
                        <div className='slider'>
                            <FontAwesomeIcon
                                icon={faCircleXmark}
                                className='close'
                                onClick={() => setOpen(false)}
                            />
                            <FontAwesomeIcon
                                icon={faCircleArrowLeft}
                                className='arrow'
                                onClick={() => handleMove('l')}
                            />
                            <div className='sliderWrapper'>
                                <img src={data.photos[slideNumber]} alt='' className='sliderImg' />
                            </div>
                            <FontAwesomeIcon
                                icon={faCircleArrowRight}
                                className='arrow'
                                onClick={() => handleMove('r')}
                            />
                        </div>
                    )}
                    <div className='hotelWrapper'>
                        <button className='bookNow' onClick={handleReserve}>
                            Reserve or Book Now!
                        </button>
                        <h1 className='hotelTitle'>{data.name}</h1>
                        <div className='hotelAddress'>
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span>{data.address}</span>
                        </div>
                        <span className='hotelDistance'>
                            Excellent location - {data.distance}m from center
                        </span>
                        <span className='hotelPriceHighlight'>
                            Book a stay over ${data.cheapestPrice} at this property and get a free
                            airport taxi
                        </span>
                        <div className='hotelImages'>
                            {data.photos?.map((photo, i) => (
                                <div className='hotelImgWrapper' key={i}>
                                    <img
                                        onClick={() => handleOpen(i)}
                                        src={photo}
                                        alt=''
                                        className='hotelImg'
                                    />
                                </div>
                            ))}
                        </div>
                        <div className='hotelDetails'>
                            <div className='hotelDetailsTexts'>
                                <h1 className='hotelTitle'>Stay in the heart of City</h1>
                                <p className='hotelDesc'>{data.desc}</p>
                            </div>
                            <div className='hotelDetailsPrice'>
                                <h1>Perfect for a 9-night stay!</h1>
                                <span>
                                    Located in the real heart of Krakow, this property has an
                                    excellent location score of 9.8!
                                </span>
                                <h2>
                                    <b>${days * data.cheapestPrice * options.room}</b> ({days}{' '}
                                    nights)
                                </h2>
                                <button onClick={handleReserve}>Reserve or Book Now!</button>
                            </div>
                        </div>
                        {openBooking && <Reserve setOpen={setOpenBooking} hotelId={idNumber} />}
                    </div>
                    <MailList />
                    <Footer />
                </div>
            )}
        </div>
    )
}

export default Hotel
