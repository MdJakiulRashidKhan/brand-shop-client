import React from 'react';
import Swal from 'sweetalert2'
import Navbar from '../../components/Navbar/Navbar';

const AddProduct = () => {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    const handleAddProduct = (event) => {
        event.preventDefault();
        const form = event.target;
        const brand = form.brand.value;
        const product = form.product.value;
        const image = form.image.value;
        const type = form.type.value;
        const price = form.price.value;
        const rating = form.rating.value;
        const description = form.description.value;


        const addProduct = {
            brand,product,image,type,price,rating,description
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addProduct)
        };

        fetch('https://brand-shop-server-hrrjyd18w-md-jakiul-rashid-khans-projects.vercel.app/brand', requestOptions)
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    swalWithBootstrapButtons.fire(
                        'Added!',
                        'Your product has been addeded.',
                        'success'
                    )
                    form.reset();
                }
            })
            .catch(error => console.error(error));

    }
    return (
        <div>
            <Navbar></Navbar>
            <div className="container mx-auto mt-8">
            <h2 className="text-3xl font-bold mb-6">Add Product</h2>
            <form onSubmit={handleAddProduct}>
                {/* 1 */}
                <div className='flex gap-4'>
                    <div className="mb-4 w-1/2">
                        <label className="block text-sm font-medium text-gray-600">Brand Name</label>
                        <input type="text" name="brand" placeholder="Enter brand name" className="mt-1 p-2 w-full border border-red-300 rounded-md" />
                    </div>
                    <div className="mb-4 w-1/2">
                        <label className="block text-sm font-medium text-gray-600">Product Name</label>
                        <select name="product" className="mt-1 p-2 w-full border border-red-300 rounded-md">
                            <option value="">Select Product</option>
                            <option value="phone">Apple</option>
                            <option value="computer">Samsung</option>
                            <option value="headphone">Sony</option>
                            <option value="headphone">Google</option>
                            <option value="headphone">Intel</option>
                        </select>
                    </div>
                </div>
                {/* 2 */}
                <div className='flex gap-4'>
                    <div className="mb-4 w-1/2">
                        <label className="block text-sm font-medium text-gray-600">Image URL</label>
                        <input type="text" name="image" placeholder="Enter image URL" className="mt-1 p-2 w-full border border-red-300 rounded-md" />
                    </div>
                    <div className="mb-4 w-1/2">
                        <label className="block text-sm font-medium text-gray-600">Type</label>
                        <select name="type" className="mt-1 p-2 w-full border border-red-300 rounded-md">
                            <option value="">Select Product Type</option>
                            <option value="phone">Phone</option>
                            <option value="computer">Computer</option>
                            <option value="headphone">Headphone</option>
                        </select>
                    </div>
                </div>
                {/* 3 */}
                <div className='flex gap-4'>
                    <div className="mb-4 w-1/2">
                        <label className="block text-sm font-medium text-gray-600">Price</label>
                        <input type="number" name="price" placeholder="Enter price" className="mt-1 p-2 w-full border border-red-300 rounded-md" />
                    </div>
                    <div className="mb-4 w-1/2">
                        <label className="block text-sm font-medium text-gray-600">Rating</label>
                        <select name="rating" className="mt-1 p-2 w-full border border-red-300 rounded-md">
                            <option value="">Rating</option>
                            <option value="phone">1</option>
                            <option value="computer">2</option>
                            <option value="headphone">3</option>
                            <option value="headphone">4</option>
                            <option value="headphone">5</option>
                        </select>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Short Description</label>
                    <textarea name="description" placeholder="Enter short description" className="mt-1 p-2 w-full border border-red-300 rounded-md"></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 px-8 transition duration-300">Add Product</button>
            </form>
        </div>
        </div>
    );
};

export default AddProduct;