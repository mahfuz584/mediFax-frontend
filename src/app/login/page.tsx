"use client";
import BrandLogo from "@/components/shared/BrandLogo";
import { signInItems } from "@helper/data/formFields/register/registerFields";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Grid2,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { rawDataServerActions } from "services/actions";
import { getUserInfo, storeUserInfo } from "services/auth.service";
import { toast } from "sonner";
import z from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

const LoginPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "mahfuz584@gmail.com",
      password: "mahfuz584",
    },
    resolver: zodResolver(signInSchema),
  });
  const onSubmit: SubmitHandler<FieldValues> = async (values: any) => {
    const res = await rawDataServerActions("/auth/login", values);
    if (res.success) {
      toast.success(res.message || "Login Successful");
      router.push(`/dashboard/${getUserInfo()?.role}`);
      reset();
      if (res?.data?.accessToken) {
        storeUserInfo(res?.data?.accessToken);
      }
    } else {
      toast.error(res.message || "Something went wrong");
    }
  };
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          "& img": {
            objectFit: "cover",
            width: "100%",
            height: "100vh",
          },
        }}
      >
        <Image
          src="/images/register/regBg.jpg"
          alt="bg"
          width={1000}
          height={1000}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: "rgb(0 0 0 / 40%)",
        }}
      />
      <Container
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid2
          container
          sx={{
            justifyContent: "center",
            minHeight: "100vh",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Grid2
            sx={{
              p: 5,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              borderRadius: 2,
              backgroundColor: "#fff",
            }}
            size={{
              xs: 8,
            }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{
                mt: 1,
                position: "relative",
                textDecoration: "none",
                width: "fit-content",
                mx: "auto",
              }}
            >
              <BrandLogo color="#000" text={true} />
            </Stack>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid2
                container
                justifyContent="space-between"
                sx={{
                  rowGap: 4,
                  width: "100%",
                }}
              >
                {signInItems?.map(({ name, label, type, placeholder }, idx) => {
                  return (
                    <Grid2 key={idx} size={{ xs: 12, md: 5.9 }}>
                      <Controller
                        name={name as any}
                        control={control}
                        render={({ field, fieldState }) => {
                          return (
                            <>
                              {type === "password" ? (
                                <TextField
                                  {...field}
                                  slotProps={{
                                    input: {
                                      endAdornment:
                                        type === "password" ? (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={handleClickShowPassword}
                                              edge="end"
                                            >
                                              {showPassword ? (
                                                <MdVisibility />
                                              ) : (
                                                <MdVisibilityOff />
                                              )}
                                            </IconButton>
                                          </InputAdornment>
                                        ) : null,
                                    },
                                  }}
                                  size="small"
                                  fullWidth
                                  label={label}
                                  type={showPassword ? "text" : "password"}
                                  placeholder={placeholder}
                                  error={!!fieldState.error}
                                  helperText={fieldState.error?.message}
                                />
                              ) : (
                                <TextField
                                  {...field}
                                  size="small"
                                  fullWidth
                                  label={label}
                                  type={type}
                                  placeholder={placeholder}
                                  error={!!fieldState.error}
                                  helperText={fieldState.error?.message}
                                />
                              )}
                            </>
                          );
                        }}
                      />
                    </Grid2>
                  );
                })}
              </Grid2>
              <Button
                type="submit"
                sx={{
                  borderRadius: 1.5,
                  mt: 4,
                  width: "100%",
                  bgcolor: "bg.semiBlue",
                }}
              >
                Register
              </Button>
            </form>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Link href={"/forgot-password"}>
                <Typography
                  sx={{
                    width: "fit-content",
                    display: "inline-flex",
                    textAlign: "end",
                    pt: 3,
                    color: "text.textGray",
                    cursor: "pointer",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot Password
                </Typography>
              </Link>
            </Box>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="end"
              gap={1}
              mt={2}
              color={"text.textGray"}
            >
              <Typography variant="body1" className="text-center">
                {"Don't Have an account?"}
              </Typography>
              <Link href="/register">
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.semiBlue",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Create Account
                </Typography>
              </Link>
            </Stack>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default LoginPage;
