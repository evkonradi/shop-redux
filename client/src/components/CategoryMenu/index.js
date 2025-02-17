import React, { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from "../../utils/queries";
// import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';

// import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from '../../utils/helpers';

import { useDispatch, useSelector } from 'react-redux';
import { updateCategories, updateCurrentCategory } from '../ProductList/productSlice';


function CategoryMenu() {

  //const [state, dispatch] = useStoreContext();
  const dispatch = useDispatch();

  //const { categories } = state;
  const categories = useSelector(state => state.productItems.categories);

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {

      dispatch(updateCategories({
        categories: categoryData.categories
      }));

      // dispatch({
      //   type: UPDATE_CATEGORIES,
      //   categories: categoryData.categories
      // });
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {

        dispatch(updateCategories({
          categories: categories
        }));
  
        // dispatch({
        //   type: UPDATE_CATEGORIES,
        //   categories: categories
        // });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = id => {

    dispatch(updateCurrentCategory({
      currentCategory: id
    }));


    // dispatch({
    //   type: UPDATE_CURRENT_CATEGORY,
    //   currentCategory: id
    // });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
