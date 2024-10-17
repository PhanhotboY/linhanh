import groq from 'groq';

const getBlogs = async (query: string) => {
  // const query = groq`
  //   *[_type == "post"] | order(publishedAt desc) {
  //     _id,
  //     title,
  //     slug,
  //     publishedAt,
  //     mainImage,
  //     excerpt,
  //     categories[]->{
  //       title,
  //       slug
  //     }
  //   }
  // `;

  const res = await fetch('http://localhost:5173' + '/data/blogs.json');
  const data = await res.json();

  return data;
};

export { getBlogs };
