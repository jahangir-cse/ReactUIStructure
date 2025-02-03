import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffers } from "../../redux/actions/offerActions";
import { fetchBundleTypes } from "../../redux/actions/bundleTypeActions";
import { fetchOperatorEntities } from "../../redux/actions/financialEntityActions";
import { buyOffers } from "../../redux/actions/transactionActions";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import BackHeader from "../header/backHeader";

const UserOfferList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const offers = useSelector(state => state.offers.items);
    const bundleTypes = useSelector(state => state.bundleTypes.items);
    const operatorEntities = useSelector(state => state.financialEntities.items);
    const accessToken = useSelector(state => state.authStore.accessToken);
    const { offerType: urlOfferType } = useParams();
    const location = useLocation();

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedDuration, setSelectedDuration] = useState(0);
    const [selectedOfferType, setSelectedOfferType] = useState(urlOfferType || "all");
    const [step, setStep] = useState(1);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [formData, setFormData] = useState({
        mobileNo: '',
        pin: '',
        financialEntityId: '',
        offerId: '',
    });

    useEffect(() => {
        if (!accessToken) {
            navigate('/login');
        } else {
            dispatch(fetchOffers());
            dispatch(fetchBundleTypes());
            dispatch(fetchOperatorEntities());

            setSelectedOfferType(urlOfferType || "all");
        }
    }, [dispatch, accessToken, navigate, urlOfferType]);

    const offersWithCategories = offers.map((offer) => ({
        ...offer,
        category: bundleTypes.find(bundle => bundle.id === offer.bundleTypeId)?.name || "Unknown",
        validityInHours: offer.validityInHours || 0,
        bundleTypeId: offer.bundleTypeId || 0
    }));

    const handleFinancialEntityClick = (id) => {
        setFormData(prev => ({ ...prev, financialEntityId: id }));
        setStep(2);
    };

    const handleOfferClick = (offer) => {
        setSelectedOffer(offer);
        setFormData(prev => ({
            ...prev,
            offerId: offer.id
        }));
        setStep(3);
    };

    const handleMobileNoClick = () => {
        if (formData.mobileNo) {
            setStep(4);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(buyOffers(formData));
        setFormData({
            mobileNo: '',
            pin: '',
            financialEntityId: '',
            offerId: ''
        });
        navigate('/');
    };

    const handleBack = () => {
        if (step === 1) {
            navigate('/');
        } else {
            setStep(prevStep => prevStep - 1);
        }
    };

    // Filter offers by selected financial entity
    const filteredOffers = offersWithCategories.filter(offer =>
        (selectedCategory === "all" || (offer.bundleType && offer.bundleType === selectedCategory)) &&
        (selectedDuration === 0 || offer.validityInHours === selectedDuration) &&
        (selectedOfferType === "all" || (offer.offerType && offer.offerType === selectedOfferType)) &&
        offer.financialEntityId === formData.financialEntityId
    );

    const formatValidity = (hours) => {
        if (hours < 24) return `${hours} Hours`;
        const days = hours / 24;
        if (days === 1) return "1 Day";
        return `${days} Days`;
    };

    const renderFormField = (label, name, type = "text", placeholder = "") => (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={(e) => setFormData(prev => ({ ...prev, [name]: e.target.value }))}
                className="form-control"
                placeholder={placeholder}
                required
            />
        </div>
    );

    return (
        <div className={`container recharge-section py-4 ${step > 0 ? 'active' : ''}`}>
            <BackHeader handleBack={handleBack} title="Offer" />
            <div className="container w-100">
                {step === 1 && (
                    <>
                        <div className="row">
                            {operatorEntities.map((entity) => (
                                <div key={entity.id} className="col-sm-2 col-4 d-flex" onClick={() => handleFinancialEntityClick(entity.id)}>
                                    <div className="card border-0">
                                        <div className="card-body bg-light text-center rounded">
                                            {entity.logoUrl ? (
                                                <img className="img-fluid" src={entity.logoUrl} alt={entity.name} />
                                            ) : (
                                                    <h5 className="card-title mb-0">{entity.name}</h5>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="row mt-3">
                            {filteredOffers.map((offer) => (
                                <div key={offer.id} className="col-md-3" data-category={offer.bundleType} data-offertype={offer.offerType} data-duration={offer.validityInHours} onClick={() => handleOfferClick(offer)}>
                                    <div className="card border-0">
                                        <div className="card-body rounded d-between-middle">
                                            {offer.rawText ? (
                                                <div>{offer.rawText}</div>
                                            ) : (
                                                <>
                                                        <div>
                                                            <h6 className="fw-bold">
                                                                {offer.title}
                                                            </h6>
                                                            <h6 className="mb-0 text-secondary">
                                                                <i className="bi bi-clock"></i> {formatValidity(offer.validityInHours)}
                                                            </h6>
                                                            {/* <h6 className="mb-0">
                                                                <i className="bi bi-calendar"></i> {offer.description}
                                                            </h6> */}
                                                        </div>
                                                        <div>
                                                            <h5 className="text-primary text-right">Tk. {offer.price - offer.discount}</h5>
                                                            <h6 className="text-danger text-right">
                                                                <s>Tk. {offer.price}</s>
                                                            </h6>
                                                        </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>                        
                    </>
                )}

                {step === 3 && (
                    <>
                        <div className="mt-3">
                            <form>
                                <div className="row">
                                    <div className="col-md-6 offset-md-3">
                                        {renderFormField("Mobile Number", "mobileNo", "text", "Enter mobile number")}
                                        <div className="text-center">
                                            <button className="btn btn-primary" onClick={handleMobileNoClick}>Next</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </>
                )}

                {step === 4 && (
                    <>
                        <div className="mt-3">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 offset-md-3">
                                        <div className="d-between-middle bg-white p-2 rounded mb-2">
                                            <div>{formData.mobileNo}</div>
                                            {selectedOffer && (
                                                <div className="">Tk. {selectedOffer.price}</div>
                                            )}
                                        </div>
                                        {renderFormField("Pin", "pin", "text", "Enter your pin")}
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserOfferList;
