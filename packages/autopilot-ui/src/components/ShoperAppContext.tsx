import { FC, createContext, useContext } from "react";

type IShopContext = {
  shopId: string;
  shoper: ShopApp | null;
};

const ShopAppContext = createContext<IShopContext>({
  shopId: "nope",
  shoper: null,
});

interface Props {
  shopId: string;
  children: JSX.Element;
}

export const useShop = () => useContext(ShopAppContext);

export const ShoperAppProvider: FC<Props> = (props) => {
  const app = new ShopApp((app) => {
    app.init(null, (params: Record<string, any>, app: ShopApp) => {
      app.show(null, () => {
        app.adjustIframeSize();
      });
    });
  });

  return (
    <ShopAppContext.Provider value={{ shoper: app, shopId: props.shopId }}>
      {props.children}
    </ShopAppContext.Provider>
  );
};
