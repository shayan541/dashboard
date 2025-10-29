import React from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Input from "./ui/Input";
import DropDown from "./ui/DropDown";
import CheckBox from "./ui/CheckBox";

import Modal from "./ui/Modal";
import { useEffect, useState } from "react";

export interface IFormInput {
  id: string;
  title: string;
  priority: string;
  isDone: boolean;
}
const TodoForm: React.FC<{
  onSubmit: SubmitHandler<IFormInput>;
  showModal: boolean;
  closeModalHandler: (status: boolean) => void;
  data?: IFormInput;
}> = ({ onSubmit, showModal, closeModalHandler, data }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<IFormInput>();

  const [priority, setPriority] = useState(data?.priority);
  const [isDone, setIsDone] = useState(data?.isDone);

  useEffect(() => {
    if (showModal && data) {
      reset(data);
    }
  }, [data, reset, showModal]);

  return (
    <Modal
      showModal={showModal}
      closeModalHandler={() => {
        closeModalHandler(false);
        reset();
        setPriority("");
        setIsDone(false);
      }}
    >
      <form
        className="flex flex-col p-4 gap-5"
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          setPriority("");
          setIsDone(false);
          reset();
        })}
      >
        <h2 className="font-bold">{t("add_todo")}</h2>
        <Input
          label={t("title")}
          register={register("title", { required: t("needed_field"), maxLength: { value: 20, message: t("input_large") } })}
          error={errors.title?.message}
          placeHolder={t("title")}
        />

        <div>
          <Controller
            name="priority"
            control={control}
            rules={{ required: t("needed_field") }}
            render={() => (
              <DropDown
                value={priority ? priority : data?.priority}
                name="priority"
                options={[
                  { key: "high", value: t("high") },
                  { key: "medium", value: t("medium") },
                  { key: "low", value: t("low") },
                ]}
                setValue={setValue}
                label={t("priority")}
                onChange={(i) => setPriority(i)}
                placeHolder={t("priority")}
              />
            )}
          />
          {errors.priority && <span className="text-red-500 text-sm">{errors.priority.message}</span>}
        </div>

        <CheckBox
          label={t("is_done")}
          setValue={setValue}
          name="isDone"
          value={isDone ? isDone : data?.isDone}
          onChange={(i) => setIsDone(i)}
        />

        <input
          className="border p-2 rounded shadow bg-gold-200 text-white hover:text-gold-100 hover:bg-white cursor-pointer dark:bg-darkbtn"
          type="submit"
          value={t("save")}
        />
      </form>
    </Modal>
  );
};

export default TodoForm;
