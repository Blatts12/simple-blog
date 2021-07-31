import React from "react";
import { Button, ButtonGroup, ButtonToolbar, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loadFeed } from "../../../redux/actions/feed";

const FeedToolbar = ({ prevLink, currentLink, nextLink }) => {
  const dispatch = useDispatch();

  const getPageNumber = (urlString) => {
    try {
      const url = new URL(urlString);
      const params = new URLSearchParams(url.search);

      return params.get("page") || "1";
    } catch {
      return "1";
    }
  };

  return (
    <Container>
      <ButtonToolbar>
        <ButtonGroup>
          {prevLink && (
            <Button variant="dark" onClick={() => dispatch(loadFeed(prevLink))}>
              {getPageNumber(prevLink)}
            </Button>
          )}
          {currentLink && (
            <Button variant="secondary">{getPageNumber(currentLink)}</Button>
          )}
          {nextLink && (
            <Button variant="dark" onClick={() => dispatch(loadFeed(nextLink))}>
              {getPageNumber(nextLink)}
            </Button>
          )}
        </ButtonGroup>
      </ButtonToolbar>
    </Container>
  );
};

export const MemoziedFeedToolbar = React.memo(FeedToolbar);
export default FeedToolbar;
