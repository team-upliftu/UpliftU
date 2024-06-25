import {
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useLayoutEffect, useState } from "react";
import * as Yup from "yup";
import { styled } from '@mui/material/styles';

import { Link, useNavigate } from "react-router-dom";
import { FormikTextField } from "../../components/FormikTextField";
import { fetchAsyncLoginUser } from "./api";
import { useAuthContext } from "./AuthContext";
import Loading from "../../components/Loading";

const TextArea = styled('div')({
  fontSize: '17.5px',
  fontWeight: 'bold',
  color: '#333333',
  paddingLeft: "5vw",
  marginTop: "5vw",
  marginBottom: "1vw",
});

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// サインインを実装します。
export const Signin: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth, isLoading, signin } = useAuthContext();
  const [loginError, setLoginError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (state) => {
      try {
        // ログインAPIリクエストを送信
        const response = await fetchAsyncLoginUser(state.email, state.password);
        // console.log(response.user);
        // ログイン成功時にsigninを呼び出してisAuthをtrueに設定
        signin(response.user);
        // ホーム画面にリダイレクト
        navigate("/");
      } catch (error: any) {
        setLoginError(error.detail || "Signin failed. Please try again.");
      }
    },
  });

  useLayoutEffect(() => {
    // isAuthの変更を監視し、ログイン済みの場合はホーム画面にリダイレクト
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  // ローディング中の場合はLoadingコンポーネントを表示
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
          paddingTop: "25vh",
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
          ログイン
        </Typography>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Stack>
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
              ログイン
            </Button>
            {loginError && (
              <div style={{ color: "red", marginTop: "10px" }}>
                {loginError}
              </div>
            )}
            <Typography sx={{
              textAlign: "center",
              fontSize: '15px',
              fontWeight: "bold",
            }}>
              アカウントをお持ちですか？ <Link to={"/signup"}>アカウント作成</Link>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Grid>
  );
};

export default Signin;
