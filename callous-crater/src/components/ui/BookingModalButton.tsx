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
    const [bookingPrice, setBookingPrice] = useState(price)
    const [showStar, setShowStar] = useState(false)
    const [starCounter, setStarCounter] = useState(0)
    const [hairLengthValue, setHairLengthValue] = useState(0)
    const prevHairLengthValue = useRef(10)
    const [hairSizeValue, setHairSizeValue] = useState(0)
    const prevHairSizeValue = useRef(10)

    
    function submitHandler(e) {
        e.preventDefault;
        console.log("Button clicked")
        toast("testing testing....")
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

    function selectHandler(e, type) {
        const value = Number(e.target.value);
        if (type === 'hairLength') {
            console.log('Previous Hair Length:', prevHairLengthValue.current);
            console.log('New Hair Length:', value);
            setHairLengthValue(value);
            setBookingPrice(prevValue => {
                var newPrice = Number(prevValue) + (+value - +prevHairLengthValue.current);
                console.log('Updated Price:', newPrice);
                return newPrice;
            });
            prevHairLengthValue.current = value;
        } else {
            console.log('Previous Hair Size:', prevHairSizeValue.current);
            console.log('New Hair Size:', value);
            setHairSizeValue(value);
            setBookingPrice(prevValue => {
                console.log('Previous price', Number(prevValue))
                var newPrice = Number(prevValue) + (Number(value) - Number(prevHairSizeValue.current));
                console.log('Updated Price:', newPrice);
                return newPrice;
            });
            prevHairSizeValue.current = value;
        }
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
  

    
    function handleCheckBoxChange(e, priceIncrease){
        const isChecked = e.target.checked
       if(isChecked){
        setBookingPrice(prevPrice => +prevPrice + +priceIncrease);
        increaseStarCount()
       }
       else{
        setBookingPrice(prevPrice => +prevPrice - +priceIncrease);
        reduceStarCount()
       }
    }

    useEffect(() => {
        if (modalShow) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
            setAddressShow(false);
            setExtraInfoShow(false);
            setBookingPrice(price)
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
                <form>
                    <div className="form-top-section">
                        <div className="form-group">
                            <label htmlFor="fname">Name</label>
                            <input type="text" id="fname" name="fname" autoComplete="name" required ></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" autoComplete="tel-national" required ></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" autoComplete="email" required ></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date-time">Date & Time</label>
                            <input type="datetime-local" id="date-time" name="date-time"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="hair-length">Hair Length</label>
                            <select onChange={e => selectHandler(e, 'hairLength')}>
                                {Object.entries(hairLengths).map(([length, value],index) => (
                                    <option key={index} value={value}> {length}</option>
                                )
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="hair-size">Hair Size</label>
                            <select onChange={e => selectHandler(e, 'hairSize')}>
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
                                <input type="checkbox" name="extensions-check" id="extensions-check" value="extensions" onChange={ e => handleCheckBoxChange(e, HAIR_EXTENSION_CHARGE)}/>
                                <label htmlFor="extensions-check">Extensions provided for you</label><br/>
                            </div>
                            <div className="checkbox-div">
                                <input type="checkbox" name="home-service-check" id="home-service-check" value="homeService" 
                                onChange={(e)=> {
                                    setAddressShow(e.target.checked)
                                    handleCheckBoxChange(e, HOME_SERVICE_CHARGE)}}/>
                                <label htmlFor="home-service-check">Select home service</label><br/>
                            </div>
                            {addressShow && (
                                <div className="address">
                                    <label htmlFor="client-address">Street Address</label>
                                    <input id="client-address" name="client-address" type="text" placeholder="Enter you full address..." autoComplete="street-address"/>
                                    <label htmlFor="client-address-city">City</label>
                                    <input id="client-address-city" name="client-address-city" type="text" placeholder="Enter your city..." autoComplete="address-level2"/>
                                </div>
                            )}
                            <div className="checkbox-div">
                                <input type="checkbox" name="extra-info-check" id="extra-info-check" value="extraInfo"  onChange={e => setExtraInfoShow(e.target.checked)}/>
                                <label htmlFor="extra-info-check">Add extra info for your booking</label><br/>
                            </div>
                            {extraInfoShow && (
                                <textarea id="extra-info" rows={5} maxLength={200} cols={25} wrap="hard" autoComplete="off" placeholder="add any extra information you would like Ore to know...."/>   
                            )}
                        </div>
                        <div className="form-button">
                            <h1 className="finalPrice" id="final-price"> ${bookingPrice}{showStar && "*"}</h1>
                            <button className="submitButton" onSubmit={submitHandler}>Reserve</button>
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