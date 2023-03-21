import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

const CategoriesNavBarComponent = () => {
  const { categories } = useSelector((state) => state.getCategories);
  
  return (
    <ul className="nav justify-content-center bgcolor fixed-top mt-5">
      {categories.map((category, idx) => (
        <li className="nav-item" key={idx}>
          <Link
            className="text-1 nav-link"
            to={`/product-list/category/${category.name.replaceAll("/", ",")}`}
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoriesNavBarComponent;
