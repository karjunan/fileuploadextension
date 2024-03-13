import React from 'react';
import { Modal } from './components/Modal';
import { convertFileToBase64 } from './utils/file.utils';
import { uploadFileAPI } from './service/upload.service';
import { Input } from './components/Input';
import { Button } from './components/Button';

import cn from './App.module.css';

const DEFAULT_WIDGET_POSITION = { top: '20px', right: '20px' };

function App() {
  const [showForm, setShowForm] = React.useState(false);
  const [formSuccess, setFormSuccess] = React.useState<null | boolean>(null);
  const [errorMessage, setError] = React.useState<string>('');

  const toggleModalOpen = () => setShowForm((prev) => !prev);
  const getPositionStyle = () => {
    const positionDataString = window.localStorage.getItem('widget');
    console.log({ positionDataString });
    const positionObject = positionDataString
      ? Object.entries(JSON.parse(positionDataString)).reduce(
          (acc, [, value]) => {
            if (!acc) return acc;
            if (!(value !== 0 && !value)) return false;
            return true;
          },
          true
        )
        ? DEFAULT_WIDGET_POSITION
        : JSON.parse(positionDataString)
      : DEFAULT_WIDGET_POSITION;
    return Object.fromEntries(
      Object.entries(positionObject).filter(([, value]) => value)
    );
  };

  const onFormSuccess = () => {
    setFormSuccess(true);
    setShowForm(false);
  };
  const onFormFail = (message: string) => {
    setError(message);
  };

  return (
    <div className='extension' style={getPositionStyle()}>
      <button onClick={toggleModalOpen}>Click Me</button>
      <Modal show={showForm} onClose={toggleModalOpen} close>
        <Form onFormSucces={onFormSuccess} onFormFail={onFormFail} />
      </Modal>
      {formSuccess && <SuccessPopup />}
      {formSuccess === false && <ErrorPopup error={errorMessage} />}
    </div>
  );
}

export default App;

function Form(props: {
  onFormSucces: () => void;
  onFormFail: (arg: string) => void;
}) {
  const [file, setFile] = React.useState<File | null>(null);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileExists = e.target?.files?.length ? true : false;
    if (fileExists) setFile(e.target?.files?.[0] ?? null);
  };
  const onSubmit = async () => {
    if (!file) return;
    const fileBase64String = await convertFileToBase64(file);
    const { isError } = await uploadFileAPI(fileBase64String);
    if (!isError) return props.onFormSucces();
    props.onFormFail('Failed');
  };

  return (
    <div className={cn.formWrapper}>
      <div className={cn.formTitle}>
        <span>Title</span>
      </div>
      <div className={cn.form}>
        <div className={cn.formItem}>
          <label className={cn.visuallyHidden} htmlFor='upload'>
            Upload File
          </label>
          <Input id='upload' type='file' onChange={onChangeFile} />
        </div>
      </div>
      <div className={cn.formFooter}>
        <Button
          className={cn.button}
          type='submit'
          onClick={onSubmit}
          disabled={!file}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

function SuccessPopup() {
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 2000);
  }, []);

  return (
    <Modal
      className={cn.successModal}
      show={show}
      onClose={() => setShow(false)}
    >
      <div className={cn.successText}>Upload Success!</div>
    </Modal>
  );
}

function ErrorPopup(props: { error: string }) {
  const [show, setShow] = React.useState(true);

  return (
    <Modal
      className={cn.errorModal}
      show={show}
      onClose={() => setShow(false)}
      close
    >
      <div className={cn.errorText}>
        <p>Upload Failed!</p>
        <p>{props.error}</p>
      </div>
    </Modal>
  );
}
