import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Navbar from "../../components/Navbar/Navbar";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productData, setProductData] = useState();

    const {
        brand,
        product,
        image,
        type,
        price,
        rating,
        description
    } = productData || {};

    useEffect(() => {
        fetch(`https://brand-shop-server-hrrjyd18w-md-jakiul-rashid-khans-projects.vercel.app/brand/${id}`)
            .then((res) => res.json())
            .then((data) => setProductData(data));
    }, [id]);

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });

    const handleAddToCart = () => {
        const cart = {
            brand,
            product,
            image,
            type,
            price,
            rating,
            description
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cart)
        };

        fetch('https://brand-shop-server-dw8vl5gg3-sharif-ahmeds-projects.vercel.app/cart', requestOptions)
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    swalWithBootstrapButtons.fire(
                        'Added!',
                        'Your product has been added to cart.',
                        'success'
                    );
                }
            })
            .catch((error) => console.error(error));
    };

    const handleDelete = ()=>{
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
        
              fetch (`https://brand-shop-server-hrrjyd18w-md-jakiul-rashid-khans-projects.vercel.app/brand/${id}`,{
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
                    navigate('/allproduct');  
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
            <div className="container max-w-4xl mx-auto py-12">
            <div className="group mb-5 border shadow-sm py-4 px-5 pb-8 rounded-md">
                <div className="mb-2 ">
                    <img className="w-full h-[80vh] object-center rounded-md" src={image} alt="brand" />
                </div>
                <div className="">
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] mt-6 mb-4 font-thin uppercase">{brand}</p>
                        <p className="text-[10px] mt-6 mb-4 font-thin uppercase">Type: {product}</p>
                    </div>

                    <h2 className="text-[#1b1b1b] font-medium
                     mt-3 mb-3 text-base relative before:absolute before:top-0
                     before:left-0 before:bottom-0 before:bg-[#d22e2e] before:w-[3px] 
                     before:mr-[10px] before:inline-block pl-2 uppercase">{product}</h2>

                    <div className="flex justify-between items-center mt-3">
                        <p className="text-[#3b3b3b] py-1 text-lg tracking-wide
                     font-medium inline-block rounded-full ">${price} <span className="text-[12px]">USD</span> </p>
                        <div className="rating rating-xs">
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" checked={rating == 1} />
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" checked={rating == 2} />
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" checked={rating == 3} />
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" checked={rating == 4} />
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" checked={rating == 5} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-6">
                        <a onClick={handleAddToCart} className="hover:bg-[#d22e2e] hover:border-[#d22e2e] 
                        py-2 px-3 text-sm uppercase border-[#1b1b1b] text-[#1b1b1b] 
                     font-medium inline-block hover:text-white 
                     rounded-full border" href="#">Add To Cart</a>
                        <a onClick={handleDelete} className="hover:bg-[#d22e2e] hover:border-[#d22e2e] 
                        py-2 px-3 text-sm uppercase border-[#1b1b1b] text-[#1b1b1b] 
                     font-medium inline-block hover:text-white 
                     rounded-full border" href="#">Delete</a>
                    </div>
                    <div>
                        <p className="text-[#7A7A7A] text-[14px] leading-7 font-thin
                         border-t-[1px] border-[#ccc] pt-8 relative after:absolute after:bg-chevronDown
                          after:left-12 after:top-[-1px] after:bottom-0 after:w-[15px] after:h-[7px] after:bg-no-repeat"></p>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ProductDetails;
