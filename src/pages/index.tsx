import { Post } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { db } from "~/server/db";

export default function Home({
  testing,
  data,
}: InferGetServerSidePropsType<GetServerSideProps>) {
  console.log(data);
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen w-screen flex-col items-center justify-center">
        <div>Blogs website</div>
        <div>
          {data?.map((elem) => {
            return (
              <div key={elem.id}>
                <Link href={`/${elem?.id}`}>{elem?.name}</Link>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const data = await db.post
    .findMany()
    .then((data) =>
      data.map((elem) => {
        return {
          ...elem,
          updatedAt: elem.updatedAt.toISOString(),
          createdAt: elem.createdAt.toISOString(),
        };
      }),
    )
    .catch((err) => console.error(err));

  return {
    props: {
      data: data,
    },
  };
}
