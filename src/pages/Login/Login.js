import React, { useState } from "react";
import {
  Link,
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Container,
  Box,
  Typography,
} from "@mui/material";
//import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";

import { FCheckbox, FormProvider, FTextField } from "../../organisms/form";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import { LoadingButton } from "@mui/lab";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    //const from = location.state?.from?.pathname || "/";
    let { email, password } = data;
    if (email === "test@gmail.com" && password === "123") {
      navigate("/");
    } else {
      reset();
      setError("errorMessage", {
        type: "custom",
        message: "Wrong username or password",
      });
    }
    // try {
    //   //   await auth.login({ email, password }, () => {
    //   //     navigate(from, { replace: true });
    //   //   });

    // } catch (error) {
    //   reset();
    //   setError("responseError", error);
    //   console.log(error);
    // }
  };
  console.log(errors.errorMessage);
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent:"center",
        height: "100vh",
        marginTop:10
      }}
    >
      <Box sx={{flexGrow:1,backgroundColor:"white", paddingX:5,width:"100%", paddingTop:5,height:"60%",boxShadow:"0px 0px 20px 34px rgba(0,0,0,0.1)",borderRadius:"16px"}}>
      <Typography variant="h3" sx={{marginBottom:"10px"}}>Login</Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {!!errors.responseError && (
              <Alert severity="error">{errors.responseError.message}</Alert>
            )}
            <Alert severity="info">
              Don’t have an account?{" "}
              <Link variant="subtitle2" component={RouterLink} to="/register">
                Get started
              </Link>
            </Alert>

            <FTextField name="email" label="Email address" />

            <FTextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <FCheckbox name="remember" label="Remember me" />
            <Link component={RouterLink} variant="subtitle2" to="/">
              Forgot password?
            </Link>
          </Stack>

          {errors.errorMessage ? (
            <Alert severity="error" style={{ marginBottom: "10px" }}>
              {errors.errorMessage.message}
            </Alert>
          ) : (
            ""
          )}
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </FormProvider>
      </Box>
    </Container>
  );
}

export default Login;
