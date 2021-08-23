import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'

const useStyles = makeStyles({
    root: {
        width: '80%',
        marginBottom: '1rem'
    },
    imageCard: {
        backgroundColor: '#D8D8D8'
    }
})

const Article = ({ id, name, link, description, image, deleteClickHandler, editClickHandler }) => {

    const classes = useStyles()

    // Only return an image componet if there is an image
    const cardImage = !image ? null :
        (
            <CardMedia
                component='img'
                alt={description}
                height='140'
                image={image}
                title={name}
                className={classes.imageCard}
            />)



    return (
        <Card className={classes.root}>
            <CardActionArea>
                {cardImage}
                <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                        {name}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <a href={link} target='_blank' rel='noreferrer'><Button size='small' color='primary'>
                    Go to Article
                </Button></a>
                <Button size='small' color='primary' onClick={() => deleteClickHandler(id)}>
                    Delete
                </Button>
                <Button size='small' color='primary' onClick={() => editClickHandler(id)}>
                    Edit
                </Button>
            </CardActions>
        </Card>
    )

}

export default Article
