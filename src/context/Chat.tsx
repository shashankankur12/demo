import { useCallback, useReducer } from 'react';
import {
  createContainer,
  createReducer,
  createAsyncActions,
} from 'utils/context';
import { api } from 'utils/api/api';
import { ChatResponseType } from 'typings/chat.types';

export type ChatState = {
  getAdminIdloading: boolean;
  adminId: string;
};

const initialState: ChatState = {
  getAdminIdloading: false,
  adminId: '',
};

const actions = {
  getAdminId: createAsyncActions('GET_ADMIN_ID'),
};

const chatReducer = createReducer<ChatState>({
  [`${actions.getAdminId.loading}`]: state => ({
    ...state,
    getAdminIdloading: true,
  }),
  [`${actions.getAdminId.success}`]: (state, { payload }) => ({
    ...state,
    adminId: payload?.adminId,
    getAdminIdloading: false,
  }),
  [`${actions.getAdminId.failure}`]: state => ({
    ...state,
    getAdminIdloading: false,
  }),
});

export const {
  useContext: useChat,
  Context: ChatContext,
  Provider: ChatProvider,
  TestProvider: TestChatProvider,
} = createContainer(() => {
  const [{ ...state }, dispatch] = useReducer(chatReducer, initialState);

  const getAdminId = useCallback(async () => {
    dispatch(actions.getAdminId.loading());

    try {
      const { data } = await api.get<ChatResponseType>('/v1/auth/get-admin-id');
      dispatch(
        actions.getAdminId.success({
          adminId: data?.data?.id,
        }),
      );
    } catch (e) {
      dispatch(actions.getAdminId.failure());
    }
  }, []);

  return {
    state: {
      ...state,
    },
    actions: {
      getAdminId,
    },
  };
});

export default useChat;
