import Hotel from '../models/Hotel.js'
import Room from '../models/Room.js'

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        next(error)
    }
}
export const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateHotel)
    } catch (error) {
        next(error)
    }
}
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json('The hotel has been deleted!')
    } catch (error) {
        next(error)
    }
}
export const getHotel = async (req, res, next) => {
    try {
        const getHotel = await Hotel.findById(req.params.id)
        res.status(200).json(getHotel)
    } catch (error) {
        next(error)
    }
}
export const getHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query
    try {
        const getHotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min || 1, $lt: max || 999 },
        }).limit(req.query.limit)
        res.status(200).json(getHotels)
    } catch (error) {
        next(error)
    }
}
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(',')
    try {
        const list = await Promise.all(
            cities.map((item) => {
                return Hotel.countDocuments({ city: item })
            })
        )
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}
export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: 'hotel' })
        const apartmentCount = await Hotel.countDocuments({ type: 'apartment' })
        const resortCount = await Hotel.countDocuments({ type: 'resort' })
        const villaCount = await Hotel.countDocuments({ type: 'villa' })
        const cabinCount = await Hotel.countDocuments({ type: 'cabin' })
        res.status(200).json([
            { type: 'hotel', count: hotelCount },
            { type: 'apartment', count: apartmentCount },
            { type: 'resorts', count: resortCount },
            { type: 'villas', count: villaCount },
            { type: 'cabins', count: cabinCount },
        ])
    } catch (error) {
        next(error)
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map((item) => Room.findById(item)))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}
