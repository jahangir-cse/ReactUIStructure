import React from 'react';

const SupportModal = ({ supportShow }) => {
    return (
        <div className={`card support-popup border border-success ${supportShow == true ? '' : 'd-none'}`}>
            <div className='card-body'>
                <h6>Type: Whats App</h6>
                <h6>Number: 01700000000</h6>
            </div>
        </div>
    );
};

export default SupportModal;
