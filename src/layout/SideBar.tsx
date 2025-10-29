import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { menueItems } from "../utils/const";

const SideBar = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  return (
    <aside
      className={`md:w-[200px]  border-b pb-2 sm:pb-0 ${
        i18n.language === "en"
          ? " sm:border-r-2 sm:border-r-black sm:dark:border-r-white"
          : "sm:border-l-2 sm:border-l-black sm:dark:border-l-white"
      }`}
    >
      <nav>
        <ul className="flex sm:block">
          {menueItems.map((item) => (
            <li key={item.id} className={`md:text-center  capitalize ${item.url === pathname ? "font-extrabold" : ""}`}>
              <Link className=" h-full inline-block p-4" to={item.url}>
                <span className={`${item.url === pathname ? " border-b-2 border-b-gold-100 dark:border-b-darkText  " : ""}`}>
                  {t(item.title)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
