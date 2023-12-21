import { CalendarOutlined } from '@ant-design/icons'
import React from 'react'

const EventComponent = (props) => {
  return (
    <div>
         <div className='ml-5 border rounded-xl pb-2 cursor-pointer hover:shadow-xl'>
            <img src={props.image} alt=''className='mt-5 rounded-xl w-full'/>
            <div className='px-4'>
            <p className='font-medium text-lg'>{props.title}</p>
            <div className='text-[15px] mt-2'><CalendarOutlined /> {props.time}</div>
            <p className='text-base my-5'>{props.content}</p>
            </div>
        </div>
    </div>
  )
}

export default EventComponent