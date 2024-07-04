import PropTypes from 'prop-types';

// material-ui
import { Typography, Stack, CardMedia } from '@mui/material';

// project-import
import { DropzopType } from '@/config';

// assets
import { Camera } from 'iconsax-react';
import UploadCover from '@/assets/images/upload/upload.svg';

// ==============================|| UPLOAD - PLACEHOLDER ||============================== //

export default function PlaceholderContent({ type }) {
  return (
    <>
      {type !== DropzopType.standard && (
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction={{ xs: 'column', md: 'row' }}
          sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
        >
          <CardMedia component="img" image={UploadCover} sx={{ width: 150 }} />
          <Stack sx={{ p: 3 }} spacing={1}>
            <Typography variant="h5">Drag & Drop or Select file</Typography>

            <Typography color="secondary">
              Pilih&nbsp;
              <Typography component="span" color="primary" sx={{ textDecoration: 'underline' }}>
                foto
              </Typography>
              &nbsp;barang/layanan yang ingin dilaporkan
            </Typography>
          </Stack>
        </Stack>
      )}
      {type === DropzopType.standard && (
        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Camera style={{ fontSize: '32px' }} />
        </Stack>
      )}
    </>
  );
}

PlaceholderContent.propTypes = {
  type: PropTypes.string
};
