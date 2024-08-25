import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllPosts from "./components/AllPosts";
import SinglePost from "./components/SinglePost";

import CreatePostForm from "./components/CreatePostForm";
import EditPostForm from "./components/EditPostForm";

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<AllPosts />} />
          <Route path="/posts/:id" element={<SinglePost/>} />
          <Route path="/create-post" element={<CreatePostForm/>} />
          <Route path="/edit-post/:id" element={<EditPostForm/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
