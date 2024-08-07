import * as Yup from "yup";
import "yup-phone-lite";
import { useEffect, useState } from "react";

export const useValidationSchemaGuestAccount = (values) => {
    const { first_name, last_name, email, password, phone_number, birthday } =
        values;

    const [emailData, setEmailData] = useState("undefined");
    const [nameData, setNameData] = useState("undefined");
    const [passwordData, setPasswordData] = useState("undefined");
    const [phoneNumberData, setPhoneNumberData] = useState("undefined");
    const [dateData, setDateData] = useState("undefined");

    const validateName = () => {
        let response;
        if (!first_name || !last_name) {
            response = "Name is Required";
        } else if (!/^[a-zA-Z]*$/i.test(first_name)) {
            response = "Invalid Name. Please use alphabetical characters only";
        } else if (!/^[a-zA-Z]*$/i.test(last_name)) {
            response = "Invalid Name. Please use alphabetical characters only";
        } else {
            response = "Good!";
        }
        setNameData(response);
        return response;
    };
    const validatePassword = () => {
        let response;
        if (!password) {
            response = "Password is Required";
        } else {
            response = "Good!";
        }
        setPasswordData(response);
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

    // To refactor
    // const validatePhoneCountryCode = () => {
    //     let valueToCheck = values.countryCode;
    //     let codeExists = false;
    //     for (let i = 0; i < countryCode.length; i++) {
    //         if (countryCode[i].countryCode === valueToCheck) {
    //             countryExists = true;
    //             break;
    //         }
    //     }

    //     if (codeExists) {
    //         response = valueToCheck;
    //     }

    //     return "INVALID";
    // };

    const validatePhoneNumber = () => {
        let response;

        if (!phone_number) {
            response = "Phone Number is required";
        } else if (!/^[0-9 ]/i.test(phone_number)) {
            response = "Please enter numbers";
        } else {
            response = "Good!";
        }
        setPhoneNumberData(response);
        return response;
    };

    // To refactor
    const validateDate = () => {
        let response;
        if (!birthday) {
            response = "Date is required";
        } else {
            response = "Good!";
        }
        setDateData(response);
        return response;
    };

    useEffect(() => {
        validateName();
        validatePhoneNumber();
        validateEmail();
        validateDate();
        validatePassword();
    }, [
        email,
        birthday,
        first_name,
        last_name,
        password,
        phone_number,
        password,
    ]);

    const validationSchema = Yup.object({
        first_name: Yup.string().required(`${nameData}`),
        last_name: Yup.string().required(`${nameData}`),
        email: Yup.string().required(`${emailData}`),
        password: Yup.string().required(`${passwordData}`),
        phone_number: Yup.string().required(`${phoneNumberData}`),
        birthday: Yup.string().required(`${dateData}`),
    });

    return {
        validationSchema,
    };
};
