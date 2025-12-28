import React, { Component } from 'react';

const AddressCard = ({address}) => {
    return (
        !address ? <div>No Address Available</div> :
        <div>
            <div className='space-y-3'>
                <p className='font-semibold'>{address?.firstName + " "+ address?.lastName}</p>
                <p>{address?.state}, {address?.streetAddress} , {address?.zipCode}</p>
                <div className='space-y-1'>
                    <p className='font-semibold'>Phone Number</p>
                    <p>{address?.mobile}</p>
                </div>
            </div>
        </div>
    );
}

export default AddressCard;