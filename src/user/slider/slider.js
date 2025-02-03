import React from "react";

const Slider = () => {
    return (
        <div className="container mt-3 slider-section">
            <div id="offerSlider" className="carousel carousel-dark slide" data-bs-ride="true">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#offerSlider" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#offerSlider" data-bs-slide-to="1" aria-label="Slide 2"></button>
                </div>
                <div className="carousel-inner rounded">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <img src="assets/img/cover.png" alt="..." />                       
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <div className="d-middle flex-column text-center text-white">
                            <h5>Second slide label</h5>
                            <p className="mb-0">Some representative placeholder content for the second slide.</p>
                        </div>
                    </div>                   
                </div>               
            </div>
        </div>
    );
};

export default Slider;
