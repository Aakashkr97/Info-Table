import React from 'react';

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
      Search: 
      <input
        value={filter || ''}
        onChange={e => setFilter(e.target.value || undefined)}
        placeholder="Type to search..."
      />
    </span>
  );
};
