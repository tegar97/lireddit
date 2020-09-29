import React from "react";
import { Formik, Form } from "formik";
import {
  
  Box,
  Button,
} from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import Head from 'next/head'
import { useMutation } from "urql";
import { useRegisterMutation } from "../generated/graphql";
import { ErrorMap } from "../utilis/toErrormap";
import { useRouter } from 'next/router'
import {Tes} from './styles'
interface registerProps {}

const REGISTER_MUT = `

`;
const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter()

  const [,register] = useRegisterMutation();
  return (
  
    <Wrapper variant="small">
      <Head>
          <title>Register Page</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={ async(values,{setErrors}) => {
          const response = await register(values);
          if(response.data?.register.errors) {
            setErrors(ErrorMap(response.data.register.errors))
          }else{
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Tes>Login</Tes>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;