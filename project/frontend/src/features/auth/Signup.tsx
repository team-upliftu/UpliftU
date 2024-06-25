import {
    Button,
    Grid,
    Paper,
    Stack,
    Typography,
  } from "@mui/material";
import { useFormik } from "formik";
import React, { useLayoutEffect } from "react";
import * as Yup from "yup";
import { styled } from '@mui/material/styles';

import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import Loading from "../../components/Loading";
import { FormikTextField } from "../../components/FormikTextField";
import { fetchAsyncSignup } from "./api";

const TextArea = styled('div')({
  fontSize: '17.5px',
  fontWeight: 'bold',
  color: '#333333',
  paddingLeft: "5vw",
  marginTop: "5vw",
  marginBottom: "1vw",
});

// ユーザーを作成するためのサインアップフォームを実装します。
export const Signup: React.FC = () => {
  const { isAuth, isLoading } = useAuthContext();
  const navigate = useNavigate();

  // フォームのバリデーションスキーマを定義します。
  // 各フィールドに対して必須チェックや文字数制限などのバリデーションルールを設定します。
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("First Name is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  // useFormikを使用してフォームの状態とバリデーションを管理します。
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "", // 確認用パスワードフィールドを追加
    },
    validationSchema,
    // フォーム送信時の処理を定義します。
    onSubmit: async (state) => {
      // サインアップAPIを呼び出して、ユーザーを作成します。
      await fetchAsyncSignup(state);
      navigate("/");
    },
  });

  // useLayoutEffectを使用して、ユーザーがすでに認証済みの場合はホーム画面にリダイレクトします。
  useLayoutEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  // ローディング中の場合は、Loadingコンポーネントを表示します。
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Grid container sx={{
      height: "100vh",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100vw",
          height: "100vh",
          paddingTop: "12.5vh",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#FB5555",
            fontSize: "30px",
            fontWeight: "bold",
            textAlign: "left",
            marginBottom: "30px",
            paddingLeft: "5vw",
          }}
        >
          アカウントを<br/>作成
        </Typography>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Stack>
            <TextArea>名前</TextArea>
            <FormikTextField
              name="userName"
              label=""
              variant="standard"
              formik={formik}
            />
            <TextArea>メールアドレス</TextArea>
            <FormikTextField
              name="email"
              label=""
              variant="standard"
              formik={formik}
            />
            <TextArea>パスワード</TextArea>
            <FormikTextField
              name="password"
              label=""
              variant="standard"
              type="password"
              autoComplete="new-password"
              formik={formik}
            />
            <TextArea>パスワード (確認用)</TextArea>
            <FormikTextField
              name="confirmPassword"
              label="C"
              variant="standard"
              type="password"
              autoComplete="new-password"
              formik={formik}
            />
            <Button variant="contained" type="submit" sx={{
              backgroundColor: "#FD8A8A",
              width: "60vw",
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#333',
              borderRadius: '20px',
              padding: '9px',
              margin: "auto",
              marginTop: "10vw",
              marginBottom: "5vw",
              }}>
              アカウント作成
            </Button>
            <Typography sx={{
              textAlign: "center",
              fontSize: '15px',
              fontWeight: "bold",
            }}>
              アカウントをお持ちですか？ <Link to={"/signin"}>ログイン</Link>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Grid>
  );
};

export default Signup;