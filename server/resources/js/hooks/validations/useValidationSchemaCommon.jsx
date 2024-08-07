import { currencyCode } from "@/lib/currencyCode";
import * as Yup from "yup";
import { useEffect, useState } from "react";

export const useValidationSchemaCommon = (values) => {
    const { email, amount, ccy } = values;

    const [emailData, setEmailData] = useState("undefined");
    const [amountData, setAmountData] = useState("undefined");
    const [ccyData, setCCYData] = useState("undefined");

    const validateEmail = () => {
        let response;
        if (!email) {
            response = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            response = "Invalid email address";
        } else {
            response = "Good!";
        }
        setEmailData(response);
        return response;
    };

    const validateAmount = () => {
        let response;
        if (!amount) {
            response = "Amount is required";
        } else if (!/^[0-9]/i.test(amount)) {
            response = "Please enter numbers";
        } else if (amount.length <= 2) {
            response = "Please input amount greater that  2 digit";
        } else {
            response = "Good!";
        }
        setAmountData(response);
        return response;
    };

    const validateCurrency = () => {
        let response;
        let valueToCheck = ccy;
        let countryExists = false;

        for (let i = 0; i < currencyCode.length; i++) {
            if (currencyCode[i].currency === valueToCheck) {
                countryExists = true;
                break;
            }
        }

        if (!ccy) {
            response = "Currency is required";
        } else if (!/^[A-Z]/i.test(ccy)) {
            response = "Please enter numbers";
        } else if (countryExists) {
            response = "Valid currency code";
        } else {
            response = "Good!";
        }
        setCCYData(response);
        return response;
    };
    useEffect(() => {
        validateAmount();
        validateCurrency();
        validateEmail();
    }, [amount, ccy, email]);

    const validationSchema = Yup.object({
        email: Yup.string().required(`${emailData}`),
        amount: Yup.string().required(`${amountData}`),
        ccy: Yup.string().required(`${ccyData}`),
        description: Yup.string(),
    });

    return {
        validationSchema,
    };
};
