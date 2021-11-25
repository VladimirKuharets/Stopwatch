import React from 'react'

export default function DisplayComponents(props) {
    let hours = Math.floor(props.time / 3600);
    let minutes = Math.floor(props.time / 60 - hours * 60);
    let seconds = props.time - minutes *60 - hours *3600;

    return (
        <div>
        <span>{hours >= 10 ? hours : '0' + hours}</span>&nbsp;:&nbsp;
        <span>{minutes >= 10 ? minutes : '0' + minutes}</span>&nbsp;:&nbsp;
        <span>{seconds >= 10 ? seconds : '0' + seconds}</span>
    </div>
    )
}

