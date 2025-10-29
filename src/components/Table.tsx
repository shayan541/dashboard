import React from "react";
import { useTranslation } from "react-i18next";

import type { IFormInput } from "./TodoForm";

const Table: React.FC<{ data: IFormInput[]; editHandler: (i: string) => void; deleteHandler: (i: string) => void }> = ({
  data,
  editHandler,
  deleteHandler,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="text-center ">{t("todo_list")}</h2>
      <div className="max-h-[450px] overflow-auto my-2">
        <table className="border border-gold-200 w-full">
          <thead>
            <tr className="border-b border-b-gold-200 capitalize">
              <th>{t("title")}</th>
              <th>{t("priority")}</th>
              <th>{t("status")}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b border-b-gold-200  last:border-0 hover:bg-slate-100">
                <td>{item.title}</td>
                <td>{t(item.priority)}</td>
                <td>{item.isDone ? "✅" : <span className="text-red-500">✖️</span>}</td>
                <td className="flex justify-end gap-2">
                  <span onClick={() => editHandler(item.id)} className="cursor-pointer">
                    ✏️
                  </span>
                  <span onClick={() => deleteHandler(item.id)} className="cursor-pointer">
                    ⛔
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
