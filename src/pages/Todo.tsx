import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { SubmitHandler } from "react-hook-form";

import Button from "../components/ui/Button";
import TodoForm, { type IFormInput } from "../components/TodoForm";
import Table from "../components/Table";
import AreYouSureModal from "../components/ui/AreYouSureModal";
import { toast, Toaster } from "sonner";

const MODAL_ENUM = {
  ADD: "add",
  DELETE: "delete",
  EDIT: "edit",
};

const Todo = () => {
  const [showModal, setShowModal] = useState("");
  const [storedDataState, setStoredDataState] = useState<IFormInput[]>([]);
  const [editItemId, setEditItemId] = useState("");
  const [deleteItemId, setDeleteItemId] = useState("");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const storedData: IFormInput[] = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")!) : [];
    setStoredDataState(storedData);
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const array = [...storedDataState];
    const newTodo = { ...data, id: Date.now().toString() + Math.random().toString(16).slice(2) };
    array.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(array));
    setStoredDataState(array);
    setShowModal("");
    toast.success(t("add_success"));
  };

  const editHandler = (id: string) => {
    setEditItemId(id);
    setShowModal(MODAL_ENUM.EDIT);
  };

  const deleteHandler = (id: string) => {
    setDeleteItemId(id);
    setShowModal(MODAL_ENUM.DELETE);
  };

  const deleteSubmit = () => {
    const targetId = storedDataState.findIndex((item) => item.id === deleteItemId);
    const copiedData = [...storedDataState];
    copiedData.splice(targetId, 1);
    localStorage.setItem("todos", JSON.stringify(copiedData));
    setStoredDataState(copiedData);
    setShowModal("");
    toast.success(t("delete_success"));
  };

  const editSubmit = (data: IFormInput) => {
    const index = storedDataState.findIndex((data) => data.id === editItemId);
    const copiedData = [...storedDataState];
    copiedData[index] = data;
    localStorage.setItem("todos", JSON.stringify(copiedData));
    setStoredDataState(copiedData);
    setShowModal("");
    toast.success(t("edit_success"));
  };
  return (
    <div className="w-full px-4">
      <Toaster position="top-center" richColors dir={i18n.language === "fa" ? "rtl" : "ltr"} />
      <Button onClick={() => setShowModal(MODAL_ENUM.ADD)}>{t("add_todo")}</Button>
      <div className="mt-8">
        {storedDataState.length > 0 ? (
          <div>
            <Table data={storedDataState} deleteHandler={deleteHandler} editHandler={editHandler} />
          </div>
        ) : (
          <p className="text-center">{t("add_new_task")}</p>
        )}
      </div>
      <TodoForm
        onSubmit={editSubmit}
        showModal={showModal === MODAL_ENUM.EDIT}
        closeModalHandler={() => setShowModal("")}
        data={storedDataState.find((data) => data.id === editItemId)}
      />
      <TodoForm onSubmit={onSubmit} showModal={showModal === MODAL_ENUM.ADD} closeModalHandler={() => setShowModal("")} />
      <AreYouSureModal
        closeModalHandler={() => setShowModal("")}
        showModal={showModal === MODAL_ENUM.DELETE}
        yesMethodHandler={deleteSubmit}
      />
    </div>
  );
};

export default Todo;
