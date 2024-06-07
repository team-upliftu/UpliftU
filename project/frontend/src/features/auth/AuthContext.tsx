import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchAsyncTokenRefresh, fetchAsyncTokenVerify } from "./api";
import useSessionStorage from "../components/hooks/useSessionStorage";

// AuthContextの型を定義
interface AuthContextProps {
  isAuth: boolean;    // isAuth: ユーザーが認証されているかどうかを示すブール値
  isLoading: boolean;   // isLoading: 認証状態の読み込み中かどうかを示すブール値
  signin: (user: any) => void;   // signin: ユーザーがログインした時に呼び出される関数
  signout: () => void;    // signout: ユーザーがログアウトした時に呼び出される関数
  user: any | null;
}

const AuthContext = createContext<AuthContextProps>({
  isAuth: false,
  isLoading: true,
  signin: () => {},
  signout: () => {},
  user: null,
});

// useAuthContextフックを定義しています。
// このフックを使用することで、コンポーネント内でAuthContextの値を簡単に取得できます。
// useContext関数を使用して、AuthContextの現在の値を返します。
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// 認証状態を管理するためのコンテキスト（AuthContext）とプロバイダ（AuthProvider）を定義します。
// アプリケーション全体でユーザーの認証状態を管理し、認証が必要なコンポーネントで簡単に認証状態に基づいたレンダリングやリダイレクトを行うことができます。
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useSessionStorage<any | null>('user', null);

  // ユーザーがログインした時に呼び出される関数
  const signin = (loggedInUser: any) => {
    setIsAuth(true);
    setUser(loggedInUser);
    console.log("aaaa");
    console.log(user);
  };

  // ユーザーがログアウトした時に呼び出される関数
  const signout = () => {
    setIsAuth(false);
    setUser(null);
  };

  // useEffect フックは、コンポーネントがマウントされた後、または指定された依存関係の値が変更された後に実行される副作用関数を定義するために使用されます。
  // useEffect内で、ユーザーの認証状態を確認するための非同期関数を定義しています。
  useEffect(() => {
    const verifyUser = async () => {
      // アクセストークンを使用してユーザー情報を取得するAPIリクエスト
      try {
        const response = await fetchAsyncTokenVerify();

        // ローディング状態を false に設定し、ユーザーが認証されたことを示すために isAuth を true に設定
        setIsLoading(false);
        setIsAuth(true);

        return response;
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          try {
            // リフレッシュトークンを使用して新しいアクセストークンを取得
            await fetchAsyncTokenRefresh();
            // 新しいアクセストークンでユーザー情報取得のリクエストを再試行
            const retryResponse = await fetchAsyncTokenVerify();

            // リトライが成功した場合、ローディング状態を false に設定し、ユーザーが認証されたことを示すために isAuth を true に設定
            setIsLoading(false);
            setIsAuth(true);

            return retryResponse;
          } catch (error: any) {
            // リトライが失敗した場合、ローディング状態を false に設定し、ユーザーが認証されていないことを示すために isAuth を false に設定
            setIsLoading(false);
            setIsAuth(false);
          }
        } else {
          setIsLoading(false);
          setIsAuth(false);
        }
      }
    };

    // verifyUser関数を呼び出して、ユーザーの認証状態を確認します。
    verifyUser();
  }, []);

  // AuthContextのプロバイダを返します。
  // value属性に、現在の認証状態（isAuth）、ローディング状態（isLoading）、signinとsignout関数を渡しています。
  // これにより、子コンポーネントからAuthContextの値を参照できるようになります。
  return (
    <AuthContext.Provider value={{ isAuth, isLoading, signin, signout, user }}>
      {children}
    </AuthContext.Provider>
  );
};