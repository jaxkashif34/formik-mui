import React, { useState } from "react";
import * as Yup from "yup";
import SimpleBar from "simplebar-react";
import {
  Form,
  Formik,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import {
  Card,
  CardHeader,
  Stack,
  Button,
  CardContent,
  TextField,
  Alert,
  Grid,
} from "@mui/material";
const initialValues = {
  name: "Some One",
  email: "",
  channel: "",
  comment: "",
  address: "SOS",
  social: {
    facebook: "",
    twiter: "",
  },
  PhoneNumbers: ["", ""],
  PhNumbers: [""],
};

const savedValues = {
  name: "Some One",
  email: "K@someone.com",
  channel: "Some Channel",
  comment: "Formik is Op",
  address: "SOS",
  social: {
    facebook: "fb.com",
    twiter: "tw.com",
  },
  PhoneNumbers: ["123", "456"],
  PhNumbers: [""],
};

const onSubmit = (values, onSubmitProps) => {
  // console.log("onSubmitProps", onSubmitProps);
  setTimeout(() => {
    console.log(values);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  }, 2000);
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  channel: Yup.string().required("Channel is required"),
  address: Yup.string().required("Address is required"),
});

const validateComment = (values) => {
  let error;
  if (!values) {
    return "Comment is required";
  }
  if (values.length < 5) {
    error = "Comment must be at least 5 characters long";
  }
  return error;
};

const AlertError = ({ children }) => <Alert severity="error">{children}</Alert>;

const Youtube = () => {
  const [formValues, setFormValues] = useState(null);
  return (
    <Card sx={{ mx: "auto" }}>
      <CardHeader
        title="Formik with MUI"
        titleTypographyProps={{ variant: "h4", align: "center" }}
        subheader="Youtube Form"
        subheaderTypographyProps={{ variant: "h6", align: "center" }}
      />
      <CardContent>
        <Formik
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          initialValues={formValues || initialValues}
          enableReinitialize
          // validateOnMount
          // validateOnChange={false}
          // validateOnBlur={false}
          // validateOnMount={true}
        >
          {(formik) => {
            // console.log(formik);
            return (
              <Form>
                <Grid
                  container
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <Field
                        name="name"
                        type="text"
                        as={TextField}
                        label="Name"
                        variant="standard"
                        required={
                          formik.touched.name && Boolean(formik.errors.name)
                        }
                        error={
                          formik.touched.name && Boolean(formik.errors.name)
                        }
                      />
                      <ErrorMessage name="name" component={AlertError} />
                      <Field
                        as={TextField}
                        name="email"
                        type="email"
                        variant="standard"
                        label="Email"
                      />
                      <ErrorMessage name="email" component={AlertError} />
                      <Field
                        as={TextField}
                        name="channel"
                        type="text"
                        variant="standard"
                        label="Channel"
                      />
                      <ErrorMessage name="channel" component={AlertError} />
                      <Field
                        name="comment"
                        type="text"
                        as="textarea"
                        placeholder="Comment"
                        validate={validateComment}
                      />
                      <ErrorMessage name="comment" component={AlertError} />
                      <FastField name="address">
                        {(props) => {
                          const { field } = props;
                          return (
                            <>
                              <TextField
                                label="Address"
                                variant="standard"
                                {...field}
                              />
                              <ErrorMessage
                                name={field.name}
                                component={AlertError}
                              />
                            </>
                          );
                        }}
                      </FastField>
                      <Field
                        name="social.facebook"
                        type="text"
                        as={TextField}
                        label="Facebook"
                      />
                      <Field
                        name="social.twiter"
                        type="text"
                        as={TextField}
                        label="twiter"
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <SimpleBar style={{ maxHeight: 400 }}>
                      <Stack spacing={2} sx={{ mt: 3 }}>
                        <Field
                          name="PhoneNumbers[0]"
                          as={TextField}
                          label="Phone1"
                          variant="standard"
                        />
                        <Field
                          name="PhoneNumbers[1]"
                          as={TextField}
                          label="Phone2"
                          variant="standard"
                        />
                        <FieldArray name="PhNumbers">
                          {(props) => {
                            const { push, remove, form } = props;
                            const { values } = form;
                            const { PhNumbers } = values;
                            return (
                              <>
                                {PhNumbers.map((PhNumber, index) => (
                                  <div key={index}>
                                    <Field
                                      variant="standard"
                                      as={TextField}
                                      label="PhNumbers"
                                      name={`PhNumbers[${index}]`}
                                    />
                                    {PhNumbers.length > 1 && (
                                      <Button
                                        variant="contained"
                                        sx={{ mt: 1 }}
                                        onClick={() => remove(index)}
                                      >
                                        -
                                      </Button>
                                    )}
                                  </div>
                                ))}
                                <Button
                                  size="small"
                                  variant="contained"
                                  onClick={() => push("")}
                                >
                                  Add Phone Number
                                </Button>
                              </>
                            );
                          }}
                        </FieldArray>
                      </Stack>
                    </SimpleBar>
                  </Grid>
                </Grid>
                <Stack
                  spacing={1}
                  sx={{ mt: 3 }}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  {/* <Button
                    size="small"
                    variant="contained"
                    onClick={() => formik.validateField("comment")}
                  >
                    Validate Cmnt
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => formik.setFieldTouched("comment")}
                  >
                    Visit Cmnt
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => formik.validateForm()}
                  >
                    Validate All
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() =>
                      formik.setTouched({
                        name: true,
                        email: true,
                        channel: true,
                        address: true,
                        comment: true,
                      })
                    }
                  >
                    Visit All
                  </Button> */}
                  <Button
                    variant="contained"
                    size="small"
                    disabled={formik.isSubmitting}
                    onClick={() => setFormValues(savedValues)}
                  >
                    Load data
                  </Button>
                  <Button
                    size="small"
                    type="submit"
                    variant="contained"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    Submit
                  </Button>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default Youtube;
