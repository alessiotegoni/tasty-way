import { type OrderItem } from "@/types/restaurantTypes";

interface OrderItemProps {
  item: OrderItem;
  className?: string;
  itemImgSize?: number;
  fontSize?: number;
}

const OrderItem = ({
  item,
  className,
  itemImgSize,
  fontSize,
}: OrderItemProps) => {
  return (
    <li
      className={`item rounded-xl py-2 p-3 bg-[#ff232355] ${className}`}
      key={item._id}
    >
      <div className="w-full flex gap-2">
        <figure
          className={`shrink-0 w-[${itemImgSize}px] h-[${itemImgSize}px] self-center flex-center`}
        >
          <img
            src={item.img ?? "/imgs/default-restaurant-item.png"}
            alt={item.name}
            className="object-contain"
          />
        </figure>
        <div className={`w-full flex flex-col justify-between`}>
          <figcaption
            className={`font-semibold self-start ${
              fontSize ? `text-[${fontSize}px]` : "text-[13px]"
            }`}
          >
            {item.name}
          </figcaption>
          <div
            className={`flex-between mt-2 ${
              fontSize ? `text-[${fontSize}px]` : "text-[13px]"
            }`}
          >
            <p>x{item.quantity}</p>
            <h2 className="font-medium">${item.price}</h2>
          </div>
        </div>
      </div>
    </li>
  );
};
export default OrderItem;
