import { Breadcrumbs, Container, Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import React, { useContext, useState } from "react";
import { CBPiContext } from "../data";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

const CBPiCard = ({item}) => {
  const classes = useStyles();

  return (
   
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {item?.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {item?.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Download
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
        <Button size="small" color="primary">
          Active
        </Button>
      </CardActions>
    </Card>
   
  );
};

const Plugins = () => {
  const classes = useStyles();
  const { state } = useContext(CBPiContext);

  const [filter, setFilter] = useState("")
 
  let plugins = state.plugins
  if(filter) {
    plugins  = state.plugins.filter(item => item.name.includes(filter) )
  }
  

  return (
    <Container maxWidth="lg" >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Plugins
          </Typography>
        </Grid>
        <Grid item>
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              value={filter}
              onChange={(e) => {setFilter(e.target.value)}}
              placeholder="Search CBPi Plugins"
              inputProps={{ "aria-label": "search plugins" }}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="textPrimary">Plugins</Typography>
      </Breadcrumbs>
      <Divider />

      <Grid container spacing={3} style={{ marginTop: 10 }}>
        {plugins.map((item) => (
          <Grid item sm={4}>
            <CBPiCard item={item} />
          </Grid>
        ))}
      </Grid>
      </Container>
  );
};

export default Plugins;
