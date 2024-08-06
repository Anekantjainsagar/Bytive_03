import React, { useContext } from "react";
import Context from "../Context/Context";

const Navbar = () => {
  const context = useContext(Context);
  return (
    <div className="fixed top-0 left-0 w-full px-5 py-1.5 h-[6vh] flex items-center justify-between">
      <h1 className="text-3xl font-bold">Bytive Assignment</h1>
      <div>
        <input
          type="text"
          placeholder="Search here..."
          value={context?.search}
          onChange={(e) => {
            context?.setSearch(e.target.value);
          }}
          className="border outline-none px-4 py-1 rounded-md border-gray-400"
        />
      </div>
    </div>
  );
};

export default Navbar;
