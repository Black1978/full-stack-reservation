import mongoose from 'mongoose'

const RoomSchema = mongoose.Schema(
    {
        title: {
            type: String,
            requre: true,
        },
        price: {
            type: Number,
            requre: true,
        },
        maxPeople: {
            type: Number,
            require: true,
        },
        desc: {
            type: String,
            require: true,
        },
        roomNumbers: [
            {
                number: Number,
                unavailableDates: {
                    type: [Date],
                },
            },
        ],
    },
    { timestamps: true }
)

export default mongoose.model('Room', RoomSchema)
