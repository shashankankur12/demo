import { useCallback, useReducer } from 'react';
import {
  createContainer,
  createReducer,
  createAsyncActions,
  createAction,
} from 'utils/context';
import { persist, AUTH_KEYS, hydrate, unpersist } from 'utils/storage';
import i18n from 'i18n-js';
import {
  CredentialsProps,
  LoginResponse,
  ProfileFormType,
  SignUpFormType,
  User,
  VerifyInvitationCodeResponse,
  VerifyOTPResponse,
} from 'typings/auth.types';
import { showErrorMessage, showSuccessMessage } from 'utils/toast';
import { api } from 'utils/api/api';
import { enabledHeadersFromStorage, removeHeaders } from 'utils/api/utils';
import { goBack, navigate } from 'services/NavigationService';
import { ImageType } from 'typings/general.types';
import { getDateFromString } from 'utils/date-formatter';

export type AuthState = {
  userData?: User;
  isLoggedIn?: boolean;
  authenticating?: boolean;
  language?: string;
  loginLoading?: boolean;
  forgotPasswordLoading: boolean;
  forgotPassswordSuccess: boolean;
  forgotPasswordEmail: string;
  verifyOTPLoading: boolean;
  verifyOTPSuccess: boolean;
  resendOTPLoading: boolean;
  resendOTPSuccess: boolean;
  signUpLoading?: boolean;
  signUpDone?: boolean;
  forgotPasswordToken: string;
  resetPasswordLoading?: boolean;
  invitationLoading: boolean;
  invitedEmail: string;
  logoutLoading: boolean;
  updatePasswordloading: boolean;
  isAppLoading: boolean;
  getUserProfileLoading: boolean;
  updateUserProfileLoading: boolean;
  getCredentialsLoading: boolean;
  credentialList: Array<CredentialsProps>;
  imageUploadloading: boolean;
};

const initialState: AuthState = {
  loginLoading: false,
  isLoggedIn: false,
  authenticating: false,
  userData: undefined,
  language: 'en',
  forgotPasswordLoading: false,
  forgotPassswordSuccess: false,
  forgotPasswordEmail: '',
  verifyOTPLoading: false,
  verifyOTPSuccess: false,
  resendOTPLoading: false,
  resendOTPSuccess: false,
  signUpLoading: false,
  signUpDone: false,
  forgotPasswordToken: '',
  resetPasswordLoading: false,
  invitationLoading: false,
  invitedEmail: '',
  logoutLoading: false,
  updatePasswordloading: false,
  isAppLoading: true,
  getUserProfileLoading: false,
  updateUserProfileLoading: false,
  getCredentialsLoading: false,
  credentialList: [],
  imageUploadloading: false,
};

const actions = {
  signUp: createAsyncActions('SIGN_UP'),
  login: createAsyncActions('LOGIN'),
  setAuthentication: createAction('AUTHENTICATION'),
  changeLanguage: createAction('CHANGE_LANGUAGE'),
  forgotPassword: createAsyncActions('FORGOT_PASSWORD'),
  verifyOtp: createAsyncActions('VERIFY_OTP'),
  resendOtp: createAsyncActions('RESEND_OTP'),
  resetPassword: createAsyncActions('RESET_PASSWORD'),
  verifyInvitationCode: createAsyncActions('VERIFY_INVITATION_CODE'),
  logout: createAsyncActions('LOGOUT'),
  getUserProfile: createAsyncActions('GET_USER_PROFILE'),
  updateUserProfile: createAsyncActions('UPDATE_USER_PROFILE'),
  updatePassword: createAsyncActions('UPDATE_PASSWORD'),
  getCredentials: createAsyncActions('GET_CREDENTIALS'),
  handleImageUpload: createAsyncActions('IMAGE_UPLOAD'),
};

