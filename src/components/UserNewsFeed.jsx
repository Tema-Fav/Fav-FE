import React, { useState, useEffect, useRef } from "react";

function HeartIcon({ filled }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function FeedItem({ item, onLike, onToggleDetails }) {
  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        backgroundColor: "white",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "12px" }}>
          <img
            src={item.image}
            alt={`${item.title} 가게 이미지`}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h2 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
                {item.title}
              </h2>
              <span style={{ fontSize: "14px", color: "#666" }}>
                {item.time}
              </span>
            </div>

            <p style={{ margin: "8px 0 0", fontSize: "14px", color: "#333" }}>
              {item.message}
            </p>
          </div>
        </div>
        <button
          onClick={() => onLike(item.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: item.liked ? "red" : "#666",
          }}
          aria-label={item.liked ? "좋아요 취소" : "좋아요"}
        >
          <HeartIcon filled={item.liked} />
        </button>
      </div>
      {item.showDetails && (
        <div style={{ marginTop: "12px", fontSize: "14px", color: "#333" }}>
          {item.details}
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "8px",
        }}
      >
        <button
          onClick={() => onToggleDetails(item.id)}
          style={{
            background: "none",
            border: "none",
            color: "#666",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          {item.showDetails ? "접기" : "더보기"}
        </button>
      </div>
    </div>
  );
}

export default function UserNewsFeed() {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  const loadMoreItems = () => {
    setLoading(true);
    setTimeout(() => {
      const newItems = Array.from({ length: 5 }, (_, i) => ({
        id: feedItems.length + i + 1,
        title: `가게 ${feedItems.length + i + 1}`,
        time: "11:04",
        message:
          "안녕하세요 단골여러분. 좋은 소식이 있습니다. 자세한 내용은 더보기를 클릭해주세요...",
        details:
          "이번 주 금요일부터 일요일까지 전 메뉴 20% 할인 이벤트를 진행합니다. 많은 관심 부탁드립니다!",
        image: `db에서받아오기${feedItems.length + i + 1}`,
        liked: false,
        showDetails: false,
      }));
      setFeedItems((prev) => [...prev, ...newItems]);

      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadMoreItems();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (
        container.scrollHeight - container.scrollTop <=
          container.clientHeight + 1 &&
        !loading
      ) {
        loadMoreItems();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const handleLike = (id) => {
    setFeedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  const handleToggleDetails = (id) => {
    setFeedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, showDetails: !item.showDetails } : item
      )
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* App Icon */}
      <div
        style={{ display: "flex", justifyContent: "center", padding: "16px" }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            backgroundColor: "#4a90e2",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              border: "4px solid white",
              borderRadius: "50%",
            }}
          />
        </div>
      </div>

      {/* Scrollable Feed Container */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          backgroundColor: "#f0f0f0",
        }}
      >
        {feedItems.map((item) => (
          <FeedItem
            key={item.id}
            item={item}
            onLike={handleLike}
            onToggleDetails={handleToggleDetails}
          />
        ))}
        {loading && <p style={{ textAlign: "center" }}>로딩 중...</p>}
      </div>
    </div>
  );
}