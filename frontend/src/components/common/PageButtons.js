import React from "react";
import { Button, ButtonGroup, ButtonToolbar, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loadFeed } from "../../redux/actions/feed";

const PageButtons = ({
  prevLink,
  currentLink,
  nextLink,
  loadingFunc,
  elementId = null,
}) => {
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
    <Container className="d-flex justify-content-center">
      <ButtonToolbar>
        <ButtonGroup>
          {prevLink && (
            <Button
              variant="dark"
              onClick={() => {
                if (elementId) dispatch(loadingFunc(elementId, prevLink));
                else dispatch(loadingFunc(prevLink));
              }}
            >
              {getPageNumber(prevLink)}
            </Button>
          )}
          {currentLink && (
            <Button variant="secondary">{getPageNumber(currentLink)}</Button>
          )}
          {nextLink && (
            <Button
              variant="dark"
              onClick={() => {
                if (elementId) dispatch(loadingFunc(elementId, nextLink));
                else dispatch(loadingFunc(nextLink));
              }}
            >
              {getPageNumber(nextLink)}
            </Button>
          )}
        </ButtonGroup>
      </ButtonToolbar>
    </Container>
  );
};

export default PageButtons;
