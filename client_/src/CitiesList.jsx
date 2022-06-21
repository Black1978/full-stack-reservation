import React from 'react'

function CitiesList(props) {
    return (
        <ul>
            {props.cities.map((item, index) => {
                return (
                    <li key={item.name} onClick={() => props.onSelectCity(index)}>
                        <h1>{item.name}</h1>
                        <textarea value={item.description} style={{ width: '500px' }} />
                    </li>
                )
            })}
        </ul>
    )
}

export default CitiesList
