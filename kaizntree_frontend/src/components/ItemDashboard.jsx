import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faArrowDownWideShort, faArrowUpWideShort, faSearch, faShapes, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import '../styles/ItemDashboard.css';

const ItemDashboard = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [newItem, setNewItem] = useState({
    sku: '',
    name: '',
    category: '',
    tags: [],
    stock_status: '',
    available_stock: '',
  });
  const [sendNewItem, setSendNewItem] = useState({
    sku: '',
    name: '',
    category: '',
    tags: [],
    stock_status: '',
    available_stock: '',
  });
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    stockStatus: '',
  });
  const [sortOrder, setSortOrder] = useState('');
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    const fetchItemsAndData = async () => {
      const params = new URLSearchParams({
        ...(searchTerm && { search: searchTerm }),
        ...(filters.category && { category: filters.category }),
        ...(filters.stockStatus && { stock_status: filters.stockStatus }),
        ...(sortOrder && { sort: sortOrder }),
      });
  
      try {
        const itemsResponse = await axios.get(`http://localhost:8000/api/items/?${params.toString()}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setItems(itemsResponse.data);
  
        if(!categories.length){
          const categoriesResponse = await axios.get('http://localhost:8000/api/categories/', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
          });
          setCategories(categoriesResponse.data);
        }
  
        if(!tags.length){
          const tagsResponse = await axios.get('http://localhost:8000/api/tags/', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
          });
          setTags(tagsResponse.data);
        }
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchItemsAndData();
  }, [searchTerm, filters, sortOrder]);

  const toggleNewCategoryModal = () => {
    setShowNewCategoryModal(!showNewCategoryModal);
  };
  
  const handleNewCategoryNameChange = (e) => {
    setNewCategoryName(e.target.value);
  };
  
  const handleNewCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/categories/', { name: newCategoryName }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCategories([...categories, response.data]);
      setNewCategoryName('');
      toggleNewCategoryModal();
    } catch (error) {
      console.error('Error creating new category:', error);
    }
  };
  
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const toggleSort = () => {
    const nextSortOrder = (sortOrder === "asc") ? "desc" : "asc";
    setSortOrder(nextSortOrder);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    toggleFilterModal();
  };
  const handleItemInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
    setSendNewItem({ ...sendNewItem, [name]: value });
  };

  const handleCategoryChange = (e) => {
    setNewItem({ ...newItem, category: e.target.value });
    console.log(e.target);
    setSendNewItem({ ...sendNewItem, category: parseInt(e.target.value) });
  };

  const handleTagChange = (e) => {
    const selectedTags = Array.from(e.target.selectedOptions, option => option.value);
    setNewItem({ ...newItem, tags: selectedTags });
    console.log(e.target.selectedOptions);
    const selectedTagsIds = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setSendNewItem({ ...sendNewItem, tags: selectedTagsIds });
  };

  const handleStockAvailabilityChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
    setSendNewItem({ ...sendNewItem, [name]: parseInt(value)});
  }

  const handleNewItemSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/items/', sendNewItem, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setNewItem({
        sku: '',
        name: '',
        category: '',
        tags: [],
        stock_status: '',
        available_stock: '',
      });
      setSendNewItem({
        sku: '',
        name: '',
        category: '',
        tags: [],
        stock_status: '',
        available_stock: '',
      });
      setItems([...items, response.data]);
    } catch (error) {
      console.error('Error creating new item:', error);
    }
    toggleModal();
  };

  const handleCheckboxChange = (e) => {
    const id = parseInt(e.target.value, 10);
    setSelectedItems(e.target.checked 
      ? [...selectedItems, id] 
      : selectedItems.filter(item => item !== id));
  };

  const handleSelectAll = (e) => {
    setSelectedItems(e.target.checked ? items.map(item => item.id) : []);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const isAllSelected = items.length > 0 && items.every(item => selectedItems.includes(item.id));

  return (
    <div className="item-dashboard">
        <Sidebar/>
        <div className="dashboard-content">   
          <div className="dashboard-header">
            <div>
              <h1>Item Dashboard</h1>
              <p>All items</p>
              <button onClick={toggleNewCategoryModal} className="new-item-category-btn">NEW ITEM CATEGORY</button>
            </div>
            <div className="summary">
              <div className="total-categories">
                <FontAwesomeIcon icon={faNetworkWired} />
                <h3>Total Categories</h3>
                <p>{categories.length}</p>
              </div>
              <div className="total-items">
                <FontAwesomeIcon icon={faShapes} />
                <h3>Total Items</h3>
                <p>{items.length}</p>
              </div>
            </div>
          </div>
          <div className="controls">
              <button onClick={toggleModal} className="add-new-item-btn">NEW ITEM</button>
              <div className="options-dropdown">
                  <button className="options-btn">OPTIONS <span className="arrow-down"></span></button>
              </div>
              <div className="search-container">
                  <input type="text" placeholder="Search" className="search-input" onChange={handleSearchChange}/>
                  <div className="btn-tooltip">
                    <button className="search-btn">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                <span className="tooltip-text">Search</span>
                  </div>
              </div>
              <div className="btn-tooltip">
                <button className="filter-btn" onClick={toggleFilterModal}>
                  <FontAwesomeIcon icon={faFilter} />
                </button>
                <span className="tooltip-text">Filter</span>
              </div>
              <div className="btn-tooltip">
                <button className="sort-btn" onClick={toggleSort}>
                  {sortOrder === "asc" ? <FontAwesomeIcon icon={faArrowDownWideShort} /> : <FontAwesomeIcon icon={faArrowUpWideShort} />}
                </button>
                <span className="tooltip-text">Sort</span>
              </div>
          </div>

          {showNewCategoryModal && (
            <div className="modal">
              <div className="modal-content">
                <h2>Add New Category</h2>
                <form onSubmit={handleNewCategorySubmit}>
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={handleNewCategoryNameChange}
                    placeholder="Category Name"
                    required
                  />
                  <div className="form-footer">
                    <button type="submit" className="submit-button">ADD</button>
                    <button type="button" className="close-button" onClick={toggleNewCategoryModal}>CLOSE</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {showFilterModal && (
            <div className="modal">
              <div className="modal-content">
                <h2>Filter Options</h2>
                <form onSubmit={applyFilters}>
                  <label htmlFor="category">Category:</label>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="stockStatus">Stock Status:</label>
                  <select
                    name="stockStatus"
                    value={filters.stockStatus}
                    onChange={handleFilterChange}
                  >
                    <option value="">All</option>
                    <option value="True">In Stock</option>
                    <option value="False">Out of Stock</option>
                  </select>
                  <div className="form-footer">
                    <button type="submit" className="submit-button">APPLY FILTERS</button>
                    <button type="button" className="close-button" onClick={toggleFilterModal}>CANCEL</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        
          {showModal && (
              <div className="modal">
              <div className="modal-content">
                  <h2>Add New Item</h2>
                  <form onSubmit={handleNewItemSubmit}>
                      <input
                          type="text"
                          name="sku"
                          placeholder="SKU"
                          value={newItem.sku}
                          onChange={handleItemInputChange}
                          required
                      />
                      <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          value={newItem.name}
                          onChange={handleItemInputChange}
                          required
                      />
                      <select
                          name="category"
                          value={newItem.category}
                          onChange={handleCategoryChange}
                          required
                      >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                  {category.name}
                              </option>
                          ))}
                      </select>
                      <label>Choose Tags</label>
                      <select
                          name="tags"
                          multiple={true}
                          value={newItem.tags}
                          onChange={handleTagChange}
                      >
                          {tags.map((tag) => (
                              <option key={tag.id} value={tag.id}>
                                  {tag.name}
                              </option>
                          ))}
                      </select>
                      <select
                          name="stock_status"
                          value={newItem.stock_status}
                          onChange={handleItemInputChange}
                          required
                      >
                          <option value="">Stock Status</option>
                          <option value="True">In Stock</option>
                          <option value="False">Out of Stock</option>
                      </select>
                      <input
                          type="number"
                          name="available_stock"
                          placeholder="Available Stock"
                          value={newItem.available_stock}
                          onChange={handleStockAvailabilityChange}
                          required
                      />
                      <div className="form-footer">
                        <button type="submit" className="submit-button">ADD ITEM</button>
                        <button type="button" className="close-button" onClick={toggleModal}>CANCEL</button>
                      </div>
                  </form>
              </div>
              </div>
          )}
          
          <table className="item-table">
              <thead>
              <tr>
                  <th>
                      <input
                          type="checkbox"
                          name="selectAll"
                          onChange={handleSelectAll}
                          checked={isAllSelected}
                      />
                  </th>
                  <th>SKU</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Tags</th>
                  <th>In Stock</th>
                  <th>Available Stock</th>
              </tr>
              </thead>
              <tbody>
                  {items.map((item) => (
                      <tr key={item.id}>
                      <td>
                          <input
                          type="checkbox"
                          name="selectedItems"
                          value={item.id}
                          onChange={handleCheckboxChange}
                          checked={selectedItems.includes(item.id)}
                          />
                      </td>
                      <td>{item.sku}</td>
                      <td>{item.name}</td>
                      <td>{item.category.name}</td>
                      <td>{item.tags.join(', ')}</td>
                      <td>
                          <span className={`stock-indicator ${item.stock_status === 'True' ? 'in-stock' : 'out-of-stock'}`}></span>
                          {item.stock_status === 'True' ? 'Yes' : 'No'}
                      </td>
                      <td>
                          <span className={`stock-indicator ${item.stock_status === 'True' ? 'in-stock' : 'out-of-stock'}`}></span>
                          {item.available_stock}
                      </td>
                      </tr>
                  ))}
              </tbody>
          </table>
        </div>
    </div>
  );
};

export default ItemDashboard;
