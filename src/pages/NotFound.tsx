import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center  text-center">
      <h1 className="text-5xl font-bold mb-4 text-red-500">404</h1>
      <p className="text-lg mb-6">{t("not_found")}</p>
      <Link to="/" className="text-blue-500 underline hover:text-blue-700 transition-colors"></Link>
      <Button onClick={() => navigate("/", { replace: true })}>{t("back_to_main")}</Button>
    </div>
  );
};

export default NotFound;
