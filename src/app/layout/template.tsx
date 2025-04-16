import { Outlet } from "react-router";

export const Template = () => {
  return (
    <div className="flex min-h-full flex-col">
      <div className="bg-background/60 sticky top-0 right-0 left-0 border-b-1 border-dashed px-10 backdrop-blur-xs">
        <div className="flex justify-between border-x-1 border-dashed px-8 py-4">
          <span className="text-foreground text-xl font-bold">HiNAS Camera</span>
        </div>
      </div>

      <div className="flex flex-1 px-10">
        <div className="flex-1 overflow-y-scroll border-x-1 border-dashed">
          <div className="h-full px-6 py-4">
            <div className="min-h-full rounded-2xl border-1 border-dashed">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
