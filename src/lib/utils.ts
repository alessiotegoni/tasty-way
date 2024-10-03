import { ErrorWidgetProps } from "@/components/widgets/ErrorWidget";
import { CartItem, CartItemType } from "@/contexts/CartContext";
import { ApiError } from "@/types/apiTypes";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const filterSearchedLocations = (slArr: string[], userInput: string) => {
  const filteredSl = userInput
    ? slArr.filter((sl) =>
        sl
          .toLowerCase()
          .split(",")
          ?.at(0)!
          .includes(userInput.toLowerCase().split(",")?.at(0)!)
      )
    : [];

  return filteredSl;
};

export const getCityFromAddress = (address: string) => {
  let city = address.split(",").at(1)!;

  if (parseInt(city)) city = address.split(",").at(2)!;

  if (!city) return "nella tua citta'";

  return `a ${city}`;
};

export const formatRestaurantName = (name: string) =>
  name.toLowerCase().replace(/\s+/g, "-");

export const getInvalidAddressProps = (
  removeSelectedAddress: () => void,
  error?: ApiError | null
): ErrorWidgetProps => ({
  error,
  className: "primary-widget-bg border border-primary-20 rounded-[30px]",
  subtitle:
    "Non siamo riusciti a trovare ristoranti nella tua zona perché non è stato inserito un indirizzo valido. Per scoprire i migliori ristoranti vicini a te, inserisci un indirizzo corretto nel campo di ricerca. Questo ci aiuterà a mostrarti le opzioni più adatte e vicine.",
  btns: [
    {
      id: "change_location",
      value: "Cambia posizione",
      icon: "cursor-icon",
      className: "use-location-btn my-0",
      goto: "/",
      handleClick: () => removeSelectedAddress(),
    },
  ],
});

export const getNoRestaurantsProps = (
  removeFilters: () => void,
  removeSelectedAddress: () => void
): ErrorWidgetProps => ({
  title: "Oops! Non abbiamo trovato il ristorante che stai cercando.",
  className: "primary-widget-bg border border-primary-20 rounded-[30px]",
  subtitle:
    "Ma non preoccuparti! Prova a controllare la tua ricerca per eventuali errori di ortografia, oppure esplora ristoranti simili che potrebbero piacerti. Continuare la tua esplorazione?",
  btns: [
    {
      id: "reset_filters",
      value: "Resetta filtri",
      icon: "reset-filters-icon",
      className:
        "bg-home-widget-border-30 border border-primary-80 my-0 hover:bg-home-widget-border-80",
      handleClick: () => removeFilters(),
    },
    {
      id: "change_position",
      value: "Cambia posizione",
      icon: "cursor-icon",
      className: "use-location-btn my-0 border-location-btn-border-70",
      goto: "/",
      handleClick: () => removeSelectedAddress(),
    },
  ],
});

interface CartActionsParams {
  itemId: string;
  cartItem?: CartItemType;
  cartItems: CartItemType[];
}

interface AddCartItemParams extends CartActionsParams {
  restaurantId?: string;
  defaultItem: CartItem;
  cartItemIndex?: number;
}

export const addCartItem = ({
  restaurantId,
  itemId,
  defaultItem,
  cartItem,
  cartItems,
  cartItemIndex,
}: AddCartItemParams): CartItemType[] => {
  if (!cartItem)
    return [
      ...cartItems,
      { restaurantId: restaurantId!, items: [defaultItem] },
    ];

  const itemIndex = cartItem.items.findIndex((ci) => ci._id === itemId);

  let newCartItems: CartItem[] = [];

  if (itemIndex !== -1) {
    const item = cartItem.items.at(itemIndex)!;

    newCartItems = cartItem.items.with(itemIndex, {
      ...item,
      qnt: item.qnt + 1,
    });
  } else {
    newCartItems = [...cartItem.items, defaultItem];
  }

  return cartItems.with(cartItemIndex!, {
    ...cartItem,
    items: newCartItems,
  });
};

interface RemoveCartItemParams extends CartActionsParams {
  itemIndex: number;
}

export const removeCartItem = ({
  itemId,
  itemIndex,
  cartItem,
  cartItems,
}: RemoveCartItemParams): CartItemType[] => {
  const cartItemIndex = cartItem!.items.findIndex((ci) => ci._id === itemId);

  if (cartItemIndex === -1) return cartItems;

  const cartItemPlate = cartItem!.items.at(cartItemIndex)!;

  let newCartItemPlate = [];

  if (cartItemPlate.qnt <= 1)
    newCartItemPlate = cartItem!.items.filter((i) => i._id !== itemId);
  else
    newCartItemPlate = cartItem!.items.map((i) =>
      i._id === itemId ? { ...i, qnt: i.qnt - 1 } : i
    );

  return cartItems.with(itemIndex, {
    ...cartItem!,
    items: newCartItemPlate,
  });
};
