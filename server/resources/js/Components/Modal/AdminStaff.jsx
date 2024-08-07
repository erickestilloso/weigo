import SecondaryButton from "../SecondaryButton";
import PrimaryButton from "../PrimaryButton";
import TextInput from "../TextInput";
import InputLabel from "../InputLabel";
import RadioGroup from "../Radio";
import InputError from "../InputError";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function AdminStaff({ auth, data, roles, onClickModal }) {
    const {
        data: dataAdmin,
        setData,
        post,
        errors,
    } = useForm({
        name: "",
        email: "",
        password: "",
        phone_number: "",
        birthday: "",
        role: "",
        uid: data.uid,
    });

    useEffect(() => {
        if (auth.user.role === "administrator") {
            setData({
                name: dataAdmin.name,
                email: data.email,
                password: data.password,
                phone_number: data.phone_number,
                birthday: data.birthday,
                role: dataAdmin.role,
                uid: data.uid,
            });
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("update-admin"));
        if (!errors) {
            onClickModal(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6">
            <h2 className="font-bold mb-2">Edit Accounts</h2>

            <div className="grid gap-3">
                <div className="">
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        type="text"
                        placeholder={data.name}
                        className="mt-1 block w-full"
                        name="name"
                        onChange={(e) => {
                            setData("name", e.target.value);
                        }}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
                {auth.user.role === "superadministrator" && (
                    <>
                        <div className="">
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                placeholder={data.email}
                                className="mt-1 block w-full"
                                name="email"
                                onChange={(e) => {
                                    setData("email", e.target.value);
                                }}
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
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
                                onChange={(e) => {
                                    setData("password", e.target.value);
                                }}
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
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
                                placeholder={data.phone_number}
                                className="mt-1 block w-full"
                                name="phone_number"
                                onChange={(e) => {
                                    setData("phone_number", e.target.value);
                                }}
                            />
                            <InputError
                                message={errors.phone_number}
                                className="mt-2"
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
                                onChange={(e) => {
                                    setData("birthday", e.target.value);
                                }}
                            />
                            <InputError
                                message={errors.birthday}
                                className="mt-2"
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
                            setData("role", e.target.value);
                        }}
                    ></RadioGroup>
                    <InputError message={errors.role} className="mt-2" />
                </div>

                <div className="mt-2 flex justify-between">
                    <SecondaryButton
                        onClick={() => {
                            onClickModal(false);
                        }}
                    >
                        Cancel
                    </SecondaryButton>

                    <PrimaryButton className="ms-3 bg-green-400" type="submit">
                        Save
                    </PrimaryButton>
                </div>
            </div>
        </form>
    );
}
