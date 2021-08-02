import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loadFeed } from "../../../redux/actions/feed";
import FeedElement from "./FeedElement";
import PageButtons from "../../common/PageButtons";

const Feed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFeed());
  }, []);

  const feed = useSelector((state) => state.feed, shallowEqual);

  return (
    <Container>
      {feed.isLoading ? (
        <h2>Loading feed!</h2>
      ) : (
        <>
          {feed.count > 0 ? (
            <>
              {feed.results.map((post) => (
                <FeedElement post={post} key={post.id} />
              ))}
              <PageButtons
                prevLink={feed.previous}
                currentLink={feed.current}
                nextLink={feed.next}
                loadingFunc={loadFeed}
              />
            </>
          ) : (
            <h1>No feed</h1>
          )}
        </>
      )}
    </Container>
  );
};

export default Feed;
