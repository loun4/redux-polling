import React, { useRef, useEffect, useCallback } from 'react';
import propTypes from 'prop-types';
import EditableCell from './EditableCell';

const Table = ({ data, editMode, onChange, onBlur, onFocus }) => {
  const tableRef = useRef(null);

  const handleChange = useCallback(
    (field, position) => editValue =>
      onChange({
        field,
        position,
        editValue,
      }),
    [onChange]
  );

  const handleBlur = useCallback(
    e => {
      if (
        editMode &&
        tableRef.current &&
        !tableRef.current.contains(e.target)
      ) {
        onBlur();
      }
    },
    [editMode, onBlur]
  );

  useEffect(() => {
    document.addEventListener('click', handleBlur, false);
    return () => {
      document.removeEventListener('click', handleBlur, false);
    };
  }, [handleBlur]);

  return (
    <table ref={tableRef}>
      <tbody>
        {['NASDAQ', 'CAC40'].map(field => (
          <tr key={field}>
            <th>{field}</th>
            {data.map((item, index) => (
              <EditableCell
                key={item.id}
                value={item[field]}
                onChange={handleChange(field, index)}
                onFocus={editMode ? null : onFocus}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  data: propTypes.arrayOf(propTypes.shape({})).isRequired,
  onChange: propTypes.func.isRequired,
  onBlur: propTypes.func.isRequired,
  onFocus: propTypes.func.isRequired,
  editMode: propTypes.bool,
};

Table.defaultProps = {
  editMode: false,
};

export default Table;
