import React from 'react'

const EventComponent = (props) => {
  return (
    <div>
         <div className='m-14'>
            <img src={props.image} alt=''/>
            <h1 className='font-medium'>{props.title}</h1>
            <p className='text-xl'>{props.content}</p>
        </div>
    </div>
  )
}

export default EventComponent