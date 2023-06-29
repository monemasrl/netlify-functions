import axios from "axios";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import queryString from "query-string";
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
    Input
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

const handleSubmit = async (values: ContactFormType, formikHelpers: FormikHelpers<ContactFormType>) => {
    console.log('HANDLE SUBMIT');
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
    } catch (error) {
        console.log(error);
    } finally {
        formikHelpers.setSubmitting(false);
    }

}

export const ContactForm = () => {
    return (
        <Grid container>
        <Grid sm={3} xs={false}></Grid>
        <Grid sm={6} xs={12}>
          <Sheet>
            <Box m={5} p={3}>
                <Typography level="h5">Basic Formik Form Validation</Typography>
                <Formik
                    initialValues={ContactFormInitialValues}
                    validationSchema={Yup.object({
                        first_name: Yup.string()
                            .max(15, "Must be 15 characters or less")
                            .required("Required"),
                        last_name: Yup.string()
                            .max(20, "Must be 20 characters or less")
                            .required("Required"),
                        subject: Yup.string()
                            .max(50, "Must be 50 characters or less")
                            .required("Required"),
                        email: Yup.string()
                            .email("Invalid email address")
                            .required("Required"),
                        message: Yup.string()
                            .max(1000, "Must be 1000 characters or less")
                            .required("Required"),
                    })}
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
                        {errors.email && (<ErrorMessage name="first_name" />)}
                    </FormControl>
                    <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <Field as={Input} 
                            name="last_name"
                            margin="dense"
                            error={Boolean(errors.last_name) && Boolean(touched.last_name)}
                        />
                        {errors.email && (<ErrorMessage name="last_name" />)}
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
                        {errors.email && (<ErrorMessage name="phone" />)}
                    </FormControl>
                    <FormControl>
                        <FormLabel>Mobile</FormLabel>
                        <Field as={Input} 
                            name="mobile"
                            margin="dense"
                            error={Boolean(errors.mobile) && Boolean(touched.mobile)}
                        />
                        {errors.email && (<ErrorMessage name="mobile" />)}
                    </FormControl>
                    <FormControl>
                        <FormLabel>Subject</FormLabel>
                        <Field as={Input} 
                            name="subject"
                            margin="dense"
                            error={Boolean(errors.subject) && Boolean(touched.subject)}
                        />
                        {errors.email && (<ErrorMessage name="subject" />)}
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