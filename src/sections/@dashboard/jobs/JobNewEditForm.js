import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Chip, TextField, Grid, Stack, Typography } from '@mui/material';
import { useSnackbar } from './../../../components/snackbar';
import FormProvider, { RHFEditor, RHFTextField } from '../../../components/hook-form';
import { PATH_DASHBOARD } from '../../../routes/paths';

const OPTIONS = [
  { value: 'option 1', label: 'Option 1' },
  { value: 'option 2', label: 'Option 2' },
  { value: 'option 3', label: 'Option 3' },
  { value: 'option 4', label: 'Option 4' },
  { value: 'option 5', label: 'Option 5' },
  { value: 'option 6', label: 'Option 6' },
  { value: 'option 7', label: 'Option 7' },
  { value: 'option 8', label: 'Option 8' },
];

JobNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentJob: PropTypes.object,
};

export default function JobNewEditForm({ isEdit, currentJob }) {

  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewJobSchema = Yup.object().shape({
    title: Yup.string().required('Job title is required'),
    location: Yup.string().required('Location is required'),
    skills: Yup.array().min(1, 'Must have at least 1 skill'),
    role: Yup.string().required('Role is required'),
    description: Yup.string().required('Description is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentJob?.title || '',
      description: currentJob?.description || '',
      location: currentJob?.location || '',
      role: currentJob?.role || '',
      skills: currentJob?.skills || [],
    }),
    [currentJob]
  );

  const methods = useForm({
    resolver: yupResolver(NewJobSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentJob) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentJob, reset, defaultValues]);

  const onSubmit = async (data) => {

    try {

      await new Promise((resolve) => setTimeout(resolve, 500)); 
      
      // Simulating an asynchronous request
      
      // Send data to the database (replace with your database integration code)

      console.log('DATA', data);
      
      reset();

      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');

      push(PATH_DASHBOARD.jobs.root);

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Stack spacing={3}>

          <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Job Title
              </Typography>
              <RHFTextField name="title" />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Job Description
              </Typography>

              <RHFEditor full name="description" />
            </Stack>

            <Stack spacing={1} direction={{ md: 'row', sm: 'column' }}>
              <Stack
                spacing={1}
                mb={3}
                sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Location
                </Typography>
                <RHFTextField fullWidth name="location" />
              </Stack>

              <Stack spacing={1} sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Role
                </Typography>
                <RHFTextField name="role" />
              </Stack>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Skills Required
              </Typography>

              <Autocomplete
                multiple
                name="skills"
                options={OPTIONS.map((option) => option.value)}
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" placeholder="Skills..." />
                )}
              />
              
            </Stack>

            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!isEdit ? 'Post Job' : 'Save Changes'}
            </LoadingButton>

          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

