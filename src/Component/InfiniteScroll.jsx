import React, { useState, useEffect } from "react";

const InfiniteScroll = ({ items, initialLoad, loadMoreCount, renderItem }) => {
    const [displayItems, setDisplayItems] = useState([]);
    const [visibleCount, setVisibleCount] = useState(initialLoad);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // New state to track if more items are available

    useEffect(() => {
        setDisplayItems(items.slice(0, visibleCount));
        setHasMore(visibleCount < items.length); // Check if there are more items to load
    }, [items, visibleCount]);

    const loadMoreItems = () => {
        if (isLoading || !hasMore) return; // Stop loading if no more items

        setIsLoading(true);
        setTimeout(() => {
            setVisibleCount(prevCount => prevCount + loadMoreCount);
            setIsLoading(false);
        }, 500); // Simulate loading delay
    };

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading) {
            loadMoreItems();
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoading]);

    return (
        <div>
            <div className="row">
                {displayItems.map((item) => renderItem(item))}
            </div>
            {isLoading && hasMore && ( // Show loading spinner only if more items are available
                <div className="d-flex justify-content-center my-3">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InfiniteScroll;