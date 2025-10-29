import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import OptionBox from "../components/ui/OptionBox";

import { SettingContext } from "../store/SettingContext";

const Header = () => {
  const { i18n, t } = useTranslation();

  const context = useContext(SettingContext);
  if (!context) throw new Error("context not exist");
  const { name } = context;

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    const dir = i18n.language === "fa" ? "rtl" : "ltr";
    document.body.dir = dir; // body direction
    document.documentElement.lang = i18n.language;
    document.body.style.textAlign = i18n.language === "fa" ? "right" : "left";
  }, [i18n.language]);

  return (
    <header dir="ltr" className="bg-gold-100 px-4 h-12 flex items-center justify-between dark:bg-slate-800">
      <div>Deka Post</div>

      <div className="flex gap-4">
        <OptionBox
          id="language"
          options={[
            { key: "en", value: "English" },
            { key: "fa", value: "فارسی" },
          ]}
          onChange={(lang) => {
            i18n.changeLanguage(lang);
            localStorage.setItem("lang", lang);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 0 20" />
            <path d="M12 2a15.3 15.3 0 0 0 0 20" />
          </svg>
        </OptionBox>

        <OptionBox text={name ? null : t("notif")}>
          <svg _ngcontent-ng-c3064967657="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              style={{ fill: "#FF6347" }}
              _ngcontent-ng-c3064967657=""
              d="M11 19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19H11ZM12 6C10.6739 6 9.40215 6.52678 8.46447 7.46447C7.52678 8.40215 7 9.67392 7 11V17H17V11C17 9.67392 16.4732 8.40215 15.5355 7.46447C14.5979 6.52678 13.3261 6 12 6ZM15 19C15 19.7956 14.6839 20.5587 14.1213 21.1213C13.5587 21.6839 12.7956 22 12 22C11.2044 22 10.4413 21.6839 9.87868 21.1213C9.31607 20.5587 9 19.7956 9 19H3V17H5V11C4.99998 9.31655 5.60648 7.68944 6.7084 6.41673C7.81031 5.14402 9.33387 4.31091 11 4.07V2H13L13.001 4.071C14.6668 4.3121 16.19 5.14516 17.2917 6.41764C18.3933 7.69012 18.9998 9.31687 19 11V17H21V19H15Z"
              fill="#121619"
            ></path>
            {!name && <rect _ngcontent-ng-c3064967657="" width="6" height="6" rx="3" fill="#DA1E28"></rect>}
          </svg>
        </OptionBox>
      </div>
    </header>
  );
};

export default Header;
