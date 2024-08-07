import SecondaryButton from "../SecondaryButton";
import PrimaryButton from "../PrimaryButton";
import TextInput from "../TextInput";
import InputLabel from "../InputLabel";
import RadioGroup from "../Radio";
import { useState } from "react";

export default function FormModal({
    auth,
    data,
    roles,
    processing,
    onClickModal,
    setDataChange,
    pageName,
    reset,
}) {
    return (
        <div>
            {pageName === "guest" && (
                <GuestAccount
                    auth={auth}
                    reset={reset}
                    data={data}
                    processing={processing}
                    onClickModal={(value) => onClickModal(value)}
                    setDataChange={(value) => setDataChange(value)}
                ></GuestAccount>
            )}
            {pageName === "admin" && (
                <AdminStaff
                    auth={auth}
                    reset={reset}
                    data={data}
                    roles={roles}
                    processing={processing}
                    onClickModal={(value) => onClickModal(value)}
                    setDataChange={(value) => setDataChange(value)}
                ></AdminStaff>
            )}
        </div>
    );
}

function GuestAccount({
    auth,
    data,
    reset,
    processing,
    onClickModal,
    setDataChange,
}) {
    const [dataCh, setDataChanges] = useState({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        phone_number: data.phone_number,
        birthday: data.birthday,
        uid: data.uid,
    });

    const handleChange = (e) => {
        setDataChanges({
            ...dataCh,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onClickModal(false);
        setDataChange(dataCh);
    };
    return (
        <form onSubmit={handleSubmit} className="p-6">
            <h2 className="font-bold mb-2">Edit Accounts</h2>

            <div className="grid gap-3">
                <div className="flex gap-3">
                    <div className="w-full">
                        <InputLabel htmlFor="first_name" value="First Name" />
                        <TextInput
                            id="first_name"
                            defaultValue={data.first_name}
                            type="text"
                            placeholder={data.first_name}
                            className="mt-1 block w-full"
                            name="first_name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full">
                        <InputLabel htmlFor="last_name" value="Last Name" />
                        <TextInput
                            id="last_name"
                            type="text"
                            defaultValue={data.last_name}
                            placeholder={data.last_name}
                            className="mt-1 block w-full"
                            name="last_name"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        defaultValue={data.email}
                        placeholder={data.email}
                        className="mt-1 block w-full"
                        name="email"
                        onChange={handleChange}
                    />
                </div>
                {(auth.user.role === "superadministrator" ||
                    auth.user.role === "administrator") && (
                    <>
                        <div className="">
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="text"
                                placeholder="********"
                                className="mt-1 block w-full"
                                name="password"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="">
                            <InputLabel
                                htmlFor="phone_number"
                                value="Phone Number"
                            />
                            <TextInput
                                id="phone_number"
                                defaultValue={data.phone_number}
                                type="number"
                                placeholder={data.phone_number}
                                className="mt-1 block w-full"
                                name="phone_number"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="">
                            <InputLabel htmlFor="birthday" value="Birthday" />
                            <TextInput
                                id="birthday"
                                defaultValue={data.birthday}
                                type="date"
                                className="mt-1 block w-full"
                                name="birthday"
                                onChange={handleChange}
                            />
                        </div>
                    </>
                )}
                <div className="mt-2 flex justify-between">
                    <SecondaryButton
                        onClick={() => {
                            reset();
                            onClickModal(false);
                        }}
                    >
                        Cancel
                    </SecondaryButton>

                    <PrimaryButton
                        className="ms-3 bg-green-400"
                        disabled={processing}
                    >
                        Save
                    </PrimaryButton>
                </div>
            </div>
        </form>
    );
}
function AdminStaff({
    auth,
    data,
    reset,
    roles,
    processing,
    onClickModal,
    setDataChange,
}) {
    const [dataCh, setDataChanges] = useState({
        name: data.name,
        email: data.email,
        password: data.password,
        phone_number: data.phone_number,
        birthday: data.birthday,
        role: data.role,
        uid: data.uid,
    });
    const handleChange = (e) => {
        setDataChanges({
            ...dataCh,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setDataChange(dataCh);
        onClickModal(false);
    };
    return (
        <form onSubmit={handleSubmit} className="p-6">
            <h2 className="font-bold mb-2">Edit Accounts</h2>

            <div className="grid gap-3">
                <div className="">
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        defaultValue={data.name}
                        type="text"
                        placeholder={data.name}
                        className="mt-1 block w-full"
                        name="name"
                        onChange={(e) => handleChange(e, "name")}
                    />
                </div>
                {auth.user.role === "superadministrator" && (
                    <>
                        <div className="">
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                defaultValue={data.email}
                                placeholder={data.email}
                                className="mt-1 block w-full"
                                name="email"
                                onChange={(e) => handleChange(e, "email")}
                            />
                        </div>
                        <div className="">
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="text"
                                placeholder="********"
                                className="mt-1 block w-full"
                                name="password"
                                onChange={(e) => handleChange(e, "password")}
                            />
                        </div>
                        <div className="">
                            <InputLabel
                                htmlFor="phone_number"
                                value="Phone Number"
                            />
                            <TextInput
                                id="phone_number"
                                type="number"
                                defaultValue={data.phone_number}
                                placeholder={data.phone_number}
                                className="mt-1 block w-full"
                                name="phone_number"
                                onChange={(e) =>
                                    handleChange(e, "phone_number")
                                }
                            />
                        </div>
                        <div className="">
                            <InputLabel htmlFor="birthday" value="Birthday" />
                            <TextInput
                                id="birthday"
                                type="date"
                                defaultValue={data.birthday}
                                className="mt-1 block w-full"
                                name="birthday"
                                onChange={(e) => handleChange(e, "birthday")}
                            />
                        </div>
                    </>
                )}
                <div className="">
                    <InputLabel htmlFor="role" value="Role" />
                    <RadioGroup
                        data={data.role}
                        options={roles}
                        className="mt-1 mb-1 p-3 gap-4 flex w-full flex-wrap lowercase text-gray-500 font-normal"
                        name="role"
                        onChanges={(e) => {
                            handleChange(e, "role");
                        }}
                    ></RadioGroup>
                </div>

                <div className="mt-2 flex justify-between">
                    <SecondaryButton
                        onClick={() => {
                            reset();
                            onClickModal(false);
                        }}
                    >
                        Cancel
                    </SecondaryButton>

                    <PrimaryButton
                        className="ms-3 bg-green-400"
                        type="submit"
                        disabled={processing}
                    >
                        Save
                    </PrimaryButton>
                </div>
            </div>
        </form>
    );
}
