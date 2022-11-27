import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import useFetch from '../../hooks/useFetch'
import './reserve.css'

const Reserve = ({ setOpen, hotelId }) => {
    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`)
    const [selected, setSelected] = useState([])
    const { dates } = useContext(SearchContext)
    const navigate = useNavigate()

    const getDatesInRange = (start, end) => {
        const date = new Date(start)
        const endDate = new Date(end)
        const dates = []
        while (date <= endDate) {
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }
        return dates
    }
    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate)

    const handleClose = () => {
        setOpen(false)
    }

    const handleSelected = (e) => {
        const value = e.target.value
        const checked = e.target.checked
        checked
            ? setSelected([...selected, value])
            : setSelected(selected.filter((item) => item !== value))
    }
    const handleReserve = async () => {
        try {
            await Promise.all(
                selected.map((item) => {
                    const res = axios.put(`/rooms/availability/${item}`, { dates: allDates })
                    return res.data
                })
            )
        } catch (error) {}
        setOpen(false)
        navigate('/')
    }

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((item) => {
            return allDates.includes(new Date(item).getTime())
        })
        return isFound
    }

    return (
        <div className='reserve'>
            <div className='rContainer'>
                <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={handleClose} />
                <span>Select your rooms:</span>
                {data.map((item) => {
                    return (
                        <div className='rItem' key={item._id}>
                            <div className='rItemInfo'>
                                <div className='rTitle'>{item.title}</div>
                                <div className='rDesc'>{item.desc}</div>
                                <div className='rMax'>
                                    Max people: <b>{item.maxPeople}</b>
                                </div>
                                <div className='rPrice'>Price: {item.price}</div>
                            </div>
                            <div className='rSelectRooms'>
                                {item.roomNumbers.map((item) => {
                                    return (
                                        <div className='room' key={item._id}>
                                            <label htmlFor=''>{item.number}</label>
                                            <input
                                                disabled={isAvailable(item)}
                                                type='checkbox'
                                                value={item._id}
                                                onChange={handleSelected}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
                <button className='rButton' onClick={handleReserve}>
                    Reserve now!
                </button>
            </div>
        </div>
    )
}

export default Reserve
