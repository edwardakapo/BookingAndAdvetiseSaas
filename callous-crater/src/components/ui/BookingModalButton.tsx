import {useState, useEffect, useRef} from "react";
import './css/bookingModal.css'
import VerticallyCenteredModal from "./VerticallyCenteredModal";
import { toast } from 'react-toastify';
const HOME_SERVICE_CHARGE = 20;
const HAIR_EXTENSION_CHARGE = 40;
interface ModalProps {
    price : number,
    hairLengths : {[key:string]: number},
    hairSizes : {[key:string]: number},
}

export default function BookingModalButton({
    price,
    hairLengths,
    hairSizes
} : ModalProps){

    const [modalShow, setModalShow] = useState(false);
    const [addressShow, setAddressShow] = useState(false);
    const [extraInfoShow, setExtraInfoShow] = useState(false);
    const [hairLengthValue, setHairLengthValue] = useState(0)
    const [hairSizeValue, setHairSizeValue] = useState(0)
    const [bookingPrice, setBookingPrice] = useState(Number(price))
    const [showStar, setShowStar] = useState(false)
    const [starCounter, setStarCounter] = useState(0)
    const [exstensionValue, setExstensionValue] = useState(0)
    const [homeServiceValue, setHomeServiceValue] = useState(0)
    const [selectedHairSize, setSelectedHairSize] = useState("");
    const [selectedHairLength, setSelectedHairLength] = useState("");



    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);
    const dateTimeRef = useRef(null);
    const addressRef = useRef(null);
    const cityRef = useRef(null);
    const extraInfoRef = useRef(null);

    useEffect(() => {
        setBookingPrice(Number(price) + hairLengthValue + hairSizeValue + exstensionValue + homeServiceValue);
    }, [hairLengthValue, hairSizeValue, homeServiceValue, exstensionValue]);

    function submitHandler(e) {
        e.preventDefault();
        if (selectedHairSize === "" || selectedHairSize === "Select hair size" || selectedHairLength === "" || selectedHairLength === "Select hair length") {
            toast.error("Please select valid hair length and size.");
            return;
        }
        console.log("Name:", nameRef.current.value);
        console.log("Phone:", phoneRef.current.value);
        console.log("Email:", emailRef.current.value);
        console.log("Date & Time of booking:", dateTimeRef.current.value);
        console.log("Hair Length Extra:", hairLengthValue);
        console.log("Hair Size Extra:", hairSizeValue);
        console.log("Selected Hair Size:", selectedHairSize);
        console.log("Selected Hair Length:", selectedHairLength);
            // Add console logs for checkbox states
        console.log("Extensions provision selected:", exstensionValue > 0);
        console.log("Home service selected:", homeServiceValue > 0);
        console.log("Extra info provided:", extraInfoShow);

        if (addressShow) {
            console.log("Address:", addressRef.current.value);
            console.log("City:", cityRef.current.value);
        }
        if (extraInfoShow) {
            console.log("Extra Info:", extraInfoRef.current.value);
        }
        console.log("Final Price:", bookingPrice);
        setModalShow(false)
        toast.success(    
            <div>
                Your reservation has been recieved.<br />
                An email will be sent to you shortly.
            </div>
            )
    }

    function selectHandler(e, type) {
        var value = Number(e.target.value);
        const text = e.target.options[e.target.selectedIndex].text;
        if (value == -1){
            value = 0 ;
        }
        if(type === 'hairLength'){
            setHairLengthValue(value);
            setSelectedHairLength(text);

        }
        else{
            setHairSizeValue(value);
            setSelectedHairSize(text);

        }
    }
    function increaseStarCount() {
        setStarCounter(prevCount => {
            const newCount = prevCount + 1;
            if (newCount > 0) {
                setShowStar(true);
            }
            return newCount;
        });
    }
    function reduceStarCount() {
        setStarCounter(prevCount => {
            const newCount = prevCount - 1;
            if (newCount == 0) {
                setShowStar(false);
            }
            return newCount;
        });
    }
  

    
    function handleCheckBoxChange(e, priceIncrease, type){
        const isChecked = e.target.checked
       if(isChecked){
           increaseStarCount()
        if(type == 'homeservice'){
            setHomeServiceValue(priceIncrease);
        }
        else {
            setExstensionValue(priceIncrease)
        }
       }
       else{
           reduceStarCount()
           if(type == 'homeservice'){
            setHomeServiceValue(0);
            }
            else {
                setExstensionValue(0)
            }
       }
    }

    useEffect(() => {
        if (modalShow) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
            setAddressShow(false);
            setExtraInfoShow(false);
            setBookingPrice(price);
            setHomeServiceValue(0);
            setExstensionValue(0);
            setHairLengthValue(0);
            setHairSizeValue(0);
        }
    }, [modalShow]);




    return (
        <div>
            {/* <ToastContaner autoClose={1000}/> */}
            <button className="booking-Btn" onClick={ () => setModalShow(true)}>Book Now</button>
            <VerticallyCenteredModal
                show={modalShow}
                onClose={() => setModalShow(false)}
            >
                <form onSubmit={submitHandler}>
                    <div className="form-top-section">
                        <div className="form-group">
                            <label htmlFor="fname">Name</label>
                            <input type="text" id="fname" name="fname" autoComplete="name" required  ref={nameRef}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" autoComplete="tel-national" required ref={phoneRef}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" autoComplete="email" required ref={emailRef}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date-time">Date & Time</label>
                            <input type="datetime-local" id="date-time" name="date-time" required ref={dateTimeRef} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hair-length">Hair Length</label>
                            <select required onChange={e => selectHandler(e, 'hairLength')}>
                                <option value={-1}>Select hair length</option>
                                {Object.entries(hairLengths).map(([length, value],index) => (
                                    <option key={index} value={value}> {length}{'"'}</option>
                                )
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="hair-size">Hair Size</label>
                            <select required onChange={e => selectHandler(e, 'hairSize')}>
                                <option value={-1}>Select hair size</option>
                                {Object.entries(hairSizes).map(([Sizes, value],index) => (
                                    <option key={index} value={value}> {Sizes}</option>
                                )
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="form-bottom-section">
                        <div className="extras">
                            <p>Extras</p>
                            <div className="checkbox-div">
                                <input type="checkbox" name="extensions-check" id="extensions-check" value="extensions"  onChange={ e => handleCheckBoxChange(e, HAIR_EXTENSION_CHARGE, 'extension')}/>
                                <label htmlFor="extensions-check">Extensions provided for you</label><br/>
                            </div>
                            <div className="checkbox-div">
                                <input type="checkbox" name="home-service-check" id="home-service-check" value="homeService" 
                                onChange={(e)=> {
                                    setAddressShow(e.target.checked)
                                    handleCheckBoxChange(e, HOME_SERVICE_CHARGE, 'homeservice')}}/>
                                <label htmlFor="home-service-check">Select home service</label><br/>
                            </div>
                            {addressShow && (
                                <div className="address">
                                    <label htmlFor="client-address">Street Address</label>
                                    <input id="client-address" name="client-address" type="text" placeholder="Enter you full address..." autoComplete="street-address" ref={addressRef}/>
                                    <label htmlFor="client-address-city">City</label>
                                    <input id="client-address-city" name="client-address-city" type="text" placeholder="Enter your city..." autoComplete="address-level2" ref={cityRef}/>
                                </div>
                            )}
                            <div className="checkbox-div">
                                <input type="checkbox" name="extra-info-check" id="extra-info-check" value="extraInfo"  onChange={e => setExtraInfoShow(e.target.checked)}/>
                                <label htmlFor="extra-info-check">Add extra info for your booking</label><br/>
                            </div>
                            {extraInfoShow && (
                                <textarea id="extra-info" rows={5} maxLength={200} cols={25} wrap="hard" autoComplete="off" placeholder="add any extra information you would like Ore to know...." ref={extraInfoRef}/>   
                            )}
                        </div>
                        <div className="form-button">
                            <h1 className="finalPrice" id="final-price"> ${bookingPrice}{showStar && "*"}</h1>
                            <button className="submitButton" type="submit">Reserve</button>
                            {showStar  && (
                            <p className="checkout-notice" id="checkout-notice">*price may vary due to cost of extensions and distance</p>
                            )}
                        </div>
                    </div>
                </form>

            </VerticallyCenteredModal>
        
        </div>
    )

}