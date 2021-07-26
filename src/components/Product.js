import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import {useContext, useState} from "react";
import ProductsContext from "../context/ProductsContext";
import {makeStyles} from "@material-ui/core/styles";
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TextField from "@material-ui/core/TextField";
import GenerateId from "../common/GenerateId";
import * as moment from 'moment';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const useStyles = makeStyles(() => ({
  media: {height: 0, paddingTop: '56.25%', backgroundSize: 'contain'}
}));

const Product = props => {
  const {data, details} = props;
  const {removeProduct, updateProduct} = useContext(ProductsContext);
  const classes = useStyles();
  const [comment, setComment] = useState('');

  const deleteComment = id => () => {
    const copy = JSON.parse(JSON.stringify(data));
    const find = copy.comments.find(el => el.id === id);
    const index = copy.comments.indexOf(find);
    copy.comments.splice(index, 1);
    updateProduct(copy);
  };

  const addComment = e => {
    if (e.code === 'Enter' && comment.trim()) {
      const copy = JSON.parse(JSON.stringify(data));
      copy.comments.unshift({
        id: GenerateId(),
        productId: copy.id,
        description: comment.trim(),
        date: moment().format('HH:mm DD.MM.yyyy')
      });

      updateProduct(copy);
      setComment('');
    }
  };

  const DeleteProduct = id => event => {
    event.preventDefault();
    const value = window.confirm('Delete product?');

    if (value) {
      removeProduct(id);
    }
  };

  return (
    <Card>
      <CardHeader title={data.name} subheader={`Count: ${data.count}`} action={
        !details && <IconButton color="secondary" onClick={DeleteProduct(data.id)}><DeleteIcon/></IconButton>
      }/>

      <CardMedia image={data.imageUrl} title={data.name} className={classes.media}/>

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{data.description}</Typography>
        {details && (
          <>
            <Typography color="textSecondary">width: {data.size.width}</Typography>
            <Typography color="textSecondary">height: {data.size.height}</Typography>
            <Typography color="textSecondary">weight: {data.weight}</Typography>
          </>
        )}
      </CardContent>

      <Collapse in={details} timeout="auto" unmountOnExit>
        <div className="m_12">
          <TextField label="Add a public comment..." multiline maxRows={4} value={comment} onKeyPress={addComment}
                     onChange={e => setComment(e.target.value)} fullWidth/>
        </div>

        <List disablePadding>
          {data.comments.map(item => (
            <ListItem alignItems="flex-start" divider key={item.id}>
              <ListItemAvatar><Avatar/></ListItemAvatar>
              <ListItemText primary={item.description} secondary={item.date}/>
              <ListItemSecondaryAction>
                <IconButton edge="end" color="secondary" onClick={deleteComment(item.id)}><DeleteIcon/></IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Card>
  );
};

export default Product;
