import { useState } from 'react';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import api from '../Config';
import { useParams } from 'react-router-dom';
import Alert from '../Utils/alert';

const Review = () => {
    const [review, setReview] = useState(null);
    const [reviewText , setReviewText] = useState();
    const [status , setStatus] = useState({});
    const params = useParams();

    const submitHandler = (e) => {
        e.preventDefault();
        api.post("/api/review/create" , {
            upvote : review,
            seller : params.seller,
            forItem : params.item,
            review : reviewText
        })
        .then(res => {
            if(res.status === 200)
                setStatus({message : "Review completed", type : "ok"});
        })
        .catch(err => {
            setStatus({message : err.message , type : "error"});
        })
        // console.log({
        //         upvote : review,
        //         seller : params.seller,
        //         forItem : params.item,
        //         review : reviewText
        //     });
    }

    return (
        <div className="bg-gray w-2/3 h-screen items-center m-5">
            <div className='text-3xl font-bold m-5'>
                Review
            </div>
            <Alert message={status.message} type={status.type}/>
            <div className='flex text-5xl m-5 gap-5'>
                <BiUpvote 
                color= {review ? '00ff00' : '0000'}
                onClick={() => { setReview(true) }} />
                <BiDownvote 
                color= {review ? '0000' : 'ff0000'}
                onClick={() => { setReview(false) }} />
            </div>
            {/* <div className='text-1xl font-bold m-5'>
                Review selected as {review ? "Upvote" : "Downvote"} 
            </div> */}
            <div className='m-5 w-full'>
                <input
                    className='p-5'
                    type="text"
                    placeholder="Enter review"
                    onChange={(e) => {setReviewText(e.target.value)}}
                    value={reviewText}
                />
            </div>
            <div className='m-5'>
            <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={submitHandler}
            >
                Submit
            </button>
            </div>
        </div>
    )
}

export default Review;