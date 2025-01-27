import Image from "next/image";
import Layout from "../../../../components/layout";
import Link from "next/link";
import clientPromise from "../../../../lib/mongodb";

export default function lg({ data }) {
  return (
    <Layout pageName="lg Series" Description="lg Series Page">
      <main className="p-5 bg-white">
        <section className="flex flex-col justify-center items-center p-5 bg-white">
          <h1 className="text-3xl">LG Repairs </h1>
        </section>

        <article className="grid  gap-5 content-center items-center text-center justify-items-center p-10">
          {data.map((one) => (
            <figure key={one.index} className="border-4 border-black p-5">
              <Link href={"/services/repairs/lg/" + one.url}>
                <Image
                  src={"/images/services/repairs/lg/" + one.image}
                  alt={one.category}
                  width={200}
                  height={200}
                />
              </Link>
              <figcaption>{one.category}</figcaption>
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
    const db = client.db("lg");

    const data = await db
      .collection("listlg")
      .find({})
      .sort({ rank: -1 })
      .toArray();

    return {
      props: { data: JSON.parse(JSON.stringify(data)) },
    };
  } catch (e) {
    console.error(e);
  }
}
