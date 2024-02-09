import Layout from '../../../../../components/layout';
import clientPromise from '../../../../../lib/mongodb';
import Image from 'next/image';

export default function Id({phone}) {
  const phoneInfo = [];
  let person = phone[0].repairs;

  for (let x in person) {
    phoneInfo.push(person[x]);
  }

  return (
    <Layout pageName={phone[0].model} Description={phone[0].description}>
      <main className="container mx-auto p-5">
        <section className="flex gap-10 flex-col justify-center items-center p-5">
          <h1 className="text-3xl">{phone[0].model}</h1>
          <Image
            src={'/images/services/repairs/apple/iphone/' + phone[0].src}
            alt={phone[0].model}
            width={200}
            height={200}
          />
        </section>
        <article className="flex gap-10 justify-center p-10">
          <table className="table-auto border-separate border-spacing-2 border border-black">
            <caption className="bg-black text-white p-5">
              {phone[0].model}
            </caption>
            <thead>
              <tr>
                <th>Type of Repair</th>
                <th>Price</th>
                <th>Time Frame</th>
              </tr>
            </thead>
            <tbody>
              {phoneInfo.map((p) => {
                return (
                  <tr key={p.name}>
                    <td>{p.name}</td>
                    <td>{'$' + p.price}</td>
                    <td>{p.time + ' Mins'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </article>
        <b className="flex flex-col justify-center items-center p-5 bg-white">
          Want multiple repairs done? We offer discounts for that. Give us a
          call or text.
        </b>
      </main>
    </Layout>
  );
}

export async function getStaticPaths() {
  const client = await clientPromise;
  const db = client.db('apple');

  let data = await db.collection('listiphone').find({}).toArray();
  data = JSON.parse(JSON.stringify(data));

  const paths = data.map((d) => {
    return {
      params: {
        id: d.href,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({params}) {
  // Fetch necessary data for the blog post using params.id
  const client = await clientPromise;
  const db = client.db('apple');

  let data = await db.collection('iphone').find({href: params.id}).toArray();
  data = JSON.parse(JSON.stringify(data));

  return {
    props: {
      phone: data,
    },
  };
}