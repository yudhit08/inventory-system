// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Story, Fatrows, PresentionChart } from 'iconsax-react';

// icons
const icons = {
  widgets: Story,
  statistics: Story,
  data: Fatrows,
  chart: PresentionChart
};

// ==============================|| MENU ITEMS - WIDGETS ||============================== //

const pengaduan = {
  id: 'group-widget',
  title: <FormattedMessage id="pengaduan" />,
  icon: icons.widgets,
  type: 'group',
  children: [
    {
      id: 'riwayat',
      title: <FormattedMessage id="riwayat-pengaduan" />,
      type: 'item',
      url: '/riwayat-pengaduan',
      icon: icons.statistics
    },
    {
      id: 'buat',
      title: <FormattedMessage id="buat-pengaduan" />,
      type: 'collapse',
      icon: icons.data,
      children: [
        {
          id: 'layanan',
          title: <FormattedMessage id="pengaduan-layanan" />,
          type: 'item',
          url: '/laporan/layanan'
        },
        {
          id: 'barang',
          title: <FormattedMessage id="pengaduan-barang" />,
          type: 'item',
          url: '/laporan/barang'
        }
      ]
    }
  ]
};

export default pengaduan;
