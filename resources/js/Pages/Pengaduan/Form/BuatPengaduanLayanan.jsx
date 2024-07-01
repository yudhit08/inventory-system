// material-ui
import {
    Backdrop,
    Button,
    CardContent,
    Divider,
    Fade,
    FormHelperText,
    Grid,
    InputLabel,
    Modal,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import * as Yup from "yup";

// project-imports
import MainCard from "@/Components/MainCard";
import { Formik } from "formik";

// assets
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import axios from "axios";
import { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";

function BuatPengaduanLayanan() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <MainLayout>
            <Formik
                initialValues={{
                    tanggal_payroll_terbit: null,
                    nama: "",
                    jabatan: "",
                    alamat: "",
                    no_telp: "",
                    gaji_pokok: 0,
                    lembur: 0,
                    tunjangan: 0,
                    potongan: 0,
                    submit: null,
                }}
                validationSchema={Yup.object().shape({
                    tanggal_payroll_terbit: Yup.date()
                        .nullable()
                        .required("Tanggal Payroll Terbit is required"),
                    nama: Yup.string()
                        .min(1)
                        .max(255)
                        .required("Nama is required"),
                    jabatan: Yup.string()
                        .min(1)
                        .max(255)
                        .required("Jabatan is required"),
                    alamat: Yup.string()
                        .min(1)
                        .max(255)
                        .required("Alamat is required"),
                    no_telp: Yup.string()
                        .min(1)
                        .max(255)
                        .required("No Telepon is required"),
                    gaji_pokok: Yup.number()
                        .positive()
                        .required("Gaji Pokok is required"),
                    lembur: Yup.number()
                        .positive()
                        .required("Lembur is required"),
                    tunjangan: Yup.number()
                        .positive()
                        .required("Tunjangan is required"),
                    potongan: Yup.number()
                        .positive()
                        .required("Potongan is required"),
                })}
                onSubmit={async (
                    values,
                    { setErrors, setStatus, setSubmitting }
                ) => {
                    try {
                        const token =
                            localStorage.getItem("serviceToken") ||
                            sessionStorage.getItem("serviceToken");
                        const response = await axios.post(
                            `${process.env.REACT_APP_API_URL}/api/keuangan/payroll`,
                            values,
                            {
                                headers: {
                                    "x-access-token": token,
                                },
                            }
                        );
                        const data = response.data;
                        console.log(data);
                        handleOpen();
                    } catch (err) {
                        console.error(err);
                    }
                }}
            >
                {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values,
                    setFieldValue,
                }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <MainCard title="">
                                    <Grid
                                        container
                                        spacing={2}
                                        alignItems="center"
                                    >
                                        <Grid item xs={12} lg={6}>
                                            <Stack spacing={1}>
                                                <InputLabel>
                                                    Tanggal Payroll Terbit
                                                </InputLabel>
                                                <LocalizationProvider
                                                    dateAdapter={AdapterMoment}
                                                >
                                                    <DatePicker
                                                        placeholder="Enter tanggal payroll terbit"
                                                        value={
                                                            values.tanggal_payroll_terbit
                                                        }
                                                        onChange={(value) =>
                                                            setFieldValue(
                                                                "tanggal_payroll_terbit",
                                                                value
                                                            )
                                                        }
                                                        renderInput={(
                                                            params
                                                        ) => (
                                                            <TextField
                                                                {...params}
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                error={Boolean(
                                                                    touched.tanggal_payroll_terbit &&
                                                                        errors.tanggal_payroll_terbit
                                                                )}
                                                            />
                                                        )}
                                                    />
                                                </LocalizationProvider>
                                            </Stack>
                                            {touched.tanggal_payroll_terbit &&
                                                errors.tanggal_payroll_terbit && (
                                                    <FormHelperText
                                                        error
                                                        id="standard-weight-helper-text-email-login"
                                                    >
                                                        {
                                                            errors.tanggal_payroll_terbit
                                                        }
                                                    </FormHelperText>
                                                )}
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <Stack spacing={1}>
                                                <InputLabel>Nama</InputLabel>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Enter nama"
                                                    value={values.nama}
                                                    name="nama"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={Boolean(
                                                        touched.nama &&
                                                            errors.nama
                                                    )}
                                                />
                                            </Stack>
                                            {touched.nama && errors.nama && (
                                                <FormHelperText
                                                    error
                                                    id="standard-weight-helper-text-email-login"
                                                >
                                                    {errors.nama}
                                                </FormHelperText>
                                            )}
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <Stack spacing={1}>
                                                <InputLabel>Jabatan</InputLabel>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Enter jabatan"
                                                    value={values.jabatan}
                                                    name="jabatan"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={Boolean(
                                                        touched.jabatan &&
                                                            errors.jabatan
                                                    )}
                                                />
                                            </Stack>
                                            {touched.jabatan &&
                                                errors.jabatan && (
                                                    <FormHelperText
                                                        error
                                                        id="standard-weight-helper-text-email-login"
                                                    >
                                                        {errors.jabatan}
                                                    </FormHelperText>
                                                )}
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <Stack spacing={1}>
                                                <InputLabel>Alamat</InputLabel>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Enter alamat"
                                                    value={values.alamat}
                                                    name="alamat"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={Boolean(
                                                        touched.alamat &&
                                                            errors.alamat
                                                    )}
                                                />
                                            </Stack>
                                            {touched.alamat &&
                                                errors.alamat && (
                                                    <FormHelperText
                                                        error
                                                        id="standard-weight-helper-text-email-login"
                                                    >
                                                        {errors.alamat}
                                                    </FormHelperText>
                                                )}
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <Stack spacing={1}>
                                                <InputLabel>
                                                    No Telepon
                                                </InputLabel>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Enter no telepon"
                                                    value={values.no_telp}
                                                    name="no_telp"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={Boolean(
                                                        touched.no_telp &&
                                                            errors.no_telp
                                                    )}
                                                />
                                            </Stack>
                                            {touched.no_telp &&
                                                errors.no_telp && (
                                                    <FormHelperText
                                                        error
                                                        id="standard-weight-helper-text-email-login"
                                                    >
                                                        {errors.no_telp}
                                                    </FormHelperText>
                                                )}
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <Stack spacing={1}>
                                                <InputLabel>
                                                    Gaji Pokok
                                                </InputLabel>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Enter gaji pokok"
                                                    value={values.gaji_pokok}
                                                    name="gaji_pokok"
                                                    type="number"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={Boolean(
                                                        touched.gaji_pokok &&
                                                            errors.gaji_pokok
                                                    )}
                                                />
                                            </Stack>
                                            {touched.gaji_pokok &&
                                                errors.gaji_pokok && (
                                                    <FormHelperText
                                                        error
                                                        id="standard-weight-helper-text-email-login"
                                                    >
                                                        {errors.gaji_pokok}
                                                    </FormHelperText>
                                                )}
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <Stack spacing={1}>
                                                <InputLabel>Lembur</InputLabel>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Enter lembur"
                                                    value={values.lembur}
                                                    name="lembur"
                                                    type="number"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={Boolean(
                                                        touched.lembur &&
                                                            errors.lembur
                                                    )}
                                                />
                                            </Stack>
                                            {touched.lembur &&
                                                errors.lembur && (
                                                    <FormHelperText
                                                        error
                                                        id="standard-weight-helper-text-email-login"
                                                    >
                                                        {errors.lembur}
                                                    </FormHelperText>
                                                )}
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <Stack spacing={1}>
                                                <InputLabel>
                                                    Tunjangan
                                                </InputLabel>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Enter tunjangan"
                                                    value={values.tunjangan}
                                                    name="tunjangan"
                                                    type="number"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={Boolean(
                                                        touched.tunjangan &&
                                                            errors.tunjangan
                                                    )}
                                                />
                                            </Stack>
                                            {touched.tunjangan &&
                                                errors.tunjangan && (
                                                    <FormHelperText
                                                        error
                                                        id="standard-weight-helper-text-email-login"
                                                    >
                                                        {errors.tunjangan}
                                                    </FormHelperText>
                                                )}
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <Stack spacing={1}>
                                                <InputLabel>
                                                    Potongan
                                                </InputLabel>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Enter potongan"
                                                    value={values.potongan}
                                                    name="potongan"
                                                    type="number"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={Boolean(
                                                        touched.potongan &&
                                                            errors.potongan
                                                    )}
                                                />
                                            </Stack>
                                            {touched.potongan &&
                                                errors.potongan && (
                                                    <FormHelperText
                                                        error
                                                        id="standard-weight-helper-text-email-login"
                                                    >
                                                        {errors.potongan}
                                                    </FormHelperText>
                                                )}
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            lg={12}
                                            marginTop={4}
                                        >
                                            <Button
                                                variant="contained"
                                                disableElevation
                                                disabled={isSubmitting}
                                                type="submit"
                                                size="large"
                                            >
                                                Submit
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </MainCard>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <MainCard title="Berhasil" modal darkTitle content={false}>
                        <CardContent>
                            <Typography id="modal-modal-description">
                                Data payroll berhasil ditambahkan
                            </Typography>
                        </CardContent>
                        <Divider />
                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="flex-end"
                            sx={{ px: 2.5, py: 2 }}
                        >
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleClose}
                            >
                                Ok
                            </Button>
                        </Stack>
                    </MainCard>
                </Fade>
            </Modal>
        </MainLayout>
    );
}

export default BuatPengaduanLayanan;
