import { useState } from 'react';
import api from '../Config';
import Alert from '../Utils/alert';

const AddProduct = () => {
    const [status , setStatus] = useState({});

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        cartItem: '',
        quantity: 0,
        price: 0,
        dateOfHarvest: ''
    })

    const inputHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const SubmitHandler = (e) => {
        e.preventDefault();
        api.post('/api/item/create' , formData)
        .then(res => {
            if(res.status === 200)
                setStatus({message : "Product added" , type : "ok"});
        })
        .catch(err => {
            setStatus({message : err.message , type : "error"});
        })

        setTimeout(() => setStatus(null) , 3000);
    };

    return (
        <div className="m-2 p-2">
            <div className="text-3xl font-bold p-2 text-center">
                Add Product
            </div>
            <Alert message={status.message} type={status.type}/>
            <form onSubmit={SubmitHandler} className="max-w-md mx-auto mt-4">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={inputHandler}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter title"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={inputHandler}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter description"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="cartItem" className="block text-gray-700 font-bold mb-2">
                        Cart Item
                    </label>
                    <input
                        type="text"
                        id="cartItem"
                        name="cartItem"
                        value={formData.cartItem}
                        onChange={inputHandler}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter cart item"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">
                        Quantity
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={inputHandler}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter quantity"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={inputHandler}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter price"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
                        Price
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="dateOfHarvest"
                        value={formData.dateOfHarvest}
                        onChange={inputHandler}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter date of harvest"
                    />
                </div>
                {/* <div className="mb-4">
                    <label htmlFor="seller" className="block text-gray-700 font-bold mb-2">
                        Seller
                    </label>
                    <input
                        type="text"
                        id="seller"
                        name="seller"
                        value={formData.seller}
                        onChange={inputHandler}
                        required
                        placeholder="Enter seller id"
                    />
                </div> */}

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddProduct;