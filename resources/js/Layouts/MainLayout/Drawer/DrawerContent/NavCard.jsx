// material-ui
import { Button, Link, CardMedia, Stack, Typography } from '@mui/material';

// project-imports
import MainCard from '../../../../Components/MainCard';

// assets
import avatar from '../../../../assets/images/users/customer-support-1.png';
import AnimateButton from '../../../../Components/@extended/AnimateButton';

// ==============================|| DRAWER CONTENT - NAV CARD ||============================== //

const NavCard = () => (
  <MainCard sx={{ bgcolor: 'secondary.lighter', m: 3 }}>
    <Stack alignItems="center" spacing={2.5}>
      <CardMedia component="img" image={avatar} />
      <Stack alignItems="center">
        <Typography variant="h5">Butuh bantuan?</Typography>
        <Typography variant="h6" color="secondary">
          Respons dalam 1 hari
        </Typography>
      </Stack>
      <AnimateButton>
        <Button variant="shadow" size="small" component={Link} href="https://phoenixcoded.authordesk.app/" target="_blank">
          Dapatkan Bantuan
        </Button>
      </AnimateButton>
    </Stack>
  </MainCard>
);

export default NavCard;
