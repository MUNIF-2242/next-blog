import Link from 'next/link';
import React from 'react';

function Post({ post }) {
  return (
    <>
      <div className='card'>
        <img src={post.frontmatter.cover_image} />
        <div className='post-date'>Posted on {post.frontmatter.date}</div>

        <h3>{post.frontmatter.title}</h3>

        <p>{post.frontmatter.excerpt}</p>

        <Link href={`/blog/${post.slug}`} className='btn'>
          Read More
        </Link>
      </div>
    </>
  );
}

export default Post;
