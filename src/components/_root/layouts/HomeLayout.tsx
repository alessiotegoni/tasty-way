import Navbar from "@/components/shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="hero">
      <Navbar pageNum={0} />
      <main className="home group mt-12 sm:mt-6">
        <div className="md:container">
          <div className="w-full text-center mb-6 sm:mb-10">
            <div className="home__title">
              <h1 className="text-[25px] xs:text-[30px] sm:text-[44px] text-primary">
                Il tuo cibo preferito
              </h1>
              <h1 className="text-[25px] xs:-mt-2 xs:text-[30px] sm:text-[44px] xs:leading-[53px]">
                consegnato in un attimo.
              </h1>
            </div>
            <p className="home__subtitle">
              Con
              <span className="text-primary"> TastyWay</span>, puoi esplorare i
              migliori ristoranti della tua città e ricevere i tuoi piatti
              preferiti direttamente a casa tua, sempre freschi e deliziosi.
            </p>
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default HomeLayout;
