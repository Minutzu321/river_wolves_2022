import { useRouter } from 'next/router'

const User = ({pageProps}) => {
  console.log(pageProps);
  const { userId } = pageProps;


  return <p>User: {userId}</p>
}

export async function getServerSideProps(context) {
  
  const { userId } = context.query;
  return { props: { userId } }
}

export default User