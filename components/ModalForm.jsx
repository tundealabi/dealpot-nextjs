import { Modal, Button, Row, Col, Container } from 'react-bootstrap';
import { signIn } from "next-auth/client";
// import LoginForm from './LoginForm';
import style from '../styles/ModalForm.module.css';
// import SignupForm from './SignupForm';

const FormBody = ({formContent, displayFormContent, handleModal}) => {
  if(formContent === 'login'){
      return(
        <div>
        <div className={style.headerLogin}>
          <p>Log in</p>
          <Button className="rounded-pill" variant="outline-dark" onClick={()=>displayFormContent("signup")}>Sign up</Button>
          <span className={style.closeIcon} onClick={handleModal}><i className="far fa-times-circle"></i></span>
        </div>
        {/* <LoginForm /> */}
      </div>
      )
  }else if(formContent === 'signup'){
    return(
        <>
        <div className={style.headerLogin}>
          <h4>Create your account</h4>
          <span className={style.closeIcon} onClick={handleModal}><i className="far fa-times-circle"></i></span>
        </div>
        <p className="text-muted">Get started by creating your account</p>
        {/* <SignupForm /> */}
        <p className="text-center">Already have an account? <span role="button" className="text-danger" onClick={()=>displayFormContent("login")}>Login</span></p>
        </>
    )
  }
}

function ModalForm({show, onHide, formContent, displayFormContent, size, handleModal}) {
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
          <FormBody  formContent={formContent} displayFormContent={displayFormContent} handleModal={handleModal}/>
          {formContent === "signup" && <div className={style.separator}></div>}
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