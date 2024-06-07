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
import React, { useLayoutEffect, useState } from "react";
import * as Yup from "yup";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { FormikTextField } from "../../components/FormikTextField";
import { fetchAsyncLoginUser } from "./api";
import { useAuthContext } from "./AuthContext";
import Loading from "../../components/Loading";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// サインインを実装します。
const Signin: React.FC = () => {
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
        <Typography>Signin</Typography>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
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
              formik={formik}
            />
            <Button fullWidth variant="contained" type="submit">
              Signin
            </Button>
            {loginError && (
              <div style={{ color: "red", marginTop: "10px" }}>
                {loginError}
              </div>
            )}
            <Link to={"/signup"}>Create account</Link>
          </Stack>
        </form>
      </Paper>
    </Grid>
  );
};

export default Signin;