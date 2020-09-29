import { Box, Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react'
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { ErrorMap } from '../utilis/toErrormap';

interface loginProps {

}

const login: React.FC<loginProps> = ({}) => {
    const [,login] = useLoginMutation()
    const router = useRouter()
    return (
        <Wrapper variant="small">
        <Head>
            <title>Register Page</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={ async(values,{setErrors}) => {
            const response = await login({options: values});
            if(response.data?.login.errors) {
              setErrors(ErrorMap(response.data.login.errors))
            }else{
              router.push('/')
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
            
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
}
export default login