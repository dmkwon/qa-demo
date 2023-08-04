'use client';

import PropTypes from 'prop-types';
import { useEffect, useReducer, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
//
import { AuthContext } from './auth-context';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const initialize = useCallback(() => {
    const supabase = createClientComponentClient();

    try {
      supabase.auth.onAuthStateChange((event, session) => {
        console.log(event, session);
        if (session) {
          if (session.user) {
            dispatch({
              type: 'INITIAL',
              payload: {
                user: {
                  ...session.user,
                  ...session.user,
                  id: session.user.id,
                  role: 'admin',
                },
              },
            });
          } else {
            dispatch({
              type: 'INITIAL',
              payload: {
                user: null,
              },
            });
          }
        } else {
          dispatch({
            type: 'INITIAL',
            payload: {
              user: null,
            },
          });
        }
        router.refresh();
      });

      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, [router]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const loginWithGoogle = useCallback(async () => {
    const supabase = createClientComponentClient();
    supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }, []);

  const loginWithGithub = useCallback(async () => {
    const supabase = createClientComponentClient();
    supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  }, []);

  // LOGIN
  const login = useCallback(async (email, password) => {
    console.log(email, password);
    const supabase = createClientComponentClient();
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  }, []);

  // REGISTER
  const register = useCallback(async (email, password) => {
    console.log(email, password);
    const supabase = createClientComponentClient();
    await supabase.auth.signUp({
      email,
      password,
    });
  }, []);

  // LOGOUT

  const logout = useCallback(async () => {
    const supabase = createClientComponentClient();
    await supabase.auth.signOut();
  }, []);

  // FORGOT PASSWORD
  const forgotPassword = useCallback(async (email) => {
    console.log(email);
    const supabase = createClientComponentClient();
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: '/',
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'supabase',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
      register,
      forgotPassword,
      loginWithGoogle,
      loginWithGithub,
    }),
    [
      status,
      state.user,
      //
      login,
      logout,
      register,
      forgotPassword,
      loginWithGoogle,
      loginWithGithub,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
