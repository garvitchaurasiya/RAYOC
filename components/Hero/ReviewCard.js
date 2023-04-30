import React from 'react'
import { Icon } from 'semantic-ui-react'

export default function ReviewCard(props) {
    const { author, collegeName, stars, review, course } = props;

    return (
        <div className='py-10 border-b'>
            <div className='flex justify-between'>
                <div className='flex'>
                    <div className='bg-gray-500 h-12 w-12 rounded-full'>
                        <img src={`https://api.multiavatar.com/${review.slice(0, 10)}.png?apikey=jDLBmJ7USQizoZ`}/>
                    </div>
                    <div className='pl-4'>
                        <div className='font-bold'>{collegeName}</div>
                        <div>{course}</div>
                        <div>
                            <Icon name='star' color={(stars >= '1') ? 'yellow' : 'grey'} size='small' />
                            <Icon name='star' color={(stars >= '2') ? 'yellow' : 'grey'} size='small' />
                            <Icon name='star' color={(stars >= '3') ? 'yellow' : 'grey'} size='small' />
                            <Icon name='star' color={(stars >= '4') ? 'yellow' : 'grey'} size='small' />
                            <Icon name='star' color={(stars >= '5') ? 'yellow' : 'grey'} size='small' />
                        </div>
                    </div>
                </div>

                <div className='font-medium text-sm'>~ {author}</div>
            </div>
            <div className='italic font-medium text-gray-500 mt-2'>
                {review}
            </div>
        </div>
    )

}