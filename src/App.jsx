import { useState} from "react";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart.jsx";
import StoreFrontPage from "./pages/StoreFrontPage.jsx";
import Header from "./components/common/Header/Header.jsx";

export default function App() {
    const [isCartOpened, setIsCartOpened] = useState(false);

      return (
          <div>
              <Header setIsCartOpened={setIsCartOpened} isCartOpened={isCartOpened}/>
              <div style={{display: "flex"}}>
                  <StoreFrontPage  setIsCartOpened={setIsCartOpened} isCartOpened={isCartOpened}/>
                  {isCartOpened && <ShoppingCart setIsCartOpened={setIsCartOpened}/>}
              </div>
          </div>

      )

}

