import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      width: '80%',
      marginBottom: "1rem"
    },
  });

const Article = ({ id, name, link, description, deleteClickHandler, editClickHandler}) => {

    const classes = useStyles();

    

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <a href={link} target="_blank" rel="noreferrer"><Button size="small" color="primary">
          Go to Article
        </Button></a>
        <Button size="small" color="primary" onClick={() => deleteClickHandler(id)}>
          Delete
        </Button>
        <Button size="small" color="primary" onClick={() => editClickHandler(id)}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );

}

export default Article