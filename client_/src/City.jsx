import React from 'react'

function City(props) {
    return (
        <div>
            <h1>{props.city.name}</h1>
            <textarea
                style={{ width: '500px' }}
                value={props.city.description}
                onChange={(e) => props.handlerOnChange(e)}
            />
        </div>
    )
}

export default City
