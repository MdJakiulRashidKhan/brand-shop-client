import React, { useEffect, useState } from 'react';
import Brand from '../Brand/Brand';

const BrandName = () => {
    const [brands,setBrands]=useState([]);
    useEffect(() => {
        fetch('phone.json')
            .then(res => res.json())
            .then(data => setBrands(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    return (
        <div className='grid grid-cols-3 gap-6'>
           {
             brands.map(brand=> <Brand key={brand.id} brand={brand}></Brand>)
           } 
        </div>
    );
};

export default BrandName;