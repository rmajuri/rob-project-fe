import React, { Fragment } from 'react'
import * as Yup from 'yup'
import { Button, InputLabel, FormGroup } from '@material-ui/core'
import CustomInput from './customInput'
import { Formik, Form, Field } from 'formik'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import './form.css';

const initialState = {
    name: '',
    link: '',
    description: ''
}

const useStyles = makeStyles({
    root: {
        width: '35%',
        marginBottom: "1rem",
        padding: ".5rem"
    },
    input: {
        width: "80%",
        marginBottom: "1rem"
    },
    buttons: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    header: {
        margin: "1rem 0 1rem 0"
    }
});

const ArticleForm = ({ articles, setArticles }) => {

    const classes = useStyles();

    return (
        <Fragment>
            <Formik initialValues={initialState}
                onSubmit={(values, actions) => {
                    const requestPost = {
                        ...values
                    };

                    console.log(requestPost);

                    fetch('http://127.0.0.1:8000/articles/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestPost),
                    })
                        .then(res => res.json())
                        .then((postResult) => {
                            setArticles([...articles, postResult])
                        })
                        .catch((err) => console.error(err));

                    actions.setSubmitting(false);
                    actions.resetForm();
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(60).required('Required'),
                    link: Yup.string().max(2000).url().required('Required'),
                    description: Yup.string().max(250).required('Required')
                })}>
                {
                    ({ isSubmitting, handleReset }) => (
                        <Fragment>
                            <Card className={classes.root}>
                                <Form>
                                    <Typography className={classes.header} gutterBottom variant="h5" component="h2">
                                        Add a New Article
                                    </Typography>
                                    <FormGroup>
                                        <InputLabel htmlFor="name">Name</InputLabel>
                                        <Field className={classes.input} name="name" type="text" component={CustomInput} />
                                    </FormGroup>

                                    <FormGroup>
                                        <InputLabel htmlFor="link">Link</InputLabel>
                                        <Field className={classes.input} name="link" type="url" component={CustomInput} />
                                    </FormGroup>

                                    <FormGroup >
                                        <InputLabel htmlFor="description">Description</InputLabel>
                                        <Field className={classes.input} name="description" type="text" component={CustomInput} />
                                    </FormGroup>

                                    <div className={classes.buttons}>
                                        <div>
                                            <Button type="reset" onClick={handleReset}>Clear</Button>
                                        </div>

                                        <div>
                                            <Button type="submit" disabled={isSubmitting}>Submit</Button>
                                        </div>
                                    </div>
                                </Form>
                            </Card>
                        </Fragment>
                    )
                }
            </Formik>
        </Fragment>);
};

export default ArticleForm