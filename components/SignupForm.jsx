import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { signIn } from 'next-auth/client';


const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email field is required')
})

const SignupForm = () => {
    return(
        <Formik
            validationSchema={schema}
            initialValues={{
                email: "",
            }} 
            onSubmit={(values, { setSubmitting }) => {
                signIn("email",{email:values.email});
              }}
        >
        {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors
        })=>(
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                    <Form.Text className="text-danger">{touched.email && errors.email ? errors.email : null}</Form.Text>
                </Form.Group>
                <Button variant="danger" type="submit" block>
                    Register
                </Button>
                </Form>
        )}
        </Formik>
    )
}

export default SignupForm;
