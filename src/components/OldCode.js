import React from "react";
import {
  Card,
  CardHeader,
  Stack,
  Button,
  CardContent,
  TextField,
  Alert,
  AlertTitle,
  Collapse,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
const initialValues = {
  name: "",
  email: "",
  channel: "",
};

const onSubmit = (values) => {
  console.log(values);
};

const validate = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
      values.email
    )
  ) {
    errors.email = "Invalid email address";
  }
  if (!values.channel) {
    errors.channel = "Channel is required";
  }
  return errors;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  channel: Yup.string().required("Channel is required"),
});

const Youtube = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    // validate,
  });
  console.log(formik.touched);
  return (
    <Card sx={{ maxWidth: 550, mx: "auto", mt: 1 }}>
      <CardHeader
        title="Formik with MUI"
        titleTypographyProps={{ variant: "h4", align: "center" }}
        subheader="Youtube Form"
        subheaderTypographyProps={{ variant: "h6", align: "center" }}
      />
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={1}>
            <TextField
              name="name"
              type="text"
              variant="standard"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name && (
              <Alert severity="error">{formik.errors.name}</Alert>
            )}
            <TextField
              name="email"
              type="email"
              variant="standard"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <Alert severity="error">{formik.errors.email}</Alert>
            )}
            <TextField
              name="channel"
              type="text"
              variant="standard"
              label="Channel"
              value={formik.values.channel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.channel && formik.touched.channel && (
              <Alert severity="error">{formik.errors.channel}</Alert>
            )}
          </Stack>
          <Stack spacing={1} sx={{ mt: 3 }}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

export default Youtube;
