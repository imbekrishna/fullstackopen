import { filterChange } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';

const VisibilityFilter = () => {
  const dispatch = useDispatch();

  return (
    <div className="filterDiv">
      <div>
        <input
          id="all"
          type="radio"
          name="filter"
          onChange={() => dispatch(filterChange('ALL'))}
        />
        <label htmlFor="all">All</label>
      </div>
      <div>
        <input
          id="important"
          type="radio"
          name="filter"
          onChange={() => dispatch(filterChange('IMPORTANT'))}
        />
        <label htmlFor="important">Important</label>
      </div>
      <div>
        <input
          id="nonimportant"
          type="radio"
          name="filter"
          onChange={() => dispatch(filterChange('NONIMPORTANT'))}
        />
        <label htmlFor="nonimportant">Non-Important</label>
      </div>
    </div>
  );
};

export default VisibilityFilter;
