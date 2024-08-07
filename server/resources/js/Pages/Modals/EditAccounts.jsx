import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function EditAccounts({
    children,
    show = false,
    maxWidth = "2xl",
    closeable = true,
    onClose = () => {},
}) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
    }[maxWidth];

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all"
                onClose={close}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-500/75" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel
                        className={`mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto ${maxWidthClass}`}
                    ></Dialog.Panel>
                    <Dialog.Panel
                        className={`mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto ${maxWidthClass}`}
                    >
                        <div>{children}</div>
                        <div>Edit Accounts</div>
                        <div>
                            <div className="">
                                <InputLabel htmlFor="name" value="NAME" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    name="name"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                            </div>
                            <div className="">
                                <InputLabel htmlFor="email" value="EMAIL" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    name="email"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                            </div>
                            <div className="">
                                <InputLabel
                                    htmlFor="password"
                                    value="PASSWORD"
                                />
                                <TextInput
                                    id="password"
                                    type="text"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    name="password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                            </div>
                            <div className="">
                                <InputLabel
                                    htmlFor="phone_number"
                                    value="PHONE NUMBER"
                                />
                                <TextInput
                                    id="phone_number"
                                    type="text"
                                    value={data.phone_number}
                                    className="mt-1 block w-full"
                                    name="phone_number"
                                    onChange={(e) =>
                                        setData("phone_number", e.target.value)
                                    }
                                />
                            </div>
                            <div className="">
                                <InputLabel
                                    htmlFor="birthday"
                                    value="BIRTHDAY"
                                />
                                <TextInput
                                    id="birthday"
                                    type="text"
                                    value={data.birthday}
                                    className="mt-1 block w-full"
                                    name="birthday"
                                    onChange={(e) =>
                                        setData("birthday", e.target.value)
                                    }
                                />
                            </div>
                            <div className="">
                                <InputLabel
                                    htmlFor="birthday"
                                    value="BIRTHDAY"
                                />
                                <TextInput
                                    id="birthday"
                                    type="select"
                                    options={[
                                        "January",
                                        "February",
                                        "March",
                                        "April",
                                        "May",
                                        "June",
                                        "July",
                                        "August",
                                        "September",
                                        "October",
                                        "November",
                                        "December",
                                    ]}
                                    value={data.role}
                                    className="mt-1 block w-full"
                                    name="role"
                                    onChange={(e) =>
                                        setData("role", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={() => {
                                    onSave();
                                    onClose();
                                }}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}
