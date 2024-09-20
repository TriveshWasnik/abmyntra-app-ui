import React, { useState } from "react";
import Container from "../ui/Container";
import { Link, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";

// Search Page : show search products
function SearchPage() {
  // get the keyword from query string
  const { keyword } = useParams();
  // store all the products
  const [products, setProducts] = useState([]);
  (async function () {
    try {
      // fetch all the api data
      const res = await axios.get(
        `https://api.escuelajs.co/api/v1/products/?title=${keyword}`
      );
      // store the api data in products
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  })();

  return (
    <>
      <Container>
        <h1 className="text-lg font-bold ml-5 mt-3">
          {`Total Search Result of ${keyword} : ${products.length}`}
        </h1>

        <div className="flex items-center justify-center w-full gap-10 flex-wrap ">
          {products.map((data) => (
            <div className="w-64 p-2 h-96 text-left text-[#521c03] tracking-wider">
              <Link to={"/details"} state={data}>
                <Carousel
                  className="w-64 p-2"
                  showThumbs={false}
                  showArrows={false}
                  autoPlay={true}
                >
                  <div>
                    <img src={data.images[0]} />
                  </div>
                  <div>
                    <img src={data.images[1]} />
                  </div>
                  <div>
                    <img src={data.images[2]} />
                  </div>
                </Carousel>
                <div className="my-2 pl-3">
                  <div className=" font-bold mt-6">{data.title}</div>
                  <div className="text-sm text-gray-500">
                    {data.category.name}
                  </div>
                  <div className="flex items-center">
                    <div className=" font-bold text-sm "> $ {data.price}</div>
                    <div className="text-xs text-gray-400 line-through ml-1 ">
                      $ {data.price + 22}
                    </div>
                    <div className="text-xs text-orange-400 ml-1">
                      ($ 22 OFF)
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default SearchPage;
