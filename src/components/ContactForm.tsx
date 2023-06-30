import React from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage, FormikHelpers, useField } from "formik";
import queryString from "query-string";
import { useSnackbar } from 'notistack';
import config from "./subjects.json";

import {
    Button,
    Grid,
    Box,
    Typography,
    Textarea,
    Sheet,
    Divider,
    FormControl,
    FormLabel,
    Input,
    Select,
    Option
} from "@mui/joy";
import * as Yup from "yup";

type ContactFormType = {
    "form-name": string;
    "bot-field": string;
    first_name: string;
    last_name: string;
    email: string;
    subject: string;
    phone?: string;
    mobile?: string;
    message: string;
};

const ContactFormInitialValues: ContactFormType = {
    "form-name": "contact",
    "bot-field": "",
    first_name: "",
    phone: "",
    mobile: "",
    last_name: "",
    email: "",
    subject: "",
    message: "",
};

const SubjectSelectOptions = (props: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // @ts-ignore
    const [field, meta, helpers] = useField(props.field.name);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // @ts-ignore
    const onChange = (e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null, value: {} | null) => {
        helpers.setValue(value);
    }

    return (
    <>
        <Select {...props}
            placeholder="Seleziona un argomento"
            onChange={onChange}
            value={field.value}
            onBlur={() => helpers.setTouched(true)}
        >
            {config.subjects.map((option: any) => (
                <Option key={option} value={option}>
                    {option}
                </Option>
            ))}
        </Select>
    </>
)}

export const ContactForm = () => {
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values: ContactFormType, formikHelpers: FormikHelpers<ContactFormType>) => {
        formikHelpers.setSubmitting(true);
        let formData = new FormData()
        formData.append('form-name', 'contact')
        formData.append('first_name', values.first_name)
        formData.append('last_name', values.last_name)
        formData.append('email', values.email)
        formData.append('subject', values.subject)
        formData.append('message', values.message)
        formData.append('bot-field', values['bot-field'])
        if (values.phone) formData.append('phone', values.phone)
        if (values.mobile) formData.append('mobile', values.mobile)
    
        const data = queryString.stringify(values)

        try {
            await axios.post<FormData>('/', data, {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            enqueueSnackbar('Richiesta inviata con successo', { 
                variant: 'success',
                autoHideDuration: 2000,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            });
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                enqueueSnackbar('Errore di comunicazione, riprova tra poco', { 
                    variant: 'error',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                });
            } else if (err instanceof Error) {
                enqueueSnackbar("E' avvenuto un errore", { 
                    variant: 'error',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                });
            } else {
                enqueueSnackbar("E' accaduto qualcosa di inatteso", { 
                    variant: 'error',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                });
            }
        } finally {
            formikHelpers.setSubmitting(false);
        }
    
    }

    return (
        <Grid container>
        <Grid sm={3} xs={false}></Grid>
        <Grid sm={6} xs={12}>
        <Sheet>
            <Box m={5} p={3}>
                <Typography level="h5">Basic Formik Form Validation</Typography>
                <Formik
                    initialValues={ContactFormInitialValues}
                    validationSchema={Yup.object().shape({
                        first_name: Yup.string()
                            .max(15, "Must be 15 characters or less")
                            .required("Required"),
                        last_name: Yup.string()
                            .max(20, "Must be 20 characters or less")
                            .required("Required"),
                        subject: Yup.string()
                            .max(50, "Must be 50 characters or less")
                            .required("Required"),
                        phone: Yup.string()
                            .when("mobile", {
                                is: (mobile: string) => !mobile || mobile.length === 0,
                                then: (s) => s.max(15, "Must be 15 characters or less").required("One of Phone or Mobile is required"),
                                otherwise: (s) => s.max(15, "Must be 15 characters or less"),
                            }),
                        mobile: Yup.string()
                            .when('phone', {
                                is: (phone: string) => !phone || phone.length === 0, // alternatively: (val) => val == true
                                then: (s) => s.max(15, "Must be 15 characters or less").required("One of Phone or Mobile is required"),
                                otherwise: (s) => s.max(15, "Must be 15 characters or less"),
                            }),
                        email: Yup.string()
                            .email("Invalid email address")
                            .required("Required"),
                        message: Yup.string()
                            .max(1000, "Must be 1000 characters or less")
                            .required("Required"),
                    }, [
                        ['phone', 'mobile']
                    ])}
                    onSubmit={handleSubmit}
                >
                    {({errors, touched, isValid, dirty}) =>(
                    <Form name="contact" data-netlify="true" data-netlify-honeypot="bot-field">
                        <Field type="hidden" name="form-name" />
                        <Field type="hidden" name="bot-field" />
                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Field as={Input} 
                            name="first_name"
                            margin="dense"
                            error={Boolean(errors.first_name) && Boolean(touched.first_name)}
                        />
                        {errors.first_name && (<ErrorMessage name="first_name" />)}
                    </FormControl>
                    <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <Field as={Input} 
                            name="last_name"
                            margin="dense"
                            error={Boolean(errors.last_name) && Boolean(touched.last_name)}
                        />
                        {errors.last_name && (<ErrorMessage name="last_name" />)}
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email Address</FormLabel>
                        <Field 
                            as={Input} 
                            name="email" 
                            variant="soft"
                            type="email"
                            label="Email Address"
                            margin="dense" 
                        />
                        {errors.email && (<ErrorMessage name="email" />)}
                    </FormControl>
                    <FormControl>
                        <FormLabel>Phone</FormLabel>
                        <Field as={Input} 
                            name="phone"
                            margin="dense"
                            error={Boolean(errors.phone) && Boolean(touched.phone)}
                        />
                        {errors.phone && (<ErrorMessage name="phone" />)}
                    </FormControl>
                    <FormControl>
                        <FormLabel>Mobile</FormLabel>
                        <Field as={Input} 
                            name="mobile"
                            margin="dense"
                            error={Boolean(errors.mobile) && Boolean(touched.mobile)}
                        />
                        {errors.mobile && (<ErrorMessage name="mobile" />)}
                    </FormControl>
                    <FormControl>
                        <FormLabel>Subject</FormLabel>
                        <Field 
                            component={SubjectSelectOptions} 
                            name="subject"
                        />
                        {errors.subject && (<ErrorMessage name="subject" />)}
                    </FormControl>
                    <FormControl>
                        <FormLabel>Message</FormLabel>
                        <Field 
                            name="message"
                            as={Textarea}
                            minRows={3}
                            variant="outlined"
                            margin="dense"
                        />
                        {errors.message && (<ErrorMessage name="message" />)}
                    </FormControl>
                    <Box height={16} />
                    <Divider />
                    <Box height={16} />
                    <Button
                        type="submit"
                        color="primary"
                        disabled={!isValid || !dirty}
                    >Submit Form</Button>
                    </Form>

                    )}
                </Formik>
            </Box>
        </Sheet>
        </Grid>
        <Grid  sm={3} xs={false}></Grid>
        </Grid>
    );
};