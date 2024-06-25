import axios from "axios";
import { SignupUser } from "./types";

// Django側で実装したエンドポイントにリクエストを送るための、APIリクエストを実装します。

// ログインユーザーを非同期で取得するAPIリクエスト
export const fetchAsyncLoginUser = async (email: string, password: string) => {
  try {
    console.log('Login request data:', { email, password });  // デバッグメッセージ
    const response = await axios.post(
      `http://localhost:8000/api/auth/login/`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,    // クッキーを含めるためのオプション
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);  // デバッグメッセージ
    throw error.response?.data || error.message;
  }
};


// ログアウトユーザーを非同期で処理するAPIリクエスト
export const fetchAsyncLogoutUser = async () => {
  try {
    await axios.post(
      `http://localhost:8000/api/auth/logout/`,
      {}, // 空のPOSTリクエストを使用
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  } catch (error: any) {
    throw error.response.data;
  }
};

// トークンの検証を非同期で行うAPIリクエスト
export const fetchAsyncTokenVerify = async () => {
  const response = await axios.post(
    "http://localhost:8000/api/auth/verify/",
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// トークンのリフレッシュを非同期で行うAPIリクエスト
export const fetchAsyncTokenRefresh = async () => {
  await axios.post(
    "http://localhost:8000/api/auth/refresh/",
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
};

// サインアップユーザーを非同期で登録するAPIリクエスト
export const fetchAsyncSignup = async (props: SignupUser) => {
  const formedData = {
    user_name: props.user_name, // user_nameに変更
    email: props.email,
    password: props.password,
    re_password: props.confirmPassword,
  };
  try {
    console.log('おしりおしり');
    console.log(formedData);
    const response = await axios.post("http://localhost:8000/api/auth/users/", JSON.stringify(formedData), {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log('Signup successful:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axiosエラーの場合のハンドリング
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Status code:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else {
        console.error('Error message:', error.message);
      }
    } else {
      // 予期しないエラーの場合のハンドリング
      console.error('Unexpected error:', error);
    }
  }
};
