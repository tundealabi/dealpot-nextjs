import { Modal, Button, Row, Col, Container } from 'react-bootstrap';
import { signIn } from "next-auth/client";
import LoginForm from './LoginForm';
import style from './modalForm.module.css';
import SignupForm from './SignupForm';

const FormBody = ({formContent, displayFormContent}) => {
  if(formContent === 'login'){
      return(
        <div>
        <div className={style.headerLogin}>
          <p>Log in</p>
          <Button className="rounded-pill" variant="outline-dark" onClick={()=>displayFormContent("signup")}>Sign up</Button>
        </div>
        <LoginForm />
      </div>
      )
  }else if(formContent === 'signup'){
    return(
        <>
        <h4>Create your account</h4>
        <p className="text-muted">Get started by creating your account</p>
        <SignupForm />
        <p className="text-center">Already have an account? <span role="button" className="text-danger" onClick={()=>displayFormContent("login")}>Login</span></p>
        </>
    )
  }
}

function ModalForm({show, onHide, formContent, displayFormContent, size}) {
    return (
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size={size}
      >
        <Modal.Body >
        <Container>
          <FormBody  formContent={formContent} displayFormContent={displayFormContent}/>
          <div className={style.separator}></div>
        <Button variant="outline-dark" block className={style.googleBtn} onClick={()=>signIn("google")}>
          <img src="/google_icon.svg" alt="google icon" className={style.googleImg}/>
          <span>Continue with Google</span>
          </Button>
        </Container>
      </Modal.Body>
      </Modal>
    );
  }
  export default ModalForm;