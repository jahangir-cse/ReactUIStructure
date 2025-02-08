import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSliders } from "../../redux/actions/sliderActions";

const Slider = () => {
    const dispatch = useDispatch();
    const sliders = useSelector(state => state.sliders.items);

    useEffect(() => {
        dispatch(fetchSliders());
    }, [dispatch]);

    return (
        <div id="carousel" className="carousel slide container" data-bs-ride="carousel">
            {/* Indicators (Hide if only one item) */}
            {sliders.length > 1 && (
                <div className="carousel-indicators">
                    {sliders.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#carousel"
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-current={index === 0 ? "true" : "false"}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
            )}

            {/* Carousel Items */}
            <div className="carousel-inner">
                {sliders.map((item, index) => (
                    <div key={item.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                        <img src={item.Image} className="d-block w-100" alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>

            {/* Navigation Controls (Hide if only one item) */}
            {sliders.length > 1 && (
                <>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </>
            )}
        </div>
    );
};

export default Slider;
