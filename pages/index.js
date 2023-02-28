import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Post from '@/components/Post';
import { sortByDate } from '../utils';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ posts }) {
  console.log(posts);
  return (
    <>
      <Head>
        <title>Next Blog</title>
      </Head>
      <main>
        <h1>Hello</h1>
        <div className='posts'>
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join('posts'));

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace('.md', '');

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );

    const { data: frontmatter } = matter(markdownWithMeta);
    //console.log(frontmatter);
    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
