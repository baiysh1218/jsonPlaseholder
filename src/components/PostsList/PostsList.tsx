import axios from "axios";
import React, { useEffect, useState } from "react";
import PostsCard from "../PostsCard/PostsCard";

interface PostsType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const PostsList = () => {
  const [posts, setPosts] = useState<PostsType[] | null>(null);
  const [search, setSearch] = useState<string>("");

  const [totalCount, setTotalCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  const API = "https://jsonplaceholder.typicode.com";

  const getPosts = async () => {
    try {
      const result = await axios(`${API}/posts?q=${search}&_page=${page}`);
      setPosts(result.data);

      const pageTotalCount = +result.headers["x-total-count"];
      const totalPage = Math.ceil(pageTotalCount / 10);

      setTotalCount(totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, [search, page]); // Добавляем зависимость от страницы, чтобы при смене страницы также делать запрос

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage(prevPage => prevPage - 1);
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {posts?.map(post => (
        <PostsCard key={post.id} post={post} />
      ))}
      <div>
        <button disabled={page === 1} onClick={handlePrevPage}>
          Предыдуая страница
        </button>
        <button disabled={page === totalCount} onClick={handleNextPage}>
          Слелующая траница
        </button>
      </div>
    </div>
  );
};

export default PostsList;
