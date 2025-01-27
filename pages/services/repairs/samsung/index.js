import Image from "next/image";
import Layout from "../../../../components/layout";
import Link from "next/link";
import clientPromise from "../../../../lib/mongodb";

export default function Samsung({ data }) {
  return (
    <Layout pageName="Samsung" Description="Samsung Repairs Page">
      <main className="p-5 bg-white">
        <section className="flex flex-col justify-center items-center p-5 bg-white">
          <h1 className="text-3xl">Samsung Repairs</h1>
        </section>
        <article className="grid grid-cols-2 gap-10 content-center items-center text-center justify-items-center p-10">
          {data.map((samsung) => (
            <figure key={samsung.index} className="border-4 border-black p-5">
              <Link href={"/services/repairs/samsung/" + samsung.url}>
                <Image
                  src={"/images/services/repairs/samsung/" + samsung.image}
                  alt={samsung.category}
                  width={200}
                  height={200}
                />
              </Link>
              <figcaption>{samsung.category}</figcaption>
            </figure>
          ))}
        </article>
        <b className="flex flex-col justify-center items-center p-5 bg-white">
          Cant find your device repair? Give us a call or text.
        </b>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const client = await clientPromise;
    const db = client.db("samsung");

    const data = await db
      .collection("listsamsung")
      .find({})
      .sort({ rank: 1 })
      .toArray();

    return {
      props: { data: JSON.parse(JSON.stringify(data)) },
    };
  } catch (e) {
    console.error(e);
  }
}
