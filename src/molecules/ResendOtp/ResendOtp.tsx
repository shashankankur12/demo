import React, { useEffect, useState } from 'react';
import { Box } from 'atoms/Box';
import { Row } from 'atoms/Row';
import { Text } from 'atoms/Text';
import { TextButton } from 'atoms/TextButton';
import useAuth from 'context/Authentication';

const TIME = 10;
export const ResendOtp = () => {
  const [timeLeft, setTimeLeft] = useState(TIME);

  const startTimer = () => {
    let timer = setTimeout(() => {
      if (timeLeft <= 0) {
        clearTimeout(timer);
        return false;
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => clearTimeout(TIME);
  });

  const start = () => {
    setTimeLeft(TIME);
    clearTimeout(TIME);
    startTimer();
  };

  const {
    state: { forgotPasswordEmail, resendOTPLoading },
    actions: { resendOtp },
  } = useAuth();

  const handleResendOtp = async () => {
    await resendOtp(forgotPasswordEmail);
    start();
  };

  return (
    <Box>
      {!timeLeft > 0 ? (
        <Row px="xl" py="xm" justifyContent="center" alignItems="center">
          <Text localeId="verification.code.havent" variant="medium" mr="xs" />
          <TextButton
            variant="medium"
            color="primary"
            localeId="verification.code.resend"
            loading={resendOTPLoading}
            onPress={handleResendOtp}
          />
        </Row>
      ) : (
        <Box px="xl" py="xm" justifyContent="center" alignItems="center">
          <Text
            localeId="resend.otp.text"
            values={{ time: timeLeft }}
            variant="medium"
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};
