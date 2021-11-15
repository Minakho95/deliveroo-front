import React from "react";

const Menu = ({ data, addMeal }) => {
  return (
    <div className="menu">
      {data.categories.map((category, index) => {
        return (
          category.meals.length > 0 && (
            <div className="category">
              <h3>{category.name}</h3>
              <div className="single-category">
                {category.meals.map((meal, i) => {
                  return (
                    <div
                      key={meal.id}
                      className="meal"
                      onClick={() => addMeal(meal.title, meal.id, meal.price)}
                    >
                      <div className="meal-title">
                        <h4>{meal.title}</h4>
                        <p>{meal.description}</p>
                        <span>{meal.price} €</span>
                        {meal.popular ? (
                          <span> populaire </span>
                        ) : (
                          <span></span>
                        )}
                      </div>
                      {meal.picture && (
                        <div className="meal-img">
                          <img src={meal.picture} alt="meal-img" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default Menu;
