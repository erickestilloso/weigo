import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";
import InputError from "../InputError";
import TextInput from "../TextInput";
import InputLabel from "../InputLabel";
import RadioGroup from "../Radio";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function RegisterAccountAdmin({ roles, onClickModal }) {
    const { setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        birthday: "",
        phone_number: " ",
        role: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("register"));
        onClickModal(false);
    };
    return (
        <form onSubmit={handleSubmit} className="p-6">
            <div>
                <InputLabel htmlFor="name" value="Name" />

                <TextInput
                    id="name"
                    name="name"
                    className="mt-1 block w-full"
                    autoComplete="name"
                    isFocused={true}
                    onChange={(e) => {
                        setData("name", e.target.value);
                    }}
                    required
                />

                <InputError message={errors.name} className="mt-2" />
            </div>
            <div className="pt-3">
                <InputLabel htmlFor="role" value="Role" />
                <RadioGroup
                    options={roles}
                    className="mt-1 mb-1 p-3 gap-4 flex w-full flex-wrap lowercase text-gray-500 font-normal"
                    name="role"
                    onChanges={(e) => {
                        setData("role", e.target.value);
                    }}
                ></RadioGroup>
            </div>
            <div className="flex gap-4">
                <div className="mt-4 w-full">
                    <InputLabel htmlFor="phone_number" value="Phone Number" />

                    <TextInput
                        id="phone_number"
                        name="phone_number"
                        type="number"
                        className="mt-1 block w-full"
                        autoComplete="phone_number"
                        isFocused={true}
                        onChange={(e) => {
                            setData("phone_number", e.target.value);
                        }}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="mt-4 w-full">
                    <InputLabel htmlFor="birthday" value="Birthday" />

                    <TextInput
                        id="birthday"
                        type="date"
                        name="birthday"
                        className="mt-1 block w-full"
                        autoComplete="birthday"
                        onChange={(e) => {
                            setData("birthday", e.target.value);
                        }}
                        required
                    />

                    <InputError message={errors.birthday} className="mt-2" />
                </div>
            </div>
            <div className="mt-4">
                <InputLabel htmlFor="email" value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    className="mt-1 block w-full"
                    autoComplete="email"
                    onChange={(e) => {
                        setData("email", e.target.value);
                    }}
                    required
                />

                <InputError message={errors.email} className="mt-2" />
            </div>
            <div className="mt-4">
                <InputLabel htmlFor="password" value="Password" />

                <TextInput
                    id="password"
                    type="password"
                    name="password"
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) => {
                        setData("password", e.target.value);
                    }}
                    required
                />

                <InputError message={errors.password} className="mt-2" />
            </div>
            <div className="mt-4">
                <InputLabel
                    htmlFor="password_confirmation"
                    value="Confirm Password"
                />

                <TextInput
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) => {
                        setData("password_confirmation", e.target.value);
                    }}
                    required
                />

                <InputError
                    message={errors.password_confirmation}
                    className="mt-2"
                />
            </div>
            <div className="mt-4 flex justify-between">
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
                    Create
                </PrimaryButton>
            </div>
        </form>
    );
}
