import { useDispatch, useSelector } from 'react-redux';
import { getFilterValue, updateFilterValue } from 'redux/filterSlice';
import { theme } from 'constants/theme';
import {
  FilterContainer,
  FilterField,
  FilterIcon,
} from './ContactFilter.styled';

export const ContactFilter = () => {
  const filterValue = useSelector(getFilterValue);
  const dispatch = useDispatch();

  const handleFilterValueChange = ({ currentTarget }) =>
    dispatch(updateFilterValue({ filterValue: currentTarget.value }));

  const onEscPress = ({ code }) => {
    if (code !== 'Escape') return;

    dispatch(updateFilterValue({ filterValue: '' }));
  };

  onkeydown = onEscPress;

  return (
    <FilterContainer>
      <FilterField
        type="text"
        name="filter"
        aria-label="Phonebook filter"
        placeholder="Filtered Search"
        value={filterValue}
        onChange={handleFilterValueChange}
      />
      <FilterIcon size={theme.sizes.filterFieldIcon} />
    </FilterContainer>
  );
};
