import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Tabs from "@/Components/Tabs";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import ConfirmationModal from "@/Components/Modal/ConfirmationModal";
import InformationModal from "@/Components/Modal/InformationModal";
import { useDpCrediCards } from "@/hooks/data/useCreditCards";
import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useAccounts } from "@/hooks/data/useAccounts";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { useValidationSchemaCreditCard } from "@/hooks/validations/useValidationSchemaCreditCard";
import InputError from "@/Components/InputError";
import { Inertia } from "@inertiajs/inertia";
export default function CreditCard({ auth }) {
    const { current_user } = useAccounts();
    const { d_p_credit_cards } = useDpCrediCards();

    const [creditCardData, setCreditCardData] = useState(d_p_credit_cards);
    const [tabToggle, setTabToggle] = useState(true);
    const [confirmationUserDeletion, setConfirmingUserDeletion] =
        useState(false);

    const [infoData, setInfoData] = useState(false);
    const [isRoleAdmin, setIsRoleAdmin] = useState(false);

    const [deleteData, setDeleteData] = useState(undefined);
    const [dataToModal, setDataToModal] = useState(undefined);
    const [valuesData, setValuesData] = useState({
        amount: "",
        ccy: "",
        description: "",
        email: "",
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        telNo: "",
    });

    const { validationSchema } = useValidationSchemaCreditCard(valuesData);

    const { handleSubmit, handleChange, values, touched, errors } = useFormik({
        initialValues: {
            amount: "",
            ccy: "",
            description: "",
            email: "",
            firstName: "",
            lastName: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            country: "",
            zipCode: "",
            telNo: "",
        },
        validationSchema,
        onSubmit: () => {
            router.post("/credit-card", values);
            Inertia.reload({ only: ["d_p_credit_cards"] });
        },
    });

    useEffect(() => {
        setCreditCardData(d_p_credit_cards);
        setValuesData(values);

        if (
            current_user.role === "superadministrator" ||
            current_user.role === "administrator"
        ) {
            setIsRoleAdmin(true);
        } else {
            setIsRoleAdmin(false);
        }
    }, [d_p_credit_cards]);

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        setInfoData(false);
    };

    const showInfoData = () => {
        return (
            <InformationModal
                data={dataToModal}
                onClickModal={(value) => setInfoData(value)}
            ></InformationModal>
        );
    };

    const confirmationDelete = () => {
        return (
            <ConfirmationModal
                data={deleteData}
                onClickModal={(value) => {
                    setConfirmingUserDeletion(value);
                }}
                onClickDelete={(id) => {
                    router.delete(`/credit-card/${id}`);
                }}
            ></ConfirmationModal>
        );
    };

    return (
        <section>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Dragonpay Settings - Credit Card
                    </h2>
                }
            >
                <Head title="Credit Card" />

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
                                    >
                                        Credit Card Information
                                    </Tabs>

                                    <Tabs
                                        onClick={() => {
                                            setTabToggle(false);
                                        }}
                                        href="#input-data"
                                        active={!tabToggle}
                                    >
                                        Input Data
                                    </Tabs>
                                </div>
                            </div>

                            <div
                                className="mt-4 overflow-x-auto max-h-[60vh]"
                                hidden={!tabToggle}
                            >
                                <table className="min-w-full bg-white shadow-md rounded-xl text-[14px] relative">
                                    <thead className="relative">
                                        <tr className="border-b bg-slate-100 sticky top-0 w-full bg-blue-gray-100 text-gray-700">
                                            <th className="border-r py-3 px-4 min-w-[40px] max-w-[120px] text-left">
                                                Name
                                            </th>

                                            <th className="border-r py-3 px-4 min-w-[40px] max-w-[120px] text-left">
                                                Email
                                            </th>

                                            <th className="border-r py-3 px-4 min-w-[40px] max-w-[90px] text-left">
                                                Amount
                                            </th>

                                            <th className="border-r py-3 px-4 min-w-[40px] max-w-[90px] text-left">
                                                Telephone
                                            </th>

                                            <th className="border-r py-3 px-4 min-w-[40px] max-w-[90px] text-left">
                                                Currency
                                            </th>

                                            <th className="border-r py-3 px-4 min-w-[40px] max-w-[90px] text-left">
                                                Description
                                            </th>

                                            <th className="border-r py-3 px-4 min-w-[40px] max-w-[90px] text-left">
                                                Created At
                                            </th>

                                            <th className=" py-3 px-4 text-left w-12">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="h-[100px] text-blue-gray-900">
                                        {creditCardData

                                            .sort(
                                                (a, b) =>
                                                    new Date(b.created_at) -
                                                    new Date(a.created_at)
                                            )

                                            .map((creditCard, index) => (
                                                <tr
                                                    key={index}
                                                    className="max-w-xs break-words border-b border-blue-gray-200"
                                                >
                                                    <td className="border-r py-3 px-4 min-w-[40px] max-w-[90px] ">
                                                        {creditCard.firstName}{" "}
                                                        {creditCard.lastName}
                                                    </td>

                                                    <td className="border-r py-3 px-4 min-w-[40px] max-w-[90px]">
                                                        {creditCard.email}
                                                    </td>

                                                    <td className="border-r py-3 px-4 min-w-[40px] max-w-[90px]">
                                                        {creditCard.amount}
                                                    </td>

                                                    <td className="border-r py-3 px-4 min-w-[40px] max-w-[90px]">
                                                        {creditCard.telNo}
                                                    </td>

                                                    <td className="border-r py-3 px-4 min-w-[40px] max-w-[90px]">
                                                        {creditCard.ccy}
                                                    </td>

                                                    <td className="border-r py-3 px-4 min-w-[40px] max-w-[90px]">
                                                        {creditCard.description}
                                                    </td>

                                                    <td className="border-r py-3 px-4 min-w-[40px] max-w-[90px]">
                                                        {creditCard.created_at}
                                                    </td>

                                                    <td className="py-3 px-4 flex gap-2">
                                                        <PrimaryButton
                                                            className="bg-blue-400"
                                                            onClick={() => {
                                                                setInfoData(
                                                                    true
                                                                );

                                                                setDataToModal(
                                                                    creditCard
                                                                );
                                                            }}
                                                        >
                                                            Info
                                                        </PrimaryButton>

                                                        {isRoleAdmin && (
                                                            <DangerButton
                                                                className="ms-3"
                                                                onClick={() => {
                                                                    setConfirmingUserDeletion(
                                                                        true
                                                                    );

                                                                    setDeleteData(
                                                                        creditCard
                                                                    );
                                                                }}
                                                            >
                                                                Delete
                                                            </DangerButton>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>

                            <form onSubmit={handleSubmit} hidden={tabToggle}>
                                <div className="p-6 grid grid-cols-3 gap-4 w-full">
                                    <div className="">
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email"
                                        />

                                        <TextInput
                                            id="email"
                                            type="email"
                                            className="mt-1 block w-full"
                                            name="email"
                                            onChange={handleChange}
                                        />
                                        {touched.email && errors.email && (
                                            <InputError
                                                message={errors.email}
                                                className="mt-2"
                                            />
                                        )}
                                    </div>

                                    <div className="">
                                        <InputLabel
                                            htmlFor="amount"
                                            value="Amount"
                                        />

                                        <TextInput
                                            id="amount"
                                            type="text"
                                            className="mt-1 block w-full"
                                            name="amount"
                                            onChange={handleChange}
                                        />
                                        {touched.amount && errors.amount && (
                                            <InputError
                                                message={errors.amount}
                                                className="mt-2"
                                            />
                                        )}
                                    </div>

                                    <div className="">
                                        <InputLabel htmlFor="ccy" value="CCY" />

                                        <TextInput
                                            id="ccy"
                                            type="text"
                                            className="mt-1 block w-full"
                                            name="ccy"
                                            onChange={handleChange}
                                        />
                                        {touched.ccy && errors.ccy && (
                                            <InputError
                                                message={errors.ccy}
                                                className="mt-2"
                                            />
                                        )}
                                    </div>

                                    <div className="">
                                        <InputLabel
                                            htmlFor="description"
                                            value="Description"
                                        />

                                        <TextInput
                                            id="description"
                                            type="text"
                                            className="mt-1 block w-full"
                                            name="description"
                                            onChange={handleChange}
                                        />
                                        {touched.description &&
                                            errors.description && (
                                                <InputError
                                                    message={errors.description}
                                                    className="mt-2"
                                                />
                                            )}
                                    </div>

                                    <div className="">
                                        <InputLabel
                                            htmlFor="firstName"
                                            value="FIRSTNAME"
                                        />

                                        <TextInput
                                            id="firstName"
                                            type="text"
                                            className="mt-1 block w-full"
                                            name="firstName"
                                            onChange={handleChange}
                                        />
                                        {touched.firstName &&
                                            errors.firstName && (
                                                <InputError
                                                    message={errors.firstName}
                                                    className="mt-2"
                                                />
                                            )}
                                    </div>

                                    <div className="">
                                        <InputLabel
                                            htmlFor="lastName"
                                            value="LASTNAME"
                                        />

                                        <TextInput
                                            id="lastName"
                                            type="text"
                                            className="mt-1 block w-full"
                                            name="lastName"
                                            onChange={handleChange}
                                        />
                                        {touched.lastName &&
                                            errors.lastName && (
                                                <InputError
                                                    message={errors.lastName}
                                                    className="mt-2"
                                                />
                                            )}
                                    </div>

                                    <div className="">
                                        <InputLabel
                                            htmlFor="address1"
                                            value="ADDRESS1"
                                        />

                                        <TextInput
                                            id="address1"
                                            type="text"
                                            className="mt-1 block w-full"
                                            name="address1"
                                            onChange={handleChange}
                                        />

                                        {touched.address1 &&
                                            errors.address1 && (
                                                <InputError
                                                    message={errors.address1}
                                                    className="mt-2"
                                                />
                                            )}
                                    </div>

                                    <div className="">
                                        <InputLabel
                                            htmlFor="address2"
                                            value="ADDRESS2"
                                        />

                                        <TextInput
                                            id="address2"
                                            type="text"
                                            className="mt-1 block w-full"
                                            name="address2"
                                            onChange={handleChange}
                                        />

                                        {touched.address2 &&
                                            errors.address2 && (
                                                <InputError
                                                    message={errors.address2}
                                                    className="mt-2"
                                                />
                                            )}
                                    </div>

                                    <div className="">
                                        <InputLabel
                                            htmlFor="city"
                                            value="CITY"
                                        />

                                        <TextInput
                                            id="city"
                                            type="text"
                                            className="mt-1 block w-full"
                                            name="city"
                                            onChange={handleChange}
                                        />

                                        {touched.city && errors.city && (
                                            <InputError
                                                message={errors.city}
                                                className="mt-2"
                                            />
                                        )}
                                    </div>

                                    <div className="">
                                        <InputLabel
                                            htmlFor="state"
                                            value="STATE"
                                        />

                                        <TextInput
                                            id="state"
                                            type="text"
                                            className="mt-1 block w-full"
                                            name="state"
                                            onChange={handleChange}
                                        />

                                        {touched.state && errors.state && (
                                            <InputError
                                                message={errors.state}
                                                className="mt-2"
                                            />
                                        )}
                                    </div>

                                    <div className="">
                                        <InputLabel
                                            htmlFor="country"
                                            value="COUNTRY"
                                        />

                                        <TextInput
                                            id="country"
                                            type="text"
                                            className="mt-1 block w-full"
                                            name="country"
                                            onChange={handleChange}
                                        />

                                        {touched.country && errors.country && (
                                            <InputError
                                                message={errors.country}
                                                className="mt-2"
                                            />
                                        )}
                                    </div>

                                    <div className="">
                                        <InputLabel
                                            htmlFor="zipCode"
                                            value="ZIP CODE"
                                        />

                                        <TextInput
                                            id="zipCode"
                                            type="text"
                                            className="mt-1 block w-full"
                                            name="zipCode"
                                            onChange={handleChange}
                                        />

                                        {touched.zipCode && errors.zipCode && (
                                            <InputError
                                                message={errors.zipCode}
                                                className="mt-2"
                                            />
                                        )}
                                    </div>

                                    <div className="">
                                        <InputLabel
                                            htmlFor="telNo"
                                            value="TEL NO"
                                        />

                                        <TextInput
                                            id="telNo"
                                            type="text"
                                            className="mt-1 block w-full"
                                            name="telNo"
                                            onChange={handleChange}
                                        />
                                        {touched.telNo && errors.telNo && (
                                            <InputError
                                                message={errors.telNo}
                                                className="mt-2"
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="pl-6 pb-6 ">
                                    <PrimaryButton type="submit">
                                        Submit
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>

            <Modal
                show={infoData}
                onClose={closeModal}
                closeable={true}
                maxWidth="2xl"
                children={showInfoData()}
            ></Modal>

            <Modal
                show={confirmationUserDeletion}
                onClose={closeModal}
                closeable={true}
                maxWidth="sm"
                children={confirmationDelete()}
            ></Modal>
        </section>
    );
}
