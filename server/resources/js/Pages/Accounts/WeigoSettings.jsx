import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useWeigoSettings } from "@/hooks/data/useWeigoSettings";
import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

export default function WeigoSettings({ auth }) {
    const { d_p_weigo_settings } = useWeigoSettings();
    const [weigoSettings, setWeigoSettings] = useState(d_p_weigo_settings);

    const validationSchema = Yup.object({
        txnid: Yup.string().required("TXNID is required"),
        merchant_id: Yup.string().required("MERCHANT ID is required"),
    });

    const { handleSubmit, handleChange, values, touched, errors, resetForm } =
        useFormik({
            initialValues: {
                txnid: "",
                merchant_id: "",
                uid: d_p_weigo_settings[0].uid,
            },
            validationSchema,
            onSubmit: () => {
                router.post("/update-weigo-dp-settings", values);
                toast("Successful Changed!", {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                    theme: "dark",
                })();
                resetForm();
                Inertia.reload({ only: ["d_p_weigo_settings"] });
            },
        });

    useEffect(() => {
        setWeigoSettings(d_p_weigo_settings[0]);
    }, [d_p_weigo_settings]);

    return (
        <section>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Weigo Dragonpay Setting
                    </h2>
                }
            >
                <Head title="Payment" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <form onSubmit={handleSubmit}>
                                <div className="p-6 grid grid-cols-3 gap-4 w-full">
                                    <div className="">
                                        <InputLabel
                                            htmlFor="txnid"
                                            value="TXNID"
                                        />
                                        <TextInput
                                            id="txnid"
                                            type="text"
                                            placeholder={weigoSettings.txnid}
                                            className="mt-1 block w-full"
                                            name="txnid"
                                            onChange={handleChange}
                                        />
                                        {touched.txnid && errors.txnid && (
                                            <InputError
                                                message={errors.txnid}
                                                className="mt-2"
                                            />
                                        )}
                                    </div>
                                    <div className="">
                                        <InputLabel
                                            htmlFor="merchant_id"
                                            value="MERCHANT ID"
                                        />
                                        <TextInput
                                            id="merchant_id"
                                            type="text"
                                            placeholder={
                                                weigoSettings.merchant_id
                                            }
                                            className="mt-1 block w-full"
                                            name="merchant_id"
                                            onChange={handleChange}
                                        />
                                        {touched.merchant_id &&
                                            errors.merchant_id && (
                                                <InputError
                                                    message={errors.merchant_id}
                                                    className="mt-2"
                                                />
                                            )}
                                    </div>
                                </div>
                                <div className="pl-6 pb-6">
                                    <PrimaryButton type="submit">
                                        Submit
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer stacked />
            </AuthenticatedLayout>
        </section>
    );
}