const authReducer = createReducer<AuthState>({
  [`${actions.updateUserProfile.loading}`]: state => ({
    ...state,
    updateUserProfileLoading: true,
  }),
  [`${actions.updateUserProfile.success}`]: (state, { payload }) => ({
    ...state,
  }),
  [`${actions.logout.loading}`]: state => ({
    ...state,
    logoutLoading: true,
  }),
  [`${actions.logout.success}`]: (state, { payload }) => ({
    ...state,
    logoutLoading: false,
    isLoggedIn: false,
    user: payload?.user,
  }),
  [`${actions.logout.failure}`]: state => ({
    ...state,
    logoutLoading: false,
  }),
  [`${actions.updateUserProfile.loading}`]: state => ({
    ...state,
    updateUserProfileLoading: true,
  }),
  [`${actions.updateUserProfile.success}`]: (state, { payload }) => ({
    ...state,
    userData: payload.userData,
    updateUserProfileLoading: false,
  }),
  [`${actions.updateUserProfile.failure}`]: state => ({
    ...state,
    updateUserProfileLoading: false,
  }),
  [`${actions.getUserProfile.loading}`]: state => ({
    ...state,
    getUserProfileLoading: true,
  }),
  [`${actions.getUserProfile.success}`]: state => ({
    ...state,
    getUserProfileLoading: false,
  }),
  [`${actions.getUserProfile.failure}`]: state => ({
    ...state,
    getUserProfileLoading: false,
  }),
  [`${actions.setAuthentication}`]: (state, { payload }) => ({
    ...state,
    userData: payload?.userData,
    isLoggedIn: payload?.isLoggedIn,
    authenticating: false,
    isAppLoading: false,
  }),
  [`${actions.logout}`]: state => ({
    ...state,
    isLoggedIn: false,
  }),
  [`${actions.login.loading}`]: state => ({
    ...state,
    loginLoading: true,
  }),
  [`${actions.login.success}`]: (state, { payload }) => ({
    ...state,
    loginLoading: false,
    userData: payload?.userData,
    isLoggedIn: true,
  }),
  [`${actions.login.failure}`]: state => ({
    ...state,
    loginLoading: false,
  }),
  [`${actions.forgotPassword.loading}`]: state => ({
    ...state,
    forgotPasswordLoading: true,
    forgotPassswordSuccess: false,
  }),
  [`${actions.forgotPassword.success}`]: (state, { payload }) => ({
    ...state,
    forgotPasswordEmail: payload.forgotPasswordEmail,
    forgotPasswordLoading: false,
    forgotPassswordSuccess: true,
  }),
  [`${actions.forgotPassword.failure}`]: state => ({
    ...state,
    forgotPasswordLoading: false,
    forgotPassswordSuccess: false,
  }),
  [`${actions.verifyOtp.loading}`]: state => ({
    ...state,
    verifyOTPLoading: true,
    verifyOTPSuccess: false,
  }),
  [`${actions.verifyOtp.success}`]: (state, { payload }) => ({
    ...state,
    verifyOTPLoading: false,
    verifyOTPSuccess: true,
    forgotPassswordSuccess: false,
    forgotPasswordToken: payload.forgotPasswordToken,
  }),
  [`${actions.verifyOtp.failure}`]: state => ({
    ...state,
    verifyOTPLoading: false,
    verifyOTPSuccess: false,
  }),
  [`${actions.resendOtp.loading}`]: state => ({
    ...state,
    resendOTPLoading: true,
    resendOTPSuccess: false,
  }),
  [`${actions.resendOtp.success}`]: (state, { payload }) => ({
    ...state,
    resendOTPLoading: false,
    resendOTPSuccess: true,
  }),
  [`${actions.resendOtp.failure}`]: state => ({
    ...state,
    resendOTPLoading: false,
    resendOTPSuccess: false,
  }),
  [`${actions.changeLanguage}`]: (state, { payload }) => ({
    ...state,
    language: payload,
  }),
  [`${actions.signUp.loading}`]: state => ({
    ...state,
    signUpLoading: true,
  }),
  [`${actions.signUp.success}`]: (state, { payload }) => ({
    ...state,
    signUpLoading: false,
    userData: payload?.userData,
    signUpDone: true,
  }),
  [`${actions.signUp.failure}`]: state => ({
    ...state,
    signUpLoading: false,
  }),
  [`${actions.resetPassword.loading}`]: state => ({
    ...state,
    resetPasswordLoading: true,
  }),
  [`${actions.resetPassword.success}`]: state => ({
    ...state,
    resetPasswordLoading: false,
  }),
  [`${actions.resetPassword.failure}`]: state => ({
    ...state,
    resetPasswordLoading: false,
  }),
  [`${actions.verifyInvitationCode.loading}`]: state => ({
    ...state,
    invitationLoading: true,
  }),
  [`${actions.verifyInvitationCode.success}`]: (state, { payload }) => ({
    ...state,
    invitationLoading: false,
    invitedEmail: payload.invitedEmail,
  }),
  [`${actions.verifyInvitationCode.failure}`]: state => ({
    ...state,
    invitationLoading: false,
  }),
  [`${actions.updatePassword.loading}`]: state => ({
    ...state,
    updatePasswordloading: true,
  }),
  [`${actions.updatePassword.success}`]: state => ({
    ...state,
    updatePasswordloading: false,
  }),
  [`${actions.updatePassword.failure}`]: state => ({
    ...state,
    updatePasswordloading: false,
  }),
  [`${actions.getCredentials.success}`]: (state, { payload }) => ({
    ...state,
    credentialList: payload?.credentialList,
    getCredentialsLoading: false,
  }),
  [`${actions.handleImageUpload.loading}`]: state => ({
    ...state,
    imageUploadloading: true,
  }),
  [`${actions.handleImageUpload.success}`]: (state, { payload }) => ({
    ...state,
    imageUploadloading: false,
  }),
  [`${actions.handleImageUpload.failure}`]: state => ({
    ...state,
    imageUploadloading: false,
  }),
});

