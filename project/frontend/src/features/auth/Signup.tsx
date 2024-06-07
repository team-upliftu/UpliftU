import {
    Avatar,
    Box,
    Button,
    Grid,
    Paper,
    Stack,
    Typography,
  } from "@mui/material";
import { useFormik } from "formik";
import React, { useLayoutEffect } from "react";
import * as Yup from "yup";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import Loading from "../../components/Loading";
import { FormikTextField } from "../../components/FormikTextField";
import { fetchAsyncSignup } from "./api";

// ユーザーを作成するためのサインアップフォームを実装します。
const Signup: React.FC = () => {
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
    <Grid sx={{ width: "100vw" }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          height: "100%",
          width: "360px",
          m: "20px auto",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "50px", marginTop: "20px" }}>
        <img
      src="https://raw.githubusercontent.com/flatp/yuruimage/main/logo.png"
      alt="Sample Image"
      style={{
        position: 'fixed',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100px',
        height: 'auto',
        zIndex: 1000 
      }}
    />
        </Box>
        <Typography>Signup</Typography>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <FormikTextField
              name="userName"
              label="Username *"
              variant="standard"
              formik={formik}
            />
            <FormikTextField
              name="email"
              label="Email *"
              variant="standard"
              formik={formik}
            />
            <FormikTextField
              name="password"
              label="Password *"
              variant="standard"
              type="password"
              autoComplete="new-password"
              formik={formik}
            />
            <FormikTextField
              name="confirmPassword"
              label="Confirm Password *"
              variant="standard"
              type="password"
              autoComplete="new-password"
              formik={formik}
            />
            <Button fullWidth variant="contained" type="submit">
              Submit
            </Button>
            <Link to={"/signin"}>Or Sign in</Link>
          </Stack>
        </form>
      </Paper>
    </Grid>
  );
};

export default Signup;