import React, { useState } from "react";
import {
  Link,
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Container,
  Typography,
  Box,
} from "@mui/material";
import FUploadAvatar from "../../organisms/form/FUploadAvatar";
import FTextField from "../../organisms/form/FTextField";

import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  FMultiCheckbox,
  FRadioGroup,
  FSelect,
  FUploadImage,
} from "../../organisms/form";
import { fData } from "../../utils/numberFormat";
import useAuth from "../../hooks/useAuth";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  role: "user",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcazeHuAcZDzv4_61fPLT-S00XnaKXch2YWQ&s"
};

function RegisterPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const { name, email, password, image, role } = data;
    try {
      await auth.register({ name, email, password, image, role }, () => {
        navigate("/", { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };
  const handleDrop = React.useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  return (
    <Container 
    maxWidth={{xs: "90%", md:"25%", lg:"80%" }} 
    sx={{display: "flex", alignItems: "center", justifyContent:"center", height:"100vh"}}>
      <Box sx={{flexGrow:1,backgroundColor:"white", paddingX:5,width:"100%", paddingTop:5,height:"80%",boxShadow:"0px 0px 20px 34px rgba(0,0,0,0.1)",borderRadius:"16px", paddingBottom:"40px"}}>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} sx={{height: "100%"}}>
          <Stack spacing={3} direction={{ xs: 'column', lg: 'row' }} sx={{ alignItems: "center", height:"70vh", justifyContent:"center" }}>
            <div style={{display:"flex", justifyContent:"flex-start", height:"50%"}}>
            <FUploadAvatar
            name="image"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: "auto",
                    display: "block",
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
            </div>
            <div style={{maxWidth:"50vh",display: "flex", alignItems: "center", justifyContent:"center",flexDirection:"column", flex:"1",height:"100%" }}>
            <FTextField name="name" label="Full name" />
            <FTextField name="email" label="Email address"sx={{marginTop:"20px"}}  />
            <FTextField
            sx={{marginTop:"20px"}}
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
            <FTextField
            sx={{marginTop:"20px"}}
              name="passwordConfirmation"
              label="Password Confirmation"
              type={showPasswordConfirmation ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPasswordConfirmation(!showPasswordConfirmation)
                      }
                      edge="end"
                    >
                      {showPasswordConfirmation ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FRadioGroup
            sx={{marginTop:"20px"}}
              name="role"
              label="Role"
              options={["user", "manager"]}
            ></FRadioGroup>
            {!!errors.responseError && (
              <Alert severity="error">{errors.responseError.message}</Alert>
            )}
            <Alert severity="info">
              Already have an account?{" "}
              <Link variant="subtitle2" component={RouterLink} to="/login">
                Sign in
              </Link>
            </Alert>

            <LoadingButton
            sx={{marginTop:"20px"}}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Register
            </LoadingButton>
            </div>
          </Stack>
        </form>
      </FormProvider>
      </Box>
    </Container>
  );
}

export default RegisterPage;
