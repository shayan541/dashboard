import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { menueItems } from "../utils/const";

const SideBar = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  return (
    <aside
      className={`md:w-[200px]  border-b ${
        i18n.language === "en"
          ? " sm:border-r-2 sm:border-r-black sm:dark:border-r-white"
          : "sm:border-l-2 sm:border-l-black sm:dark:border-l-white"
      }`}
    >
      <nav>
        <ul className="flex sm:block">
          {menueItems.map((item) => (
            <li key={item.id} className={`md:text-center  capitalize ${item.url === pathname ? "font-extrabold " : ""}`}>
              <Link className="w-full h-full inline-block p-4" to={item.url}>
                {t(item.title)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
