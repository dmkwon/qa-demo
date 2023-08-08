import Script from 'next/script';
import { useState } from 'react';

import PropTypes from 'prop-types';
// @mui

import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// theme
import { bgBlur } from 'src/theme/css';
// hooks
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Logo from 'src/components/logo';
import SvgColor from 'src/components/svg-color';
import { useSettingsContext } from 'src/components/settings';
//
import { IMP_UID } from 'src/config-global';
import { HEADER, NAV } from '../config-layout';
import { AccountPopover, ThemeButton } from '../_common';

// ----------------------------------------------------------------------

const initialState = {
  pg: 'html5_inicis', // PG사 : https://portone.gitbook.io/docs/sdk/javascript-sdk/payrq#undefined-1 참고
  pay_method: 'card', // 결제수단
  merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
  amount: 1000, // 결제금액
  name: '아임포트 결제 데이터 분석', // 주문명
  buyer_name: '홍길동', // 구매자 이름
  buyer_tel: '01012341234', // 구매자 전화번호
  buyer_email: 'example@example', // 구매자 이메일
  buyer_addr: '신사동 661-16', // 구매자 주소
  buyer_postcode: '06018', // 구매자 우편번호
};

export default function Header({ onOpenNav }) {
  const [params, setParams] = useState(initialState);
  const [result, setResult] = useState(null);

  const theme = useTheme();

  const settings = useSettingsContext();

  const isNavHorizontal = settings.themeLayout === 'horizontal';

  const isNavMini = settings.themeLayout === 'mini';

  const lgUp = useResponsive('up', 'lg');

  const offset = useOffSetTop(HEADER.H_DESKTOP);

  const offsetTop = offset && !isNavHorizontal;

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init(IMP_UID);
    IMP.request_pay(params, onPaymentAccepted);
  };

  const onPaymentAccepted = (response) => {
    console.log(response);
    setResult(response);
  };

  const renderContent = (
    <>
      {lgUp && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}
      {!lgUp && isNavHorizontal && (
        <IconButton onClick={onOpenNav} sx={{ml : 1}}>
          <Logo sx={{ mr: 1.5 }} />
        </IconButton>
      )}
{/* 결제 아이콘 삭제요
      <IconButton onClick={onClickPayment}>
        <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
      </IconButton> */}

      {/* <Searchbar /> */}
      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        {/* <LanguagePopover />

        <NotificationsPopover />

        <ContactsPopover /> */}

        {/* <SettingsButton /> */}
        <ThemeButton icons={['sun', 'moon']} />

        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <>
      <Script
        src="https://cdn.iamport.kr/v1/iamport.js"
        onLoad={() => {
          console.log('import library has loaded');
        }}
      />

      <AppBar
        sx={{
          height: HEADER.H_MOBILE,
          zIndex: theme.zIndex.appBar + 1,
          ...bgBlur({
            color: theme.palette.background.default,
          }),
          transition: theme.transitions.create(['height'], {
            duration: theme.transitions.duration.shorter,
          }),
          ...(lgUp && {
            width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
            height: HEADER.H_DESKTOP,
            ...(offsetTop && {
              height: HEADER.H_DESKTOP_OFFSET,
            }),
            ...(isNavHorizontal && {
              width: 1,
              bgcolor: 'background.default',
              height: HEADER.H_DESKTOP_OFFSET,
              borderBottom: `dashed 1px ${theme.palette.divider}`,
            }),
            ...(isNavMini && {
              width: `calc(100% - ${NAV.W_MINI + 1}px)`,
            }),
          }),
          
          ...(!lgUp && {
            width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
            height: HEADER.H_DESKTOP,
            ...(offsetTop && {
              height: HEADER.H_DESKTOP_OFFSET,
            }),
            ...(isNavHorizontal && {
              width: 1,
              bgcolor: 'background.default',
              height: HEADER.H_DESKTOP_OFFSET,
              borderBottom: `dashed 1px ${theme.palette.divider}`,
            }),
            ...(isNavMini && {
              width: `calc(100% - ${NAV.W_MINI + 1}px)`,
            }),
          }),
        }}
      >
        <Toolbar
          sx={{
            height: 1,
            px: { lg: 5 },
          }}
        >
          {renderContent}
        </Toolbar>
      </AppBar>
    </>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
