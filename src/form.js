import React, { Fragment } from 'react'
import * as Yup from 'yup'
import { Button, InputLabel, FormGroup } from '@material-ui/core'
import CustomInput from './customInput'
import { Formik, Form, Field } from 'formik'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import './form.css';

let initialState = {
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

const ArticleForm = ({ articles, setArticles, isPost, setIsPost, selectedArticle, setSelectedArticle }) => {

    const classes = useStyles();

    if (!isPost) {
        initialState = articles.find(article => article.id === selectedArticle)
        console.log(selectedArticle)
        console.log('INITIAL STATE', initialState)
    } else {
        initialState = {
            name: '',
            link: '',
            description: ''
        }
    }

    const formTitle = isPost ? 'Add a New Article' : `Edit ${(articles.find(article => article.id === selectedArticle).name)}`

    const handleClearClick = clearFunction => {

        if (!isPost) {
            setIsPost(true)
            setSelectedArticle(null)
        }
        // clearFunction()
    }

    return (
        <Fragment>
            <Formik initialValues={initialState}
                enableReinitialize={true}
                onSubmit={isPost ? (values, actions) => {
                    const requestPost = {
                        ...values
                    };

                    console.log(requestPost);

                    fetch('http://127.0.0.1:8000/api/articles/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestPost),
                    })
                        .then(res => res.json())
                        .then((postResult) => {
                            setArticles([...articles, postResult])
                            console.log('POST')
                        })
                        .catch((err) => console.error(err));

                    actions.setSubmitting(false);
                    actions.resetForm();
                } :
                    (values, actions) => {
                        const requestPut = {
                            ...values
                        };

                        console.log(requestPut);

                        const url = `http://127.0.0.1:8000/api/articles/${selectedArticle}/`

                        fetch(url, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(requestPut),
                        })
                            .then(res => res.json())
                            .then((putResult) => {
                                const nonUpdatedArticles = articles.filter(article => article.id !== selectedArticle)
                                setArticles([...nonUpdatedArticles, putResult])
                                console.log('PUT')
                            })
                            .catch((err) => console.error(err));

                        setIsPost(true)
                        setSelectedArticle(null)
                        actions.setSubmitting(false);
                        actions.resetForm();
                    }

                }
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(60).required('Required'),
                    link: Yup.string().max(2000).url().required('Required'),
                    description: Yup.string().max(250).required('Required')
                })}>
                {
                    ({ values, isSubmitting, handleReset }) => (
                        <Fragment>
                            <Card className={classes.root}>
                                <Form>
                                    <Typography className={classes.header} gutterBottom variant="h5" component="h2">
                                        {isPost ? formTitle : <i>{formTitle}</i>}
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
                                            <Button type="reset" onClick={() => handleClearClick(handleReset)}>Clear</Button>
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