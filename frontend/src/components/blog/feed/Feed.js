import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loadFeed } from "../../../redux/actions/feed";
import FeedElement from "./FeedElement";
import { MemoziedFeedToolbar } from "./FeedToolbar";

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
          {feed ? (
            <>
              <MemoziedFeedToolbar
                prevLink={feed.previous}
                currentLink={feed.current}
                nextLink={feed.next}
              />
              {feed.results.map((post) => (
                <FeedElement post={post} key={post.id} />
              ))}
              <MemoziedFeedToolbar
                prevLink={feed.previous}
                currentLink={feed.current}
                nextLink={feed.next}
              />
            </>
          ) : (
            "No feed"
          )}
        </>
      )}
    </Container>
  );
};

export default Feed;
