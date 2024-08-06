import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import URL from "../Utils/url";
import Context from "../Context/Context";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: window.innerWidth < 600 ? "90vw" : "25vw",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function EditProfile({ modalIsOpen, setIsOpen, data }) {
  const context = useContext(Context);
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    profile: "",
  });

  useEffect(() => {
    setState({
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      website: data?.website,
      profile: data?.profile,
    });
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="flex text-xl items-center justify-between w-full border-b pb-2">
          <h1 className="font-semibold">Edit Profile</h1>
          <AiOutlineClose className="cursor-pointer" onClick={closeModal} />
        </div>
        <div className="my-6">
          <div className="mb-3 flex items-center">
            <img
              src={state?.profile}
              alt={state?.name + " Profile"}
              className="rounded-full w-[12vw] md:w-[4vw] mr-3 border border-gray-500"
            />
            <input
              type="file"
              onChange={(e) => {
                const formData = new FormData();
                formData.append("file", e.target.files[0]);
                formData.append("upload_preset", "upload_photo");
                formData.append("cloud_name", "dpbsogbtr");

                fetch(
                  "https://api.Cloudinary.com/v1_1/dpbsogbtr/image/upload",
                  {
                    method: "POST",
                    body: formData,
                  }
                )
                  .then((res) => res.json())
                  .then((res) => {
                    setState({ ...state, profile: res.url });
                  })
                  .catch((err) => {});
              }}
            />
          </div>
          <div className="w-full flex items-center mb-3">
            <p className="w-3/12 md:w-2/12">Name:</p>
            <input
              type="text"
              className="border w-9/12 md:w-10/12 rounded-md outline-none px-3 py-1"
              placeholder="Enter your name"
              value={state?.name}
              onChange={(e) => {
                setState({ ...state, name: e.target.value });
              }}
            />
          </div>
          <div className="w-full flex items-center mb-3">
            <p className="w-3/12 md:w-2/12">Email:</p>
            <input
              type="text"
              className="border w-9/12 md:w-10/12 rounded-md outline-none px-3 py-1"
              placeholder="Enter your email"
              value={state?.email}
              onChange={(e) => {
                setState({ ...state, email: e.target.value });
              }}
            />
          </div>
          <div className="w-full flex items-center mb-3">
            <p className="w-3/12 md:w-2/12">Phone:</p>
            <input
              type="text"
              className="border w-9/12 md:w-10/12 rounded-md outline-none px-3 py-1"
              placeholder="Enter your phone"
              value={state?.phone}
              onChange={(e) => {
                setState({ ...state, phone: e.target.value });
              }}
            />
          </div>
          <div className="w-full flex items-center">
            <p className="w-3/12 md:w-2/12">Website:</p>
            <input
              type="text"
              className="border w-9/12 md:w-10/12 rounded-md outline-none px-3 py-1"
              placeholder="Enter your website"
              value={state?.website}
              onChange={(e) => {
                setState({ ...state, website: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="border-t flex justify-end pt-3 items-center">
          <button
            onClick={closeModal}
            className="px-3 rounded-md text-gray-600 hover:text-blue-500 hover:border-blue-500 transition-all mr-2 border py-1"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              fetch(`${URL}/users/${data?._id}`, {
                method: "PATCH",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(state),
              })
                .then((res) => {
                  if (!res.ok) {
                    throw new Error("Network response was not ok");
                  }
                  return res.json();
                })
                .then((res) => {
                  if (res._id) {
                    context?.setData(
                      context?.data?.map((el) => {
                        if (el?._id == data?._id) {
                          return { ...res };
                        }
                        return el;
                      })
                    );
                    toast.success("Updated Profile");
                    closeModal();
                  }
                })
                .catch((error) => {
                  console.error(
                    "There was a problem with the fetch operation:",
                    error
                  );
                });
            }}
            className="px-3 rounded-md hover:text-gray-100 bg-blue-500 transition-all py-1 text-white"
          >
            OK
          </button>
        </div>
      </Modal>
    </div>
  );
}
export default EditProfile;
