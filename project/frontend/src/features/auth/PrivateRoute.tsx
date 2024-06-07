import React from "react";
import { useAuthContext } from "./AuthContext";
import Loading from "../../components/Loading";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: React.ReactElement;
}

// 認証されたユーザーのみがアクセスできるようするためにプライベートルートを実装します。これはAuthContextで認証されている場合のみ、任意のコンポーネントにアクセスでき、認証されていない場合はSigninページにリダイレクトされます。
export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { isAuth, isLoading } = useAuthContext();
  if (isLoading) {
    return <Loading />;
  }

  if (isAuth) {
    return element;
  }

  return <Navigate to="/signin" />;
};