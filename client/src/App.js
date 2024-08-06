import React, { useContext, useEffect } from "react";
import URL from "./Utils/url";
import Navbar from "./Components/Navbar";
import { useState } from "react";
import {
  MdDelete,
  MdOutlineEmail,
  MdOutlinePhoneEnabled,
} from "react-icons/md";
import { CiEdit, CiGlobe } from "react-icons/ci";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import toast, { Toaster } from "react-hot-toast";
import EditProfile from "./Components/EditProfile";
import Context from "./Context/Context";

const App = () => {
  const { data, search } = useContext(Context);

  return (
    <div className="overflow-y-auto">
      <Navbar />
      <Toaster />
      <div className="mt-[10vh] md:mt-[6.5vh] grid md:grid-cols-4 gap-5 px-4 md:px-8">
        {data
          ?.filter((e) => {
            if (search) {
              return e?.name?.toLowerCase()?.includes(search?.toLowerCase());
            }
            return e;
          })
          .map((e, i) => {
            return <Block key={i} e={e} />;
          })}
      </div>
    </div>
  );
};

const Block = ({ e }) => {
  const [liked, setLiked] = useState(false);
  const context = useContext(Context);
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <div className="border flex flex-col items-center">
      <EditProfile modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} data={e} />
      <div className="h-[20vh] bg-gray-100/70 w-full flex items-center justify-center">
        <img
          src={e?.profile}
          alt={e?.name + " it's profile"}
          className="object-cover h-full"
        />
      </div>
      <div className="w-full px-4 py-5">
        <h1 className="text-lg font-semibold">{e?.name}</h1>
        <p className="flex items-center text-gray-600">
          <MdOutlineEmail className="mr-2" />
          {e?.email}
        </p>
        <p className="flex items-center text-gray-600">
          <MdOutlinePhoneEnabled className="mr-2" />
          {e?.phone}
        </p>
        <p className="flex items-center text-gray-600">
          <CiGlobe className="mr-2" />
          {e?.website}
        </p>
        <p className="flex items-center text-gray-600">
          <VscHeart className="mr-2" />
          {liked ? e?.likes + 1 : e?.likes} Likes
        </p>
      </div>
      <div className="w-full flex items-center text-gray-600 grid grid-cols-3 text-xl py-3 border-t bg-gray-100/70">
        <div className="w-full flex items-center justify-center">
          {!liked ? (
            <VscHeart
              className="cursor-pointer hover:text-newRed transition-all"
              onClick={() => {
                setLiked(!liked);
                fetch(`${URL}/users/${e?._id}/like`, { method: "PATCH" })
                  .then((res) => {
                    if (!res.ok) {
                      throw new Error("Network response was not ok");
                    }
                    return res.json();
                  })
                  .then((res) => {
                    if (res._id) {
                      toast.success("Liked");
                    }
                  })
                  .catch((error) => {
                    console.error(
                      "There was a problem with the fetch operation:",
                      error
                    );
                  });
              }}
            />
          ) : (
            <VscHeartFilled
              className="cursor-pointer text-newRed"
              onClick={() => {
                setLiked(!liked);
                fetch(`${URL}/users/${e?._id}/dislike`, { method: "PATCH" })
                  .then((res) => {
                    if (!res.ok) {
                      throw new Error("Network response was not ok");
                    }
                    return res.json();
                  })
                  .then((res) => {
                    if (res._id) {
                      toast.success("Disliked");
                    }
                  })
                  .catch((error) => {
                    console.error(
                      "There was a problem with the fetch operation:",
                      error
                    );
                  });
              }}
            />
          )}
        </div>
        <div className="w-full flex items-center justify-center border-l border-r">
          <CiEdit
            onClick={(e) => {
              setIsOpen(!modalIsOpen);
            }}
            className="cursor-pointer hover:text-blue-500"
          />
        </div>
        <div className="flex items-center justify-center w-full">
          <MdDelete
            onClick={() => {
              fetch(`${URL}/users/${e?._id}`, {
                method: "DELETE",
              })
                .then((res) => {
                  if (!res.ok) {
                    throw new Error("Network response was not ok");
                  }
                  return res.json();
                })
                .then((res) => {
                  toast.success("User deleted");
                  context?.setData(
                    context?.data?.filter((el) => e?._id !== el?._id)
                  );
                })
                .catch((error) => {
                  console.error(
                    "There was a problem with the fetch operation:",
                    error
                  );
                });
            }}
            className="cursor-pointer hover:text-blue-500 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
