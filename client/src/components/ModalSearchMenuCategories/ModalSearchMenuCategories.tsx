import i_eat from "@/assets/i_eat.png";
import ModalCategoriesItem from "../ModalCategoriesItem/ModalCategoriesItem";
import {
  atmsTypes,
  autoServicesTypes,
  barsAndPubsTypes,
  beautyTypes,
  carWashesTypes,
  cinemasTypes,
  fitnessTypes,
  foodDeliveryTypes,
  foodTypes,
  gasStationsTypes,
  groceriesTypes,
  hospitalsTypes,
  hotelsTypes,
  pharmaciesTypes,
  shoppingCentersTypes,
} from "../../constans/constans";

type Props = {};

export default function ModalSearchMenuCategories({}: Props) {
  return (
    <div className="overflow-y-auto no-scrollbar grid grid-cols-4 gap-3 w-full mt-3">
      <ModalCategoriesItem
        arrCategory={foodTypes}
        img={i_eat}
        title="Где поесть"
      />
      <ModalCategoriesItem
        arrCategory={groceriesTypes}
        img={i_eat}
        title="Продукты"
      />
      <ModalCategoriesItem
        arrCategory={pharmaciesTypes}
        img={i_eat}
        title="Аптеки"
      />
      <ModalCategoriesItem
        arrCategory={beautyTypes}
        img={i_eat}
        title="Красота"
      />
      <ModalCategoriesItem
        arrCategory={atmsTypes}
        img={i_eat}
        title="Банкоматы"
      />
      <ModalCategoriesItem
        arrCategory={gasStationsTypes}
        img={i_eat}
        title="АЗС"
      />
      <ModalCategoriesItem
        arrCategory={hospitalsTypes}
        img={i_eat}
        title="Больницы"
      />
      <ModalCategoriesItem
        arrCategory={hotelsTypes}
        img={i_eat}
        title="Гостиницы"
      />
      <ModalCategoriesItem
        arrCategory={barsAndPubsTypes}
        img={i_eat}
        title="Бары и пабы"
      />
      <ModalCategoriesItem
        arrCategory={shoppingCentersTypes}
        img={i_eat}
        title="Торговые центры"
      />
      <ModalCategoriesItem
        arrCategory={cinemasTypes}
        img={i_eat}
        title="Кинотеатры"
      />
      <ModalCategoriesItem
        arrCategory={foodDeliveryTypes}
        img={i_eat}
        title="Доставка еды"
      />
      <ModalCategoriesItem
        arrCategory={carWashesTypes}
        img={i_eat}
        title="Автомойки"
      />
      <ModalCategoriesItem
        arrCategory={autoServicesTypes}
        img={i_eat}
        title="Автосервисы"
      />
      <ModalCategoriesItem
        arrCategory={fitnessTypes}
        img={i_eat}
        title="Фитнес"
      />
    </div>
  );
}
