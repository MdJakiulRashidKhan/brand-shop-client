import React from 'react';

const Brand = ({brand}) => {
    const { image, brandName } = brand;
    return (
        <div className="card  bg-base-100 shadow-md">
            <figure className="px-10 pt-10">
                <img  src={image} alt="brand" className="rounded-xl w-[400px] h-[200px]" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{brandName}</h2>
                <div className="card-actions">
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default Brand;