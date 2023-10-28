import React, { useContext, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import Product from '../../components/Product/Product';
import Navbar from '../../components/Navbar/Navbar';

const ProductList = () => {
    const brandsProducts = useLoaderData();
    const [products,setProducts]=useState(brandsProducts);
    return (
         <div>
          <Navbar></Navbar>
          <div className='m-20'>  
         <h1 className='text-6xl text-center text-purple-600'>All Product List</h1>
        <div >
        {
          products.length >0 ?
          <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
            {
              products.map(brandsProduct=><Product key={brandsProduct._id} brandsProduct={brandsProduct} products={products} setProducts={setProducts}></Product>)
            }
          </div>
          :<h2 className='mt-20 font-bold text-lg '>No Items Available !!!</h2>  
        }
        </div>
        </div>
         </div>
        
    );
};

export default ProductList;