import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useAccounts } from "@/hooks/data/useAccounts";
import { Head, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Tabs from "@/Components/Tabs";
import { useForm } from "laravel-precognition-react";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import FormModal from "@/Components/Modal/FormModal";
import PrimaryButton from "@/Components/PrimaryButton";
import ConfirmationModal from "@/Components/Modal/ConfirmationModal";
import { Inertia } from "@inertiajs/inertia";
import RegisterAccountAdmin from "@/Components/Modal/RegisterModal";

export default function Accounts({ auth }) {
    const [tabToggle, setTabToggle] = useState(true);
    const [isRoleAdmin, setIsRoleAdmin] = useState(false);
    const [isRoleGuest, setIsRoleGuest] = useState(false);

    const [confirmationUserDeletion, setConfirmingUserDeletion] =
        useState(false);
    const [editData, setEditData] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const [dataToModal, setDataToModal] = useState(undefined);
    const [deleteData, setDeleteData] = useState(undefined);
    const { guests, users, current_user, user } = useAccounts();
    const [guestsData, setGuestsData] = useState(guests);
    const [usersData, setUsersData] = useState(users);
    const {
        setData: setDataGuest,
        processing: processingGuest,
        submit: submitGuest,
        errors: errorsGuest,
        reset: resetGuest,
    } = useForm("post", "update-guest", {
        first_name: "erick",
        last_name: "estilloso",
        email: "email@gmail.com",
        password: "password",
        phone_number: "09123456789",
        birthday: "2024-11-11",
        id: 5,
    });
    const {
        setData: setDataAdmin,
        processing: processingAdmin,
        submit: submitAdmin,
        errors: errorsAdmin,
        reset: resetAdmin,
    } = useForm("post", "update-admin", {
        name: "erick",
        email: "email@gmail.com",
        password: "password",
        phone_number: "09123456789",
        birthday: "2024-11-11",
        role: "administrator",
        id: 5,
    });

    const roles = [
        { role: "superadministrator" },
        { role: "administrator" },
        { role: "maintenance" },
        { role: "sales" },
    ];

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        setEditData(false);
        setRegisterModal(false);
    };

    const setDataFromFormModal = (value) => {
        if (tabToggle) {
            Inertia.reload({ only: ["guests"] });
            setDataGuest({
                first_name: `${value.first_name}`,
                last_name: `${value.last_name}`,
                email: `${value.email}`,
                password: `${value.password}`,
                phone_number: `${value.phone_number}`,
                birthday: `${value.birthday}`,
                id: `${value.id}`,
            });
            submitGuest();
        } else {
            Inertia.reload({ only: ["users"] });
            setDataAdmin({
                name: `${value.name}`,
                email: `${value.email}`,
                password: `${value.password}`,
                phone_number: `${value.phone_number}`,
                birthday: `${value.birthday}`,
                role: `${value.role}`,
                id: `${value.id}`,
            });
            submitAdmin();
        }
    };

    const formsData = () => {
        return (
            <FormModal
                auth={auth}
                reset={resetAdmin || resetGuest}
                data={dataToModal}
                roles={roles}
                processing={processingGuest | processingAdmin}
                onClickModal={(value) => {
                    setEditData(value);
                }}
                setDataChange={(value) => {
                    setDataFromFormModal(value);
                }}
                pageName={tabToggle ? "guest" : "admin"}
            ></FormModal>
        );
    };

    const registerAccount = () => {
        return (
            <RegisterAccountAdmin
                roles={roles}
                onClickModal={(value) => {
                    setRegisterModal(value);
                }}
            ></RegisterAccountAdmin>
        );
    };

    const confirmationDelete = () => {
        return (
            <ConfirmationModal
                data={deleteData}
                onClickModal={(value) => {
                    setConfirmingUserDeletion(value);
                }}
                onClickDelete={(id) =>
                    tabToggle
                        ? router.delete(`/account/guest/${id}}`)
                        : router.delete(`/account/admin/${id}}`)
                }
            ></ConfirmationModal>
        );
    };
    useEffect(() => {
        setGuestsData(guests);
        setUsersData(users);

        if (current_user.role === "superadministrator") {
            setIsRoleGuest(true);
            setIsRoleAdmin(true);
        } else if (current_user.role === "administrator") {
            setIsRoleGuest(true);
            setIsRoleAdmin(false);
        } else {
            setIsRoleGuest(false);
        }
    }, [guests, users]);

    return (
        <section className="space-y-6">
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Accounts List
                    </h2>
                }
            >
                <Head title="Accounts" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-5">
                                <div className="hidden space-x-8 sm:-my-px sm:flex">
                                    <Tabs
                                        onClick={() => {
                                            setTabToggle(true);
                                        }}
                                        active={tabToggle}
                                        className="cursor-pointer"
                                    >
                                        Guest Accounts
                                    </Tabs>
                                    <Tabs
                                        onClick={() => {
                                            setTabToggle(false);
                                        }}
                                        active={!tabToggle}
                                        className="cursor-pointer"
                                    >
                                        Admin/Staff Accounts
                                    </Tabs>
                                    <div
                                        hidden={tabToggle}
                                        className="p-4 text-end"
                                    >
                                        <PrimaryButton
                                            className="bg-green-400"
                                            onClick={() => {
                                                setRegisterModal(true);
                                            }}
                                        >
                                            Create Account
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="mt-4 overflow-x-auto max-h-[60vh]"
                                hidden={!tabToggle}
                            >
                                <table className="min-w-full bg-white shadow-md rounded-xl text-[14px] relative">
                                    <thead className="relative">
                                        <tr className="border-b bg-slate-100 sticky top-0 w-full  bg-blue-gray-100 text-gray-700">
                                            <th className="border-r py-3 px-4 min-w-[40px] max-w-[90px] text-left">
                                                Name
                                            </th>
                                            <th className="border-r py-3 px-4 min-w-[40px] max-w-[90px] text-left">
                                                Email
                                            </th>

                                            {isRoleGuest && (
                                                <th className="border-r py-3 px-4 min-w-[40px] max-w-[90px] text-left">
                                                    Phone Number
                                                </th>
                                            )}
                                            {isRoleGuest && (
                                                <th className="border-r py-3 px-4 min-w-[40px] max-w-[90px] text-left">
                                                    Birthday
                                                </th>
                                            )}
                                            <th className="border-r py-3 px-4 min-w-[40px] max-w-[90px] text-left">
                                                Email Verified At
                                            </th>
                                            <th className="border-r py-3 px-4 min-w-[40px] max-w-[90px] text-left">
                                                Email Craeted At
                                            </th>
                                            <th className="border-r py-3 px-4 min-w-[40px] max-w-[90px] text-left">
                                                Email Updated At
                                            </th>

                                            <th className=" py-3 px-4 text-left w-12">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="h-[100px] text-blue-gray-900">
                                        {guestsData.map((guest, index) => (
                                            <tr
                                                key={index}
                                                className="max-w-xs break-words border-b border-blue-gray-200"
                                            >
                                                <td className="border-r py-3 px-4 min-w-[40px] max-w-[90px] ">
                                                    {guest.first_name}{" "}
                                                    {guest.last_name}
                                                </td>
                                                <td className="border-r py-3 px-4 min-w-[40px] max-w-[90px]  break-words">
                                                    {guest.email}
                                                </td>

                                                {isRoleGuest && (
                                                    <td className="border-r py-3 px-4 min-w-[40px] max-w-[90px]">
                                                        {guest.phone_number}
                                                    </td>
                                                )}
                                                {isRoleGuest && (
                                                    <td className="border-r py-3 px-4 min-w-[40px] max-w-[90px]">
                                                        {guest.birthday}
                                                    </td>
                                                )}
                                                <td className="border-r py-3 px-4 min-w-[40px] max-w-[90px]">
                                                    {guest.email_verified_at}
                                                </td>
                                                <td className="border-r py-3 px-4 min-w-[40px] max-w-[90px]">
                                                    {guest.created_at}
                                                </td>
                                                <td className="border-r py-3 px-4 min-w-[40px] max-w-[90px]">
                                                    {guest.updated_at}
                                                </td>

                                                <td className="py-3 px-4 flex gap-2 items-center">
                                                    <PrimaryButton
                                                        className="bg-blue-400"
                                                        onClick={() => {
                                                            setEditData(true);
                                                            setDataToModal(
                                                                guest
                                                            );
                                                        }}
                                                    >
                                                        Edit
                                                    </PrimaryButton>
                                                    <DangerButton
                                                        className="ms-3"
                                                        onClick={() => {
                                                            setConfirmingUserDeletion(
                                                                true
                                                            );
                                                            setDeleteData(
                                                                guest
                                                            );
                                                        }}
                                                    >
                                                        Delete
                                                    </DangerButton>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div
                                className="mt-4 overflow-x-auto max-h-[60vh]"
                                hidden={tabToggle}
                            >
                                <table className="min-w-full bg-white shadow-md rounded-xl text-[14px] relative">
                                    <thead className="relative">
                                        <tr className="border-b bg-slate-100 sticky top-0 w-full  bg-blue-gray-100 text-gray-700">
                                            <th className="border-r py-3 px-4 min-w-[40px] max-w-[90px] text-left">
                                                Name
                                            </th>
                                            <th className="border-r py-3 px-4 min-w-[40px] max-w-[90px] text-left">
                                                Email
                                            </th>

                                            {isRoleAdmin && (
                                                <th className="border-r py-3 px-4 min-w-[40px] max-w-[90px] text-left">
                                                    Role
                                                </th>
                                            )}
                                            {isRoleAdmin && (
                                                <th className="border-r py-3 px-4 min-w-[40px] max-w-[90px] text-left">
                                                    Phone Number
                                                </th>
                                            )}
                                            <th className="border-r py-3 px-4 min-w-[40px] max-w-[90px] text-left">
                                                Birthday
                                            </th>
                                            <th className="border-r py-3 px-4 min-w-[40px] max-w-[90px] text-left">
                                                Created At
                                            </th>
                                            <th className="border-r py-3 px-4 min-w-[40px] max-w-[90px] text-left">
                                                Updated At
                                            </th>

                                            <th className=" py-3 px-4 text-left w-12">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="h-[100px] text-blue-gray-900">
                                        {usersData.map((admin, index) => (
                                            <tr
                                                key={index}
                                                className="max-w-xs break-words border-b border-blue-gray-200"
                                            >
                                                <td className="border-r py-3 px-4 min-w-[40px] max-w-[90px] ">
                                                    {admin.name}
                                                </td>
                                                <td className="border-r py-3 px-4 min-w-[40px] max-w-[90px]  break-words">
                                                    {admin.email}
                                                </td>

                                                {isRoleAdmin && (
                                                    <td className="border-r py-3 px-4 min-w-[40px] max-w-[90px]">
                                                        {admin.role}
                                                    </td>
                                                )}
                                                {isRoleAdmin && (
                                                    <td className="border-r py-3 px-4 min-w-[40px] max-w-[90px]">
                                                        {admin.phone_number}
                                                    </td>
                                                )}
                                                <td className="border-r py-3 px-4 min-w-[40px] max-w-[90px]">
                                                    {admin.birthday}
                                                </td>
                                                <td className="border-r py-3 px-4 min-w-[40px] max-w-[90px]">
                                                    {admin.created_at}
                                                </td>
                                                <td className="border-r py-3 px-4 min-w-[40px] max-w-[90px]">
                                                    {admin.updated_at}
                                                </td>

                                                <td className="py-3 px-4 flex gap-2">
                                                    {admin.role !==
                                                        "superadministrator" ||
                                                    current_user.role ===
                                                        "superadministrator" ? (
                                                        <>
                                                            <PrimaryButton
                                                                className="bg-blue-400"
                                                                onClick={() => {
                                                                    setEditData(
                                                                        true
                                                                    );
                                                                    setDataToModal(
                                                                        admin
                                                                    );
                                                                }}
                                                            >
                                                                Edit
                                                            </PrimaryButton>

                                                            <DangerButton
                                                                className="ms-3"
                                                                onClick={() => {
                                                                    setConfirmingUserDeletion(
                                                                        true
                                                                    );
                                                                    setDeleteData(
                                                                        admin
                                                                    );
                                                                }}
                                                            >
                                                                Delete
                                                            </DangerButton>
                                                        </>
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
            <Modal
                show={editData}
                onClose={closeModal}
                closeable={false}
                maxWidth="2xl"
                children={formsData()}
            ></Modal>
            <Modal
                show={confirmationUserDeletion}
                onClose={closeModal}
                closeable={false}
                maxWidth="sm"
                children={confirmationDelete()}
            ></Modal>
            <Modal
                show={registerModal}
                onClose={closeModal}
                closeable={false}
                maxWidth="2xl"
                children={registerAccount()}
            ></Modal>
        </section>
    );
}
