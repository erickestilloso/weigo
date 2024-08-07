import { currencyCode } from "@/lib/currencyCode";
import "yup-phone-lite";
import { useEffect, useState } from "react";
import * as Yup from "yup";
export const useValidationSchemaCreditCard = (values) => {
    const {
        address1,
        address2,
        amount,
        ccy,
        country,
        city,
        state,
        firstName,
        lastName,
        email,
        zipCode,
        telNo,
    } = values;

    const [nameData, setNameData] = useState("undefined");
    const [ccytData, setCCYData] = useState("undefined");
    const [countryData, setCountryData] = useState("undefined");
    const [cityData, setCityData] = useState("undefined");
    const [stateData, setStateData] = useState("undefined");
    const [emailData, setEmailData] = useState("undefined");
    const [zipCodeData, setZipCodeData] = useState("undefined");
    const [telNoData, setTelNoData] = useState("undefined");
    const [amountData, setAmountData] = useState("undefined");
    const [addressData, setAddressData] = useState("undefined");

    const validateName = () => {
        let response;
        if (!firstName || !lastName) {
            response = "Name is Required";
        } else if (!/^[a-zA-Z]*$/i.test(firstName)) {
            response = "Invalid Name. Please use alphabetical characters only";
        } else if (!/^[a-zA-Z]*$/i.test(lastName)) {
            response = "Invalid Name. Please use alphabetical characters only";
        } else {
            response = "Good!";
        }
        setNameData(response);
        return response;
    };

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

    const validateAddress = () => {
        let response;
        if (!address1 || !address2) {
            response = "Address is required";
        } else if (!/^[a-zA-Z0-9]*$/i.test(address1)) {
            response = "Please enter letters and numbers";
        } else if (!/^[a-zA-Z0-9]*$/i.test(address2)) {
            response = "Please enter letters and numbers";
        } else {
            response = "Good!";
        }
        setAddressData(response);
        return response;
    };

    const validateCity = () => {
        let response;
        if (!city) {
            response = "City is required";
        } else if (!/^[a-zA-Z]*$/i.test(city)) {
            response = "Please enter letters";
        } else {
            response = "Good!";
        }
        setCityData(response);
        return response;
    };

    const validateState = () => {
        let response;
        if (!state) {
            response = "State is required";
        } else if (!/^[a-zA-Z]*$/i.test(state)) {
            response = "Please enter letters";
        } else {
            response = "Good!";
        }

        setStateData(response);
        return response;
    };

    const validateCountry = () => {
        let response;
        if (!country) {
            response = "Country is required";
        } else if (!/^[a-zA-Z]*$/i.test(country)) {
            response = "Please enter letters";
        } else {
            response = "Good!";
        }
        setCountryData(response);
        return response;
    };

    const validateZipCode = () => {
        let response;
        if (!zipCode) {
            response = "ZipCode is required";
        } else if (!/^[0-9 ]/i.test(zipCode)) {
            response = "Please enter numbers";
        } else {
            response = "Good!";
        }
        setZipCodeData(response);
        return response;
    };

    const validateAmount = () => {
        let response;
        if (!amount) {
            response = "Amount is required";
        } else if (!/^[0-9]/i.test(amount)) {
            response = "Please enter numbers";
        } else if (amount.length <= 2) {
            response = "Please input amount greater that 2 digit";
        } else {
            response = "Good!";
        }
        setAmountData(response);
        return response;
    };

    const validateCurrency = () => {
        let response;
        let valueToCheck = values.ccy;
        let countryExists = false;

        for (let i = 0; i < currencyCode.length; i++) {
            if (currencyCode[i].currency === valueToCheck) {
                countryExists = true;
                break;
            }
        }

        if (!ccy) {
            response = "Currency Code is required";
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

    const validateTelephone = () => {
        let response;

        if (!telNo) {
            response = "Telephone is required";
        } else if (!/^[0-9 ]/i.test(telNo)) {
            response = "Please enter numbers";
        } else {
            response = "Good!";
        }
        setTelNoData(response);
        return response;
    };

    useEffect(() => {
        validateAddress();
        validateAmount();
        validateCity();
        validateCountry();
        validateCurrency();
        validateEmail();
        validateName();
        validateTelephone();
        validateState();
        validateZipCode();
    }, [
        address1,
        address2,
        amount,
        ccy,
        country,
        city,
        state,
        firstName,
        lastName,
        email,
        zipCode,
        telNo,
    ]);

    const validationSchema = Yup.object({
        amount: Yup.string().required(`${amountData}`),
        ccy: Yup.string().required(`${ccytData}`),
        description: Yup.string(),
        email: Yup.string().required(`${emailData}`),
        firstName: Yup.string().required(`${nameData}`),
        lastName: Yup.string().required(`${nameData}`),
        address1: Yup.string().required(`${addressData}`),
        address2: Yup.string().required(`${addressData}`),
        city: Yup.string().required(`${cityData}`),
        state: Yup.string().required(`${stateData}`),
        country: Yup.string().required(`${countryData}`),
        zipCode: Yup.string().required(`${zipCodeData}`),
        telNo: Yup.string().required(`${telNoData}`),
    });

    return {
        validationSchema,
    };
};
