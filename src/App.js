


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const App = () => {
//   const [articles, setArticles] = useState([]);
//   const [query, setQuery] = useState("");

//   const fetchNews = async (searchQuery = "") => {
//     try {
//       const url = searchQuery
//         ? `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=96e81a0e4aff4022a98ac899af6453c6`
//         : `https://newsapi.org/v2/top-headlines?country=us&apiKey=96e81a0e4aff4022a98ac899af6453c6`;

//       const res = await axios.get(url);
//       setArticles(res.data.articles);
//     } catch (error) {
//       console.error("Error fetching news:", error);
//     }
//   };

//   useEffect(() => {
//     fetchNews();
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchNews(query);
//   };

//   // DARK THEME STYLES
//   const isDark = true;
//   const bgColor = isDark ? "#121212" : "#f9f9f9";
//   const textColor = isDark ? "#f1f1f1" : "#121212";
//   const cardBg = isDark ? "#1e1e1e" : "#fff";
//   const borderColor = isDark ? "#333" : "#ddd";

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: bgColor, minHeight: "100vh", color: textColor }}>
//       <h1 style={{ textAlign: "center" }}>🗞️ Daily Top News</h1>

//       <form
//         onSubmit={handleSearch}
//         style={{ marginBottom: "30px", textAlign: "center" }}
//       >
//         <input
//           type="text"
//           placeholder="Search news..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           style={{
//             padding: "10px",
//             width: "300px",
//             fontSize: "16px",
//             marginRight: "10px",
//             borderRadius: "8px",
//             border: `1px solid ${borderColor}`,
//             backgroundColor: isDark ? "#2c2c2c" : "#fff",
//             color: textColor,
//           }}
//         />
//         <button
//           type="submit"
//           style={{
//             padding: "10px 20px",
//             fontSize: "16px",
//             backgroundColor: "#007bff",
//             color: "white",
//             border: "none",
//             borderRadius: "8px",
//             cursor: "pointer",
//           }}
//         >
//           Search
//         </button>
//       </form>

//       {articles.length === 0 ? (
//         <p style={{ textAlign: "center" }}>Loading news...</p>
//       ) : (
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//             gap: "20px",
//           }}
//         >
//           {articles.map((news, index) => (
//             <div
//               key={index}
//               style={{
//                 border: `1px solid ${borderColor}`,
//                 borderRadius: "10px",
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
//                 overflow: "hidden",
//                 backgroundColor: cardBg,
//                 display: "flex",
//                 flexDirection: "column",
//                 color: textColor,
//               }}
//             >
//               {news.urlToImage && (
//                 <img
//                   src={news.urlToImage}
//                   alt="news"
//                   style={{
//                     width: "100%",
//                     height: "200px",
//                     objectFit: "cover",
//                   }}
//                 />
//               )}
//               <div style={{ padding: "15px", flex: 1 }}>
//                 <h3 style={{ marginBottom: "10px", fontSize: "18px" }}>
//                   {news.title}
//                 </h3>
//                 <p style={{ fontSize: "14px", color: isDark ? "#ccc" : "#333" }}>
//                   {news.description}
//                 </p>
//               </div>
//               <div style={{ padding: "0 15px 15px" }}>
//                 <a
//                   href={news.url}
//                   target="_blank"
//                   rel="noreferrer"
//                   style={{
//                     color: "#1e90ff",
//                     fontWeight: "bold",
//                     textDecoration: "none",
//                   }}
//                 >
//                   Read More →
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;


import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [sources, setSources] = useState([]);
  const [selectedSource, setSelectedSource] = useState("");

  const fetchSources = async () => {
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/top-headlines/sources?apiKey=96e81a0e4aff4022a98ac899af6453c6`
      );
      setSources(res.data.sources);
    } catch (err) {
      console.error("Error fetching sources:", err);
    }
  };

  const fetchNews = async (searchQuery = "", source = "") => {
    try {
      let url = "";

      if (searchQuery) {
        url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=96e81a0e4aff4022a98ac899af6453c6`;
      } else if (source) {
        url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=96e81a0e4aff4022a98ac899af6453c6`;
      } else {
        url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=96e81a0e4aff4022a98ac899af6453c6`;
      }

      const res = await axios.get(url);
      setArticles(res.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchSources();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(query, selectedSource);
  };

  const handleSourceChange = (e) => {
    const source = e.target.value;
    setSelectedSource(source);
    fetchNews(query, source);
  };

  const isDark = true;
  const bgColor = isDark ? "#121212" : "#f9f9f9";
  const textColor = isDark ? "#f1f1f1" : "#121212";
  const cardBg = isDark ? "#1e1e1e" : "#fff";
  const borderColor = isDark ? "#333" : "#ddd";

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", backgroundColor: bgColor, minHeight: "100vh", color: textColor }}>
      <h1 style={{ textAlign: "center" }}>🗞️ News App with Source Filter</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            fontSize: "16px",
            marginRight: "10px",
            borderRadius: "8px",
            border: `1px solid ${borderColor}`,
            backgroundColor: isDark ? "#2c2c2c" : "#fff",
            color: textColor,
          }}
        />

        <select
          value={selectedSource}
          onChange={handleSourceChange}
          style={{
            padding: "10px",
            borderRadius: "8px",
            fontSize: "16px",
            border: `1px solid ${borderColor}`,
            backgroundColor: isDark ? "#2c2c2c" : "#fff",
            color: textColor,
            marginRight: "10px",
          }}
        >
          <option value="">All Sources</option>
          {sources.map((source) => (
            <option key={source.id} value={source.id}>
              {source.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {articles.length === 0 ? (
        <p style={{ textAlign: "center" }}>Loading news...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {articles.map((news, index) => (
            <div
              key={index}
              style={{
                border: `1px solid ${borderColor}`,
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                overflow: "hidden",
                backgroundColor: cardBg,
                display: "flex",
                flexDirection: "column",
                color: textColor,
              }}
            >
              {news.urlToImage && (
                <img
                  src={news.urlToImage}
                  alt="news"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              )}
              <div style={{ padding: "15px", flex: 1 }}>
                <h3 style={{ marginBottom: "10px", fontSize: "18px" }}>
                  {news.title}
                </h3>
                <p style={{ fontSize: "14px", color: isDark ? "#ccc" : "#333" }}>
                  {news.description}
                </p>
              </div>
              <div style={{ padding: "0 15px 15px" }}>
                <a
                  href={news.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#1e90ff",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
