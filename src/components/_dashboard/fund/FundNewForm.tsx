import * as Yup from 'yup';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// redux
import { Formik } from 'formik';

// material
import { Card, Grid, Stack, TextField, Button, FormHelperText, Box } from '@material-ui/core';
import { getFundManagers, createFund } from '../../../redux/slices/fund';
import { useDispatch, useSelector, RootState } from '../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { Fund } from '../../../@types/fund';

// ----------------------------------------------------------------------

type FundNewFormProps = {
  isEdit: string;
  currentFund?: Fund;
};

export default function FundNewForm({ isEdit, currentFund }: FundNewFormProps, { ...others }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fundManagers } = useSelector((state: RootState) => state.fund);

  useEffect(() => {
    dispatch(getFundManagers());
  }, [dispatch]);

  const NewFundSchema = Yup.object().shape({
    fundName: Yup.string().required('Name is required'),
    fundManagerEmail: Yup.string().required('Email is required').email(),
    fundManagerPhone: Yup.string(),
    fundManagerName: Yup.string(),
    fundManagerBirthDay: Yup.date(),
    fundInceptionDate: Yup.date()
  });

  return (
    <Formik
      initialValues={{
        fundName: currentFund?.fund_name || '',
        fundInceptionDate: currentFund?.fund_inception_date || '',
        fundManagerPhone: currentFund?.fund_manager?.fund_manager_phone || '',
        fundManagerName: currentFund?.fund_manager?.fund_manager_name || '',
        fundManagerEmail: currentFund?.fund_manager?.fund_manager_mail_address || '',
        fundManagerBirthDay: currentFund?.fund_manager?.fund_manager_birth_date || '',
        submit: null
      }}
      validationSchema={NewFundSchema}
      onSubmit={async (values, { setErrors, setStatus, resetForm, setSubmitting }) => {
        try {
          const data = {
            fund_name: values.fundName,
            fund_manager: {
              fund_manager_id: values.fundManagerEmail
            }
          };
          dispatch(createFund(data));
          resetForm();
          setSubmitting(false);
          setStatus({ success: true });
          navigate(PATH_DASHBOARD.fund.list);
        } catch (error: any) {
          console.error(error);
          setStatus({ success: false });
          setSubmitting(false);
          setErrors({ submit: error.message });
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <Grid container>
            <Grid item xs={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  {isEdit === 'show' && (
                    <>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <TextField
                          fullWidth
                          label="Fund Name"
                          value={values.fundName}
                          name="fundName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          inputProps={{}}
                          error={Boolean(touched.fundName && errors.fundName)}
                          helperText={touched.fundName && errors.fundName}
                        />
                        <TextField
                          fullWidth
                          type="date"
                          label="Fund Inception Date"
                          name="fundInceptionDate"
                          value={values.fundInceptionDate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          inputProps={{}}
                          error={Boolean(touched.fundInceptionDate && errors.fundInceptionDate)}
                          helperText={touched.fundInceptionDate && errors.fundInceptionDate}
                        />
                      </Stack>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <TextField
                          fullWidth
                          label="Fund Manager Name"
                          value={values.fundManagerName}
                          name="fundManagerName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          inputProps={{}}
                          error={Boolean(touched.fundManagerName && errors.fundManagerName)}
                          helperText={touched.fundManagerName && errors.fundManagerName}
                        />
                        <TextField
                          fullWidth
                          type="phone"
                          label="Fund Manager Phone Number"
                          name="fundManagerPhone"
                          value={values.fundManagerPhone}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          inputProps={{}}
                          error={Boolean(touched.fundManagerPhone && errors.fundManagerPhone)}
                          helperText={touched.fundManagerPhone && errors.fundManagerPhone}
                        />
                      </Stack>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <TextField
                          fullWidth
                          type="email"
                          label="Fund Manager Email"
                          value={values.fundManagerEmail}
                          name="fundManagerEmail"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          inputProps={{}}
                          error={Boolean(touched.fundManagerEmail && errors.fundManagerEmail)}
                          helperText={touched.fundManagerEmail && errors.fundManagerEmail}
                        />
                        <TextField
                          fullWidth
                          type="date"
                          label="Fund Manager BirthDay"
                          value={values.fundManagerBirthDay}
                          name="fundManagerBirthDay"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          inputProps={{}}
                          error={Boolean(touched.fundManagerBirthDay && errors.fundManagerBirthDay)}
                          helperText={touched.fundManagerBirthDay && errors.fundManagerBirthDay}
                        />
                      </Stack>
                    </>
                  )}
                  {isEdit === 'new' && (
                    <>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <TextField
                          fullWidth
                          label="Fund Name"
                          value={values.fundName}
                          name="fundName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          inputProps={{}}
                          error={Boolean(touched.fundName && errors.fundName)}
                          helperText={touched.fundName && errors.fundName}
                        />
                        <TextField
                          select
                          fullWidth
                          label="Fund Manager"
                          placeholder="Fund Manager"
                          name="fundManagerEmail"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          inputProps={{}}
                          SelectProps={{ native: true }}
                          error={Boolean(touched.fundManagerEmail && errors.fundManagerEmail)}
                          helperText={touched.fundManagerEmail && errors.fundManagerEmail}
                        >
                          <option value="" />
                          {fundManagers.map((fundManager) => (
                            <option
                              key={fundManager.fund_manager_id}
                              value={fundManager.fund_manager_id}
                            >
                              {fundManager.fund_manager_id}
                            </option>
                          ))}
                        </TextField>
                      </Stack>
                      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" disabled={isSubmitting} type="submit">
                          Create Fund
                        </Button>
                      </Box>
                    </>
                  )}
                </Stack>
                {errors.submit && (
                  <Box
                    sx={{
                      mt: 3
                    }}
                  >
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Box>
                )}
              </Card>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
