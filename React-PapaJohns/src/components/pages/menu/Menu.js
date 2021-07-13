import MenuContextProvider from "../../store/MenuContextProvider";

import PageTitle from "../../UI/PageTitle";
import Categories from "./Categories";
import Products from "./Products";

function Menu() {
  return (
    <section className="section-menu">
      <PageTitle title="MENYU" />
      <MenuContextProvider>
        <Categories />
        <Products />
      </MenuContextProvider>
    </section>
  );
}

export default Menu;
