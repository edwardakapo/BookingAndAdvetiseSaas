import React from "react";
import './css/bookingModal.css'
import VerticallyCenteredModal from "./VerticallyCenteredModal";
import { toast } from 'react-toastify';

export default function BookingModalButton(){

    const [modalShow, setModalShow] = React.useState(false);
    
    function submitHandler() {
        console.log("Button clicked")
        toast("testing testing....")
    }

    React.useEffect(() => {
        if (modalShow) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
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
                <h1> Complete Your Booking</h1>
                <form>

                    <div className="form-group">
                        <label htmlFor="fname">Name</label>
                        <input type="text" id="fname" name="fname" autoComplete="name"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="number">Phone Number</label>
                        <input type="number" id="number" name="number" autoComplete="tel-area-code"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" autoComplete="email"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date-time">Date & Time</label>
                        <input type="datetime-local" id="date-time" name="date-time" step="3600" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="hair-length">Hair Length</label>
                        <select>
                            <option>52"</option>
                            <option>54"</option>
                            <option>55"</option>
                            <option>56"</option>
                            <option>57"</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="hair-size">Hair Size</label>
                        <select>
                            <option>extra small</option>
                            <option>small</option>
                            <option>medium</option>
                            <option>large</option>
                        </select>
                    </div>
                </form>

                <button onClick={submitHandler}> CLick here</button>
            </VerticallyCenteredModal>
        
        </div>
    )

}