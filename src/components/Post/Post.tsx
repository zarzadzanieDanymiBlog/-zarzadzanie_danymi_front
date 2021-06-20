import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "components/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import Link from "next/link";

export interface PostProps {
  title: string;
  content: string;
  date: string;
  id: string;
  imageLink: string;
}

const Post = ({ content, date, title, id, imageLink }: PostProps) => {
  return (
    <Card>
      <CardMedia
        image={imageLink}
        title="Contemplative Reptile"
        style={{ height: 240 }}
      />
      <CardContent>
        <Box mb={2}>
          <Typography variant="h6">
            {title.length > 25 ? `${title.slice(0, 25)} ...` : title}
          </Typography>
        </Box>
        <Typography>
          {content.length > 25 ? `${content.slice(0, 25)} ...` : content}
        </Typography>
        <Box display="flex" justifyContent="flex-end" width="100%" mt={1}>
          <Typography variant="subtitle2" color="textSecondary">
            dodano: {new Date(date).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Box display="flex" justifyContent="flex-end" width="100%">
          <Link href={`/posts/${id}`}>
            <Button color="primary" component="a">
              Więcej
            </Button>
          </Link>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Post;
