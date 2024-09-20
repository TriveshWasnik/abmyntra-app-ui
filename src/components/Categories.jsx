import React from "react";
import Container from "../ui/Container";
import Cart from "../ui/Cart";

// Get the Categories

function Categories({ data }) {
  return (
    <Container>
      <div className="flex items-center justify-center w-full gap-10 flex-wrap ">
        {data.map((item) => (
          <Cart
            key={item.id}
            pic={item.picPath || item.image}
            name={item.name}
            discountRange={item.discountRange}
          />
        ))}
      </div>
    </Container>
  );
}

export default Categories;
