import { FormEvent } from "react";

import { foodFilters } from "@/constants";
import { useNavigate } from "react-router-dom";
import { useAddress } from "@/contexts/AddressContext";
import LocationAutocomplete from "@/components/shared/autocomplete/LocationAutocomplete";
import { Button } from "@/components/ui/button";
import FoodTypeFilters from "@/components/shared/FoodTypeFilters";
import MyLocationBtn from "@/components/custom/MyLocationBtn";

const Home = () => {
  const { selectedAddress } = useAddress();

  const navigate = useNavigate();

  const handleSearchRestaurant = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedAddress) return;

    navigate("/restaurants");
  };

  return (
    <div className="home-widget sm:px-20">
      <h1 className="mb-[15px] sm:text-[22px] font-semibold">
        Trova i ristoranti vicini a te!
      </h1>
      <form onSubmit={handleSearchRestaurant} className="search-restaurant-box">
        <div className="flex items-center gap-2 pl-[10px] w-full">
          <img
            src="icons/location-icon.png"
            alt="location-icon"
            className="w-6 h-6"
          />
          <LocationAutocomplete
            shouldShowLatestResearchs={true}
            placeholder="Inserisci il tuo indirizzo"
            className="w-full sm:max-w-[260px]"
          />
        </div>
        <Button type="submit" className="search-btn">
          Cerca
        </Button>
      </form>
      <MyLocationBtn />
      <div className="mt-5">
        <FoodTypeFilters
          filters={foodFilters.slice(0, 5)}
          carouselContentClasses="justify-between"
        />
      </div>
    </div>
  );
};
export default Home;
