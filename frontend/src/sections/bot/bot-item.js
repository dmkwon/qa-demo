import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
// utils
import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';
// routes
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import Markdown from 'src/components/markdown';
import Label from 'src/components/label/label';
// ----------------------------------------------------------------------

export default function BotItem({ bot, onView, onEdit, onDelete}) {
  const popover = usePopover();

  const { id, title, company, createdAt, candidates, experience, employmentTypes, salary, role, content } =
    bot;

  return (
    <>
      <Card>
        <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <Label variant="soft" color={'info'} sx={{ position: 'relative', top: 16, left: 20}}>
          public
        </Label>

        <ListItemText
          secondary={`${fDate(createdAt)}`}
          secondaryTypographyProps={{
            mt: 1,
            component: 'span',
            typography: 'caption',
            color: 'text.disabled',
          }}
          sx={{ position: 'absolute', top: 11, right: '40px' }}
        />

        <Stack sx={{ p: 3, pb: 2 }}>
          <Avatar
            alt={company.name}
            src={company.logo}
            variant="rounded"
            sx={{ width: 48, height: 48, mb: 2, mt: 3 }}
          />

          <ListItemText
            sx={{ mb: 0 }}
            primary={
              <Link component={RouterLink} href={paths.bot.details(id)} color="inherit">
                {title}
              </Link>
            }
            primaryTypographyProps={{
              typography: 'subtitle1',
            }}
            // 뭔가 새로 36번 줄에 만듬
            // secondaryTypographyProps={{
            //   mt: 1,
            //   component: 'span',
            //   typography: 'caption',
            //   color: 'text.disabled',
            // }}
          />
          {/* 아래 따라 지움 */}
          {/* <Stack
            spacing={0.5}
            direction="row"
            alignItems="center"
            sx={{ color: 'primary.main', typography: 'caption' }}
          > */}
          {/* Candidate 내용 지움 */}
          {/* <Iconify width={16} icon="solar:users-group-rounded-bold" /> */}
          {/* {candidates.length} Candidates */}
          {/* </Stack> */}
          <Divider sx={{ margin: 1, borderStyle: 'dashed' }} />
          <Typography variant="caption" noWrap>
            <Markdown children={content.slice(36, 90) + '...'} />
          </Typography>
        </Stack>

        {/* 구분선 지움 */}

        {/* 불필요 Box 삭제 */}
        {/* <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ p:3 }}>
          {[
            // {
            //   label: experience,
            //   icon: <Iconify width={16} icon="carbon:skill-level-basic" sx={{ flexShrink: 0 }} />,
            // },
            // {
            //   label: employmentTypes.join(', '),
            //   icon: <Iconify width={16} icon="solar:clock-circle-bold" sx={{ flexShrink: 0 }} />,
            // },
            // {
            //   label: salary.negotiable ? 'Negotiable' : fCurrency(salary.price),
            //   icon: <Iconify width={16} icon="solar:wad-of-money-bold" sx={{ flexShrink: 0 }} />,
            // },
            // {
            //   label: role,
            //   icon: <Iconify width={16} icon="solar:user-rounded-bold" sx={{ flexShrink: 0 }} />,
            // },
          // ].map((item) => (
          //   <Stack
          //     key={item.label}
          //     spacing={0.5}
          //     flexShrink={0}
          //     direction="row"
          //     alignItems="center"
          //     sx={{ color: 'text.disabled', minWidth: 0 }}
          //   >
          //     {item.icon}
              
            // </Stack>
          // ))
          ]}
        </Box> */}
      </Card>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        {/*--- 에서 View 삭제  */}
        {/* <MenuItem
          onClick={() => {
            popover.onClose();
            onView();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem> */}

        <MenuItem
          onClick={() => {
            popover.onClose();
            onEdit();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onDelete();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}

BotItem.propTypes = {
  bot: PropTypes.object,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
};
