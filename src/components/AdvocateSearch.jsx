import { useState } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import './AdvocateSearch.css';

const AdvocateSearch = ({ onSearch, onFilterChange, filters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleFilterChange = (filterType, value) => {
    if (onFilterChange) {
      onFilterChange(filterType, value);
    }
  };

  const clearFilters = () => {
    if (onFilterChange) {
      onFilterChange('reset', null);
    }
  };

  const hasActiveFilters = filters && (
    filters.category || 
    filters.court || 
    filters.minRating > 0 ||
    filters.sortBy
  );

  return (
    <div className="advocate-search">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, category, or specialization..."
            className="search-input"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="clear-search"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`filter-toggle ${hasActiveFilters ? 'active' : ''}`}
        >
          <SlidersHorizontal size={20} />
          <span>Filters</span>
          {hasActiveFilters && <span className="filter-badge">•</span>}
        </button>
      </form>

      {showFilters && (
        <div className="filters-panel">
          <div className="filters-header">
            <h4>Filter & Sort</h4>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="clear-all">
                Clear All
              </button>
            )}
          </div>

          <div className="filters-grid">
            <div className="filter-group">
              <label>Category</label>
              <select
                value={filters?.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Criminal Law">Criminal Law</option>
                <option value="Family Law">Family Law</option>
                <option value="Divorce Law">Divorce Law</option>
                <option value="Property Law">Property Law</option>
                <option value="Corporate Law">Corporate Law</option>
                <option value="Cyber Law">Cyber Law</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Court Level</label>
              <select
                value={filters?.court || ''}
                onChange={(e) => handleFilterChange('court', e.target.value)}
              >
                <option value="">All Courts</option>
                <option value="District Court">District Court</option>
                <option value="High Court">High Court</option>
                <option value="Supreme Court">Supreme Court</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Minimum Rating</label>
              <select
                value={filters?.minRating || 0}
                onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
              >
                <option value="0">All Ratings</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.8">4.8+ Stars</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Sort By</label>
              <select
                value={filters?.sortBy || ''}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                <option value="">Default</option>
                <option value="rating-high">Highest Rating</option>
                <option value="rating-low">Lowest Rating</option>
                <option value="experience-high">Most Experienced</option>
                <option value="experience-low">Least Experienced</option>
                <option value="fees-low">Lowest Fees</option>
                <option value="fees-high">Highest Fees</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvocateSearch;
