
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { AuthContext } from '../../provider/AuthProvider';
import Navbar from '../../components/Navbar/Navbar';

const Cart = () => {

    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    useEffect(() => {
        fetch("https://brand-shop-server-hrrjyd18w-md-jakiul-rashid-khans-projects.vercel.app/cart")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProducts(data);
            })
            .catch((error) => console.log(error))
    }, [])

    const handleDelete = _id=>{
        console.log(_id);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
        
              fetch (`https://brand-shop-server-hrrjyd18w-md-jakiul-rashid-khans-projects.vercel.app/cart/${_id}`,{
                method:'DELETE'
              })
              .then(res =>res.json())
              .then(data =>{
                console.log(data)
                if(data.deletedCount>0){ 
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Your Product has been deleted.',
                        'success'
                      )  
                      const remaining = products.filter(cof=>cof._id !== _id )
                      setProducts(remaining);
                }
              })
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })
    }
    return (
        <div>
            <Navbar></Navbar>
             <div className='container mx-auto py-8'>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-2 px-4">Product Image</th>
                            <th className="py-2 px-4">Product</th>
                            <th className="py-2 px-4">Item Price</th>
                            <th className="py-2 px-4">Product Type</th>
                            <th className="py-2 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user && products.length > 0 ? (
                            products.map((product, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="py-2 px-4">
                                        <img className="w-16 h-16 object-cover rounded" src={product.image} alt="Product" />
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="font-bold">{product.product}</div>
                                        <div className="text-sm opacity-75">{product.brandName}</div>
                                    </td>
                                    <td className="py-2 px-4">${product.price}</td>
                                    <td className="py-2 px-4 uppercase">{product.type}</td>
                                    <td className="py-2 px-4">
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    There are no items in your cart.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default Cart;