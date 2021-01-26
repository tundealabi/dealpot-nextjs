import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email field is required'),
    password: Yup.string().required('Password field is required')
})

const LoginForm = () => {
    return(
        <Formik
            validationSchema={schema}
            initialValues={{
                email: "",
                password:""
            }} 
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
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

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur}/>
                    <Form.Text className="text-danger">{touched.password && errors.password ? errors.password : null}</Form.Text>
                </Form.Group>
                <Button variant="danger" type="submit" block>
                    Submit
                </Button>
                </Form>
        )}
        </Formik>
    )
}

export default LoginForm;
