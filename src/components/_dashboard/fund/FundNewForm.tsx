import * as Yup from 'yup';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  FormHelperText,
  FormControlLabel
} from '@material-ui/core';
// utils
import { fData } from '../../../utils/formatNumber';
import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { Fund } from '../../../@types/fund';
//
import Label from '../../Label';
import countries from './countries';

// ----------------------------------------------------------------------

type FundNewFormProps = {
  isEdit: boolean;
  currentFund?: Fund;
};

export default function FundNewForm({ isEdit, currentFund }: FundNewFormProps) {
  const navigate = useNavigate();

  const NewUserSchema = Yup.object().shape({
    fundName: Yup.string().required('Name is required'),
    fundManagerEmail: Yup.string().required('Email is required').email(),
    fundManagerPhone: Yup.string().required('Phone number is required'),
    fundManagerName: Yup.string().required('Address is required'),
    fundManagerBirthDay: Yup.date().required('country is required'),
    fundInceptionDate: Yup.date().required('Company is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fundName: currentFund?.fund_name || '',
      fundInceptionDate: currentFund?.fund_inception_date || '',
      fundManagerPhone: currentFund?.fund_manager?.fund_manager_phone || '',
      fundManagerName: currentFund?.fund_manager?.fund_manager_name || '',
      fundManagerEmail: currentFund?.fund_manager?.fund_manager_mail_address || '',
      fundManagerBirthDay: currentFund?.fund_manager?.fund_manager_birth_date || ''
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        // enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        navigate(PATH_DASHBOARD.fund.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const {
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps
  } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('avatarUrl', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Fund Name"
                    {...getFieldProps('fundName')}
                    error={Boolean(touched.fundName && errors.fundName)}
                    helperText={touched.fundName && errors.fundName}
                  />
                  <TextField
                    fullWidth
                    type="date"
                    label="Fund Inception Date"
                    {...getFieldProps('fundInceptionDate')}
                    error={Boolean(touched.fundInceptionDate && errors.fundInceptionDate)}
                    helperText={touched.fundInceptionDate && errors.fundInceptionDate}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Fund Manager Name"
                    {...getFieldProps('fundManagerName')}
                    error={Boolean(touched.fundManagerName && errors.fundManagerName)}
                    helperText={touched.fundManagerName && errors.fundManagerName}
                  />
                  <TextField
                    fullWidth
                    type="phone"
                    label="Fund Manager Phone Number"
                    {...getFieldProps('fundManagerPhone')}
                    error={Boolean(touched.fundManagerPhone && errors.fundManagerPhone)}
                    helperText={touched.fundManagerPhone && errors.fundManagerPhone}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Fund Manager Email"
                    {...getFieldProps('fundManagerEmail')}
                    error={Boolean(touched.fundManagerEmail && errors.fundManagerEmail)}
                    helperText={touched.fundManagerEmail && errors.fundManagerEmail}
                  />
                  <TextField
                    fullWidth
                    type="date"
                    label="Fund Manager BirthDay"
                    {...getFieldProps('fundManagerBirthDay')}
                    error={Boolean(touched.fundManagerBirthDay && errors.fundManagerBirthDay)}
                    helperText={touched.fundManagerBirthDay && errors.fundManagerBirthDay}
                  />
                </Stack>

                {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    type="phone"
                    label="Phone Number"
                    {...getFieldProps('phoneNumber')}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                  <TextField
                    select
                    fullWidth
                    label="Country"
                    placeholder="Country"
                    {...getFieldProps('country')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    <option value="" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Stack> */}
                {!isEdit && (
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                      {!isEdit ? 'Create User' : 'Save Changes'}
                    </LoadingButton>
                  </Box>
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
