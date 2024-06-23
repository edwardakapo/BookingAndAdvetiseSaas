import React, { useState, useEffect } from 'react';
import BookingCard from './BookingCard'; // Adjust the import path as necessary
import './css/bookingGrid.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  // const gridStyle = {
  //   gridTemplateColumns: filteredItems.length <= 1 ? '1fr' :
  //                        filteredItems.length === 2 ? '1fr 1fr' : '1fr 1fr 1fr',
  //   width: filteredItems.length <= 1 ? '33%' :
  //          filteredItems.length === 2 ? '66%' : '100%',
  // };

  return (
    <div className='booking-grid-container'>
      <ToastContainer />
      <div className='searchBar'>
          <input
            type="text"
            className='search-input'
            placeholder="Find your style..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
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