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
    name: string;
    email: string;
    message: string;
};

const ContactFormInitialValues: ContactFormType = {
    "form-name": "contact",
    "bot-field": "",
    name: "",
    email: "",
    message: "",
};

const handleSubmit = async (values: ContactFormType, formikHelpers: FormikHelpers<ContactFormType>) => {
    console.log('HANDLE SUBMIT');
    formikHelpers.setSubmitting(true);
    let formData = new FormData()
    formData.append('form-name', 'contact')
    formData.append('name', values.name)
    formData.append('email', values.email)
    formData.append('message', values.message)
    formData.append('bot-field', values['bot-field'])

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
                        name: Yup.string()
                            .max(15, "Must be 15 characters or less")
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
                        <FormLabel>Name</FormLabel>
                        <Field as={Input} 
                            name="name"
                            margin="dense"
                            error={Boolean(errors.name) && Boolean(touched.name)}
                        />
                        {errors.email && (<ErrorMessage name="name" />)}
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