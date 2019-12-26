import React from 'react';
import propTypes from 'prop-types';

const EditableCell = ({ value, onChange, onFocus }) => {
  const handleChange = e => onChange(Number(e.target.value));

  return (
    <td>
      <input
        type="number"
        step=".01"
        value={value}
        onChange={handleChange}
        onFocus={onFocus}
      />
    </td>
  );
};

EditableCell.propTypes = {
  value: propTypes.number.isRequired,
  onChange: propTypes.func.isRequired,
  onFocus: propTypes.func,
};

EditableCell.defaultProps = {
  onFocus: null,
};

export default EditableCell;
