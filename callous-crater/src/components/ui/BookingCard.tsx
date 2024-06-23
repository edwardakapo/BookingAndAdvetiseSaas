import EmblaCarousel from "./EmblaCarousel";
import './css/bookingCarousel.css'
import './css/bookingCard.css'
import BookingModalButton from "./BookingModalButton.jsx";
interface CardProps {
    tag: string;
    images: string[];
    hairStyleName: string;
    description: string;
    duration: string;
    price: string;
    salePrice?: string;
}

export default function BookingCard ({
    tag,
    images,
    hairStyleName,
    description,
    duration,
    price,
    salePrice
}: CardProps) {

    const OPTIONS = {}
    return (
        <div className="container">
            {/* IF TAG Exists Populate it else use the default which is empty */}
            {tag ?
                (<div className="tag-container"><p className="tag">{tag}</p></div>) : (
                    <div className="DefaultTag"></div>)
            }
            <div className="imageCarousel">
                <EmblaCarousel images={images} options={OPTIONS} />
            </div>
            <div className="card-elements">

                <h1 className="hairStyle">{hairStyleName}</h1>
                <h2 className="description">{description}</h2>
                <div className="duration-container">
                    <svg  className="clockIcon" width="2rem" height="2rem" viewBox="0 0 24 24" fill="none"  xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 7V12L13.5 14.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="var(--main-text-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="duration">{duration}</p>
                </div>
                <div className="btn-section">
                    <h1 className="price">
                        {/* IF Sale Exists create original with strike through and sale*/}

                        {salePrice ? (
                            <>
                                <span className="original-price">{`$${price}`}</span>
                                <span className="sale-price">{`$${salePrice}`}</span>
                            </>
                        ) : (
                            <span>{`$${price}`}</span>
                        )}
                    </h1>
                    <BookingModalButton />
                </div>

            </div>
        </div>
    );
}
