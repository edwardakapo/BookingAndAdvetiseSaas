import React, { useState, useEffect } from 'react';
import BookingCard from './BookingCard'; // Adjust the import path as necessary
import './css/bookingGrid.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/toastifyOverride.css'

export default function BookingGrid({ items }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };


  useEffect(() => {
    let filtered = items.filter(item =>
      item.hairStyleName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filtered.length === 0) {
      filtered = items; // Show all items if no match
    }

    setFilteredItems(filtered);
  }, [searchTerm, items]);

  useEffect(() => {
    let sorted = [...filteredItems];

    if (sortType === 'price') {
        sorted.sort((a, b) => {
            const priceA = a.salePrice ? parseFloat(a.salePrice) : parseFloat(a.price);
            const priceB = b.salePrice ? parseFloat(b.salePrice) : parseFloat(b.price);
            return priceA - priceB;
          });
    } else if (sortType === 'duration') {
      sorted.sort((a, b) => a.duration.localeCompare(b.duration));
    } else if (sortType === 'sale') {
        sorted = items.filter(item => item.onSale);
        if (sorted.length === 0) {
          sorted = items; // Show all items if no sale items found
          console.log("no items")
        }
    }
    else if (sortType === 'clear'){ 
        sorted = items;
    }


    setFilteredItems(sorted);
  }, [sortType, items]);


  return (
    <div className='booking-grid-container'>
        <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        // theme="dark"
        transition: Bounce
        />
      <div className='searchBar'>
          <div className='searchBar-icon'>
            <svg xmlns="http://www.w3.org/2000/svg" id='search-icon' x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
              <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
            </svg>
            <input
              type="text"
              className='search-input'
              placeholder="Find your style..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <select onChange={handleSortChange} value={sortType} className='select-input'>
            <option value="">Sort By</option>
            <option value="price">Price</option>
            <option value="duration">Duration</option>
            <option value="sale">On Sale</option>
            <option value="clear">Clear Filters</option>
          </select>
      </div>
      <ul className="booking-grid">
        {filteredItems.map((item, index) => (
          <li
            key={index}
            className="booking-item"
            data-hairstyle-name={item.hairStyleName}
            data-price={item.price}
            data-duration={item.duration}
            data-sale={item.sale ? 'true' : 'false'}
          >
            <BookingCard {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
}