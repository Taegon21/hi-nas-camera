import { Route, Routes } from "react-router";
import { Template } from "./layout/template";
import { SettingPage } from "@/pages";

export const Router = () => {
  return (
    <Routes>
      <Route element={<Template />}>
        <Route path="*" element={<SettingPage />} />
      </Route>
    </Routes>
  );
};