export const {
  useContext: useAuth,
  Context: AuthContext,
  Provider: AuthProvider,
  TestProvider: TestAuthProvider,
} = createContainer(() => {
  const [{ language, ...state }, dispatch] = useReducer(
    authReducer,
    initialState,
  );

  const getUserFromStorage = useCallback(async () => {
    const token = await hydrate<string>(AUTH_KEYS.token);
    const storedUserData = await hydrate<User>(AUTH_KEYS.user);
    if (token && storedUserData) {
      await enabledHeadersFromStorage();
      dispatch(
        actions.setAuthentication({
          isLoggedIn: true,
          userData: storedUserData,
        }),
      );
    } else {
      dispatch(actions.setAuthentication({ isLoggedIn: false }));
    }
  }, []);

  const setUserInfo = useCallback(async (token: string, userData: User) => {
    await persist(AUTH_KEYS.token, token);
    await persist(AUTH_KEYS.user, userData);
    await enabledHeadersFromStorage();
    dispatch(
      actions.setAuthentication({ isLoggedIn: true, userData: userData }),
    );
  }, []);

  const logout = useCallback(async () => {
    dispatch(actions.logout.loading());
    try {
      // await api.delete( '/v1/auth/logout' );
      dispatch(actions.logout.success({ user: undefined }));
      await unpersist(AUTH_KEYS.token);
      await unpersist(AUTH_KEYS.user);
      removeHeaders();
      // dispatch(actions.logout());
      navigate('Login');
    } catch (e) {
      showErrorMessage(e.message);
      dispatch(actions.logout.failure());
    }
  }, [setUserInfo]);
  const login = useCallback(
    async (values: { email: string; password: string }) => {
      dispatch(actions.login.loading());
      try {
        const { data } = await api.post<LoginResponse>(
          '/v1/auth/provider-login',
          values,
        );
        showSuccessMessage('Login successful');
        await setUserInfo(data.data.token.accessToken, data.data.user);
        dispatch(actions.login.success({ userData: data.data.user }));
      } catch (e) {
        showErrorMessage(e.message);
        dispatch(actions.login.failure());
      }
    },
    [setUserInfo],
  );

  const signUp = useCallback(
    async (values: SignUpFormType) => {
      dispatch(actions.signUp.loading());
      try {
        const { data } = await api.post<LoginResponse>('/v1/auth/register', {
          firstName: values.firstName,
          lastName: values.lastName,
          role: 'PROVIDER',
          email: values.email,
          phone: values.phone.replace(/[()-\s]/g, ''),
          isActive: true,
          password: values.password,
          address1: values.address1,
          postalCode: values.postalCode,
          dateOfBirth: getDateFromString(values.dob),
          gender: values.gender,
          address2: values.address2,
          city: values.city,
          state: values.state,
          bio: values.bio,
          credentials: values.credentials,
          profileImage: values.profileImage,
        });

        await setUserInfo(data.data.token.accessToken, data.data.user);
        dispatch(actions.signUp.success({ userData: data.data.user }));
        navigate('AccountConfirmation');
      } catch (e) {
        showErrorMessage(e.message);
        dispatch(actions.signUp.failure());
      }
    },
    [setUserInfo],
  );

  const updateProfile = useCallback(
    async (values: ProfileFormType, imageUrl: string) => {
      dispatch(actions.updateUserProfile.loading());
      try {
        const { data } = await api.put<{ status: User }>('/v1/users/update', {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone.replace(/[()-\s]/g, ''),
          address1: values.address1,
          postalCode: values.postalCode,
          dateOfBirth: getDateFromString(values.dob),
          gender: values.gender,
          address2: values.address2,
          city: values.city,
          state: values.state,
          bio: values.bio,
          credentials: values.credentials,
          profileImage: imageUrl,
        });

        const token = await hydrate<string>(AUTH_KEYS.token);
        if (token) {
          await setUserInfo(token, data.data.status);
        }

        dispatch(
          actions.updateUserProfile.success({ userData: data.data.status }),
        );
        showSuccessMessage('Profile updated successfully');
        goBack();
      } catch (e) {
        showErrorMessage(e.message);
        dispatch(actions.updateUserProfile.failure());
      }
    },
    [setUserInfo],
  );

  const getUserProfile = useCallback(async () => {
    dispatch(actions.getUserProfile.loading());
    try {
      const newUser = await api.get<User>('v1/auth/me');

      const token = await hydrate<string>(AUTH_KEYS.token);

      if (token) {
        await setUserInfo(token, newUser.data.data);
      }

      dispatch(actions.getUserProfile.success());
    } catch (e) {
      showErrorMessage(e.message);
      dispatch(actions.getUserProfile.failure());
    }
  }, [setUserInfo]);

  const handleImageUpload = useCallback(async (image: ImageType) => {
    const formData = new FormData();
    formData.append('file', image);
    dispatch(actions.handleImageUpload.loading());
    try {
      const { data } = await api.post<{ url: string }>(
        '/v1/users/upload/image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      dispatch(actions.handleImageUpload.success());
      return data.data.url;
    } catch (e) {
      dispatch(actions.handleImageUpload.failure());
      showErrorMessage(e.message);
    }

    return undefined;
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    try {
      dispatch(actions.forgotPassword.loading());
      await api.post('/v1/auth/send-OTP', { email });
      dispatch(actions.forgotPassword.success({ forgotPasswordEmail: email }));
    } catch (e) {
      dispatch(actions.forgotPassword.failure());
      showErrorMessage(e.message);
    }
  }, []);

  const resendOtp = useCallback(async (email: string) => {
    try {
      dispatch(actions.resendOtp.loading());
      await api.post('/v1/auth/send-OTP', { email });
      dispatch(actions.resendOtp.success());
    } catch (e) {
      dispatch(actions.resendOtp.failure());
      showErrorMessage(e.message);
    }
  }, []);

  const verifyOtp = useCallback(
    async (values: { email: string; OTP: string }) => {
      try {
        dispatch(actions.verifyOtp.loading());
        const { data } = await api.post<VerifyOTPResponse>(
          '/v1/auth/verify-OTP',
          values,
        );
        dispatch(
          actions.verifyOtp.success({ forgotPasswordToken: data.data.token }),
        );
        navigate('CreateNewPassword');
      } catch (e) {
        dispatch(actions.verifyOtp.failure());
        showErrorMessage(e.message);
      }
    },
    [],
  );

  const resetPassword = useCallback(
    async (values: { newPassword: string; token: string }) => {
      try {
        dispatch(actions.resetPassword.loading());
        await api.post('/v1/auth/reset-password', values);
        dispatch(actions.resetPassword.success());
        navigate('PasswordResetConfirmation');
      } catch (e) {
        dispatch(actions.resetPassword.failure());
        showErrorMessage(e.message);
      }
    },
    [],
  );
  const updatePassword = useCallback(
    async (values: { newPassword: string; oldPassword: string }) => {
      try {
        dispatch(actions.updatePassword.loading());
        await api.post('/v1/users/change-password', values);
        dispatch(actions.updatePassword.success());
        showSuccessMessage('Your Password has been updated successfully');
        logout();
      } catch (e) {
        showErrorMessage(e.message);
        dispatch(actions.updatePassword.failure());
      }
    },
    [logout],
  );
  const verifyInvitationCode = useCallback(async (VerificationCode: string) => {
    try {
      dispatch(actions.verifyInvitationCode.loading());
      const { data } = await api.post<VerifyInvitationCodeResponse>(
        '/v1/auth/verify-verification-code',
        { VerificationCode },
      );
      dispatch(
        actions.verifyInvitationCode.success({
          invitedEmail: data.data.status.email,
        }),
      );
      navigate('Register');
    } catch (e) {
      dispatch(actions.verifyInvitationCode.failure());
      showErrorMessage(e.message);
    }
  }, []);

  const closeVerificationModal = useCallback(() => {
    dispatch(actions.forgotPassword.failure());
  }, []);

  const getCredentials = useCallback(async () => {
    dispatch(actions.getCredentials.loading());
    const { data } = await api.get<Array<CredentialsProps>>(
      'v1/auth/credentials-list',
    );
    const credentialOption = data?.data;
    dispatch(
      actions.getCredentials.success({
        credentialList: credentialOption.length > 0 ? credentialOption : [],
      }),
    );
  }, []);

  const changeLanguage = useCallback(async () => {
    dispatch(actions.changeLanguage('fr'));
    i18n.reset();
  }, []);

  return {
    state: {
      ...state,
      language,
    },
    actions: {
      changeLanguage,
      forgotPassword,
      closeVerificationModal,
      login,
      verifyOtp,
      resendOtp,
      signUp,
      resetPassword,
      verifyInvitationCode,
      logout,
      getUserFromStorage,
      updatePassword,
      getUserProfile,
      handleImageUpload,
      updateProfile,
      getCredentials,
    },
  };
});

export default useAuth;
