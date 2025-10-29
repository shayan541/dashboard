import React from "react";
import { useTranslation } from "react-i18next";

import Modal from "./Modal";
import Button from "./Button";

const AreYouSureModal: React.FC<{ showModal: boolean; closeModalHandler: () => void; yesMethodHandler: () => void }> = ({
  showModal,
  closeModalHandler,
  yesMethodHandler,
}) => {
  const { t } = useTranslation();
  return (
    <Modal closeModalHandler={closeModalHandler} showModal={showModal}>
      <div className="bg-white border shadow rounded p-4">
        <h2 className="font-bold">{t("delete")}</h2>
        <p className="mt-4">{t("are_you_sure_delete")}</p>
        <div className="mt-2 flex gap-2">
          <Button className="bg-red-600 dark:bg-red-600" onClick={yesMethodHandler}>
            {t("yes")}
          </Button>
          <Button onClick={closeModalHandler}>{t("cancel")}</Button>
        </div>
      </div>
    </Modal>
  );
};

export default AreYouSureModal;
